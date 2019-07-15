import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';

import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibVmwareService} from '@sysos/lib-vmware';
import {SysosLibNetappService} from '@sysos/lib-netapp';
import {IMConnection, IMESXiHost, NetAppVolume, NetAppVserver, NetAppSnapshot} from '@sysos/app-infrastructure-manager';

@Component({
  selector: 'smrw-sysos-modal-recovery-wizard',
  templateUrl: './sysos-modal-recovery-wizard.component.html',
  styleUrls: ['./sysos-modal-recovery-wizard.component.scss']
})
export class SysosModalRecoveryWizardComponent implements OnInit {
  @Input() title: string;
  @Input() data: {
    uuid: string;
    storage: IMConnection;
    volume: NetAppVolume & { Snapshots: NetAppSnapshot[] };
    vserver: NetAppVserver;
    snapshot: NetAppSnapshot & { disabled?: boolean; };
    vm: {
      name: string;
      runtime: {
        host: {
          name: string;
        }
      };
      summary: {
        config: {
          vmPathName: string;
        }
      };
    };
  };

  private InfrastructureManagerVMWare;

  ESXIHosts: IMESXiHost[];
  hostFolders: { name: string; }[];
  hostResourcePools: { name: string; }[];
  selectedHost: IMESXiHost;
  selectedFolder: string;
  selectedResourcePool: string;
  powerVM: boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private logger: NGXLogger,
              private formBuilder: FormBuilder,
              private serviceInjector: SysosLibServiceInjectorService,
              private Modal: SysosLibModalService,
              private VMWare: SysosLibVmwareService,
              private NetApp: SysosLibNetappService) {

    this.InfrastructureManagerVMWare = this.serviceInjector.get('SysosAppInfrastructureVmwareService');
    this.ESXIHosts = this.InfrastructureManagerVMWare.getESXihosts();
  }

  get f1() { return this.firstFormGroup.controls; }
  get f2() { return this.secondFormGroup.controls; }
  get f3() { return this.thirdFormGroup.controls; }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      snapshotFormControl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      recoveryModeFormControl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      hostFormControl: ['', Validators.required],
      folderFormControl: ['', Validators.required],
      resourcePoolFormControl: ['', Validators.required],
      vmNameFormControl: ['', Validators.required]
    });

    /**
     * Check if VM exists in storage snapshot "this.data.snapshots"
     */

    this.Modal.openLittleModal('PLEASE WAIT', 'Searching VM in SnapShots...', '.modal-recovery-wizard', 'plain');

    const gspPromises = [];

    const regex = /\[*\]\s(.*)\/.*\.vmx/gi;
    const str = this.data.vm.summary.config.vmPathName;
    const vmPath = regex.exec(str)[1];

    if (!vmPath) throw new Error('SAFETY STOP: VM cannot be on root folder');

    this.data.volume.Snapshots.forEach((snapshot, i) => {

      this.logger.debug(`Backups Manager [${this.data.uuid}] -> Check VM from storage snapshot -> storage [${this.data.storage.host}],
       vserver [${this.data.vserver['vserver-name']}], volume [${this.data.volume['volume-id-attributes'].name}], snapshot [${snapshot.name}], path [/${vmPath}]`);
      gspPromises.push(this.NetApp.getSnapshotFiles(
        this.data.storage.credential,
        this.data.storage.host,
        this.data.storage.port,
        this.data.vserver['vserver-name'],
        this.data.volume['volume-id-attributes'].name,
        snapshot.name,
        '/' + vmPath
      ).then((res) => {
        if (res.status === 'error') {
          this.logger.debug(`Backups Manager [${this.data.uuid}] -> No VM data at this storage snapshot -> storage [${this.data.storage.host}],
           vserver [${this.data.vserver['vserver-name']}], volume [${this.data.volume['volume-id-attributes'].name}], snapshot [${snapshot.name}], path [/${vmPath}]`);
          // TODO this.data.storageSnapshots[i].disabled = true;
        }
      }));
    });

    return Promise.all(gspPromises).then(() => {
      this.Modal.closeModal('.modal-recovery-wizard');
    }).catch((e) => {
      console.log(e);
      this.Modal.closeModal('.modal-recovery-wizard');
    });
  }

  /**
   * Launched when new ESXi host is selected
   */
  loadESXidata($event): void {
    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter...', '.modal-recovery-wizard', 'plain');

    this.VMWare.connectvCenter(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port).then((con) => {
      if (con.data.status === 'error') throw new Error(con.data.data);

      this.Modal.changeModalText('Getting data...', '.modal-recovery-wizard');

      return this.VMWare.connectvCenterSoap(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port);

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to connect to vCenter');

      // Get Host data
      return this.VMWare.getHost(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port, this.selectedHost.host.host);
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Host from vCenter');

      // Get Resource Pools
      if (res.data.parent.type === 'ClusterComputeResource') {
        return this.VMWare.getClusterComputeResource(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port, res.data.parent.name);
      }

      if (res.data.parent.type === 'ComputeResource') {
        return this.VMWare.getComputeResource(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port, res.data.parent.name);
      }

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Host computeResource from vCenter');

      return this.VMWare.getResourcePool(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port, res.data[0].resourcePool.name);
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Host resourcePool from vCenter');

      this.hostResourcePools = [res.data];

      // Get VM folders in selected vCenter
      return this.VMWare.doCall(this.selectedHost.virtual.host, this.selectedHost.virtual.port, '/rest/vcenter/folder?filter.type=VIRTUAL_MACHINE').then((dataFolder) => {
        if (dataFolder.data.status === 'error') throw new Error(dataFolder.data.data);
        this.hostFolders = dataFolder.data.data.response.value;

        this.Modal.closeModal('.modal-recovery-wizard');
      });
    });
  }

}
