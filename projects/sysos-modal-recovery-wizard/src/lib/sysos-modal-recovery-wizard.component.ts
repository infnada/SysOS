import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';
import {ToastrService} from 'ngx-toastr';

import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibVmwareService} from '@sysos/lib-vmware';
import {SysosLibNetappService} from '@sysos/lib-netapp';
import {IMESXiHost, IMDatastoreLink, NetAppSnapshot, NetAppIface, VMWareObject, VMWareDatastore, VMWareFirewallRule} from '@sysos/app-infrastructure-manager';
import {VmInstantRecovery, RestoreVm} from '@sysos/app-backups-manager';


@Component({
  selector: 'smrw-sysos-modal-recovery-wizard',
  templateUrl: './sysos-modal-recovery-wizard.component.html',
  styleUrls: ['./sysos-modal-recovery-wizard.component.scss']
})
export class SysosModalRecoveryWizardComponent implements OnInit {
  @Input() type: 'restore_vm' | 'vm_instant_recovery';
  @Input() title: string;
  @Input() data: VmInstantRecovery | RestoreVm;

  private InfrastructureManager;
  private InfrastructureManagerVMWare;

  mainLinkFound: boolean = true;

  selectedHost: IMESXiHost;
  selectedIface: NetAppIface;
  ESXIHosts: IMESXiHost[];
  hostFolders: { name: string; }[];
  hostResourcePools: { name: string; }[];

  private hostData;
  finishLoading: boolean = false;
  foundIp: boolean = false;
  foundIfaces: NetAppIface[];
  sameSubnetIp: NetAppIface[] = [];
  manualIp: boolean = false;
  forceManualIp: boolean = false;
  ifaceServiceData: {
    'is-nfsv3-enabled': boolean;
    'is-nfsv41-enabled': boolean;
  };

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private logger: NGXLogger,
              private Toastr: ToastrService,
              private formBuilder: FormBuilder,
              private serviceInjector: SysosLibServiceInjectorService,
              private Modal: SysosLibModalService,
              private VMWare: SysosLibVmwareService,
              private NetApp: SysosLibNetappService) {

    this.InfrastructureManager = this.serviceInjector.get('SysosAppInfrastructureManagerService');
    this.InfrastructureManagerVMWare = this.serviceInjector.get('SysosAppInfrastructureVmwareService');
    this.ESXIHosts = this.InfrastructureManagerVMWare.getESXihosts();
  }

  get f1() { return this.firstFormGroup.controls; }
  get f2() { return this.secondFormGroup.controls; }
  get f3() { return this.thirdFormGroup.controls; }

  ngOnInit() {

    // Timeout is needed to make sure this.type is defined
    setTimeout(() => {
      this.firstFormGroup = this.formBuilder.group({
        snapshotFormControl: ['', Validators.required]
      });
      this.secondFormGroup = this.formBuilder.group({
        recoveryModeFormControl: [(this.type === 'vm_instant_recovery' ? 'new' : 'original'), Validators.required]
      });
      this.thirdFormGroup = this.formBuilder.group({
        hostFormControl: ['', Validators.required],
        ifaceFormControl: ['', Validators.required],
        folderFormControl: ['', Validators.required],
        resourcePoolFormControl: ['', Validators.required],
        vmNameFormControl: ['', Validators.required],
        powerVMFormControl: [false],
      });
    }, 0);

    /**
     * Check if VM exists in any managed datastore
     */
    const gspPromises = [];
    return this.Modal.openLittleModal('PLEASE WAIT', 'Searching VM in SnapShots...', '.modal-recovery-wizard', 'plain').then(() => {
      const regex = /\[*\]\s(.*)\/.*\.vmx/gi;
      const vmPath: string = regex.exec(this.data.vm.info.data['summary.config.vmPathName'])[1];
      let manageAllVmDatastores = true;

      // Get VM main Datastore (where VM .vmx file is located)
      const mainDatastoreName: string = this.data.vm.info.data['summary.config.vmPathName'].split(/\[(.*?)\]/)[1];

      // If it's an Object (only 1 managed datastore) convert to array
      if (!Array.isArray(this.data.vm.info.data.datastore.ManagedObjectReference)) {
        this.data.vm.info.data.datastore.ManagedObjectReference = [this.data.vm.info.data.datastore.ManagedObjectReference];
      }

      // Get links for each VM datastore
      return this.data.vm.info.data.datastore.ManagedObjectReference.forEach((datastoreObj: { type: string; name: string; }) => {

        const fullDatastoreObj: VMWareObject & { info: { data: VMWareDatastore } } = this.InfrastructureManagerVMWare.getObjectById(this.data.virtual.uuid, datastoreObj.name);
        const datastoreLink: IMDatastoreLink[] = this.InfrastructureManager.checkDatastoreLinkWithManagedStorage(fullDatastoreObj);

        if (datastoreLink.length > 1) throw new Error('Multiple links found for this storage');
        if (fullDatastoreObj.name === mainDatastoreName && datastoreLink.length === 0) throw new Error('No main link found');
        if (datastoreLink.length === 0) manageAllVmDatastores = false; // One or more VM datastores are not managed by SysOS (full recovery may not be possible)

        // True work
        if (fullDatastoreObj.name === mainDatastoreName) {

          this.data.storage = datastoreLink[0].storage;
          this.data.vserver = datastoreLink[0].vserver;
          this.data.volume = datastoreLink[0].volume;

          // Check in every storage snapshot if main VM .vmx file exists
          this.data.volume.Snapshots.forEach((snapshotObj: NetAppSnapshot & { disabled?: boolean; }) => {
            this.logger.debug(`Backups Manager [${this.data.uuid}] -> Check VM from storage snapshot -> storage [${this.data.storage.host}],
              vserver [${this.data.vserver['vserver-name']}], volume [${this.data.volume['volume-id-attributes'].name}], snapshot [${snapshotObj.name}], path [/${vmPath}]`);

            // NetApp call
            gspPromises.push(this.NetApp.getSnapshotFiles(
              this.data.storage.credential,
              this.data.storage.host,
              this.data.storage.port,
              this.data.vserver['vserver-name'],
              this.data.volume['volume-id-attributes'].name,
              snapshotObj.name,
              '/' + vmPath
            ).then((res) => {
              if (res.status === 'error') {
                this.logger.debug(`Backups Manager [${this.data.uuid}] -> No VM data at this storage snapshot -> storage [${this.data.storage.host}],
                  vserver [${this.data.vserver['vserver-name']}], volume [${this.data.volume['volume-id-attributes'].name}], snapshot [${snapshotObj.name}], path [/${vmPath}]`);

                // Disable this storage snapshot on error (file does not exist)
                snapshotObj.disabled = true;
              }
            }));

          });

        }

      });

    }).then(() => {
      console.log(this.data);
      return Promise.all(gspPromises);
    }).then(() => {
      this.Modal.closeModal('.modal-recovery-wizard');
    }).catch((e) => {
      console.log(e);

      if (e.message === 'No main link found') this.mainLinkFound = false;

      this.Modal.closeModal('.modal-recovery-wizard');
    });

    // TODO:
    // Get VM datastoreS
    //    Check if it's a managed datastore
    //    Get storage, vserver, volume & volume snapshots for datastore
    // Get location of each VM file
    //    Check each snapshot if contains VM file
    //        Disable snapshot that not con.modal-bodytains VM file
    //          VM file or entire VM not exist on this snapshot timestamp? Read main .vmx file if found?
    //

  }

  checkESXidata() {
    this.ifaceServiceData = null;
    this.foundIp = false;
    this.manualIp = false;
    this.forceManualIp = false;
    this.finishLoading = false;
    this.sameSubnetIp = [];
    this.selectedHost = this.f3.hostFormControl.value;

    // Get Volume IP and Protocol
    this.foundIfaces = this.data.storage.data.Ifaces.netifaces.filter((iface) => {
      return iface.role === 'data' &&
        iface.vserver === this.data.vserver['vserver-name'] &&
        iface['operational-status'] === 'up' &&
        iface['administrative-status'] === 'up' &&
        iface['current-node'] === this.data.volume['volume-id-attributes'].node; // TODO: necessary this check?
    });

    // Get all required data to complete the form
    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter...', '.modal-recovery-wizard', 'plain').then(() => {

      return this.VMWare.connectvCenterSoap(this.selectedHost.virtual);
    }).then((connectSoapResult) => {
      if (connectSoapResult.status === 'error') throw {error: connectSoapResult.error, description: 'Failed to connect to vCenter'};

      this.Modal.changeModalText('Getting data...', '.modal-recovery-wizard');

      /**
       * Get Host data
       */
      return this.VMWare.getHost(this.selectedHost.virtual, this.selectedHost.host.host);
    }).then((hostResult) => {
      if (hostResult.status === 'error') throw {error: hostResult.error, description: 'Failed to get Host data from vCenter'};

      this.hostData = hostResult.data;

      /**
       * Get Host/Cluster ComputeResource to Get Resource Pools
       */
      if (this.hostData.parent.type === 'ClusterComputeResource') {
        return this.VMWare.getClusterComputeResource(this.selectedHost.virtual, this.hostData.parent.name);
      }

      if (this.hostData.parent.type === 'ComputeResource') {
        return this.VMWare.getComputeResource(this.selectedHost.virtual, this.hostData.parent.name);
      }

    }).then((computeResourceResult) => {
      if (computeResourceResult.status === 'error') throw new Error('Failed to get Host computeResource from vCenter');

      // Get Host Resource Pools
      return this.VMWare.getResourcePool(this.selectedHost.virtual, computeResourceResult.data[0].resourcePool.name);
    }).then((resourcePoolResult) => {
      if (resourcePoolResult.status === 'error') throw new Error('Failed to get Host resourcePool from vCenter');

      this.hostResourcePools = [resourcePoolResult.data];

      /**
       * Check Storage IPs
       */
      // If it's an Object (only 1 managed datastore) convert to array
      if (!Array.isArray(this.hostData.datastore.ManagedObjectReference)) {
        this.hostData.datastore.ManagedObjectReference = [this.hostData.datastore.ManagedObjectReference];
      }

      // Check if some of the datastores IPs match foundIfaces IP
      this.hostData.datastore.ManagedObjectReference.forEach((datastoreObj) => {
        this.VMWare.getDatastoreProps(this.selectedHost.virtual, datastoreObj.name).then((datastoreResult) => {
          if (datastoreResult.status === 'error') throw {error: datastoreResult.error, description: 'Failed to get Datastore data from vCenter'};

          console.log(datastoreResult);

          /*data.summary.type === 'NFS41'
          data.info.nas.type
          data.info.nas.remoteHost
          data.info.nas.remoteHostNames*/

          // TODO: foundIp true?
        });
      });

      // Check if one of foundIfaces IP is within same subnet of host network
      if (!this.foundIp) {
        const ipInSameSubnet = (addr1: string, addr2: string, mask: string): boolean => {
          const res1 = [];
          const res2 = [];
          const arr1 = addr1.split('.');
          const arr2 = addr2.split('.');
          const arrmask  = mask.split('.');

          for (let i = 0; i < arr1.length; i++) {
            res1.push(parseInt(arr1[i], 10) & parseInt(arrmask[i], 10));
            res2.push(parseInt(arr2[i], 10) & parseInt(arrmask[i], 10));
          }
          return res1.join('.') === res2.join('.');
        };

        this.foundIfaces.forEach((iface) => {
          // TODO: get correct ESXi address
          // TODO: choose the lowest netmask
          if (ipInSameSubnet(this.hostData.config.network.vnic.spec.ip.ipAddress, iface.address, iface.netmask)) this.sameSubnetIp.push(iface);
        });

        // Preselect 1st IP on same subnet
        if (this.sameSubnetIp.length > 0) {
          this.selectedIface = this.sameSubnetIp[0];
          this.checkIface();
        } else {
          // Ask user to select an IP
          this.manualIp = true;
          this.forceManualIp = true;
        }
      }

      this.finishLoading = true;

      // Get Host firewall rules data
      this.Modal.closeModal('.modal-recovery-wizard');
    }).catch((e) => {
      this.logger.error(`Infrastructure Manager [${this.hostData.uuid}] -> Error while getting VMWare data -> host [${this.hostData.host}] -> ${e.description}`);

      if (this.Modal.isModalOpened('.modal-recovery-wizard')) {
        this.Modal.changeModalType('danger', '.modal-recovery-wizard');
        this.Modal.changeModalText(e.description, '.modal-recovery-wizard');
      }

      this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from VMWare');

      throw e;
    });
  }

  checkIface() {

    if (this.selectedIface['data-protocols']['data-protocol'] === 'nfs' && !this.ifaceServiceData) {
      this.Modal.openLittleModal('PLEASE WAIT', 'Checking storage service status...', '.modal-recovery-wizard', 'plain').then(() => {

        return this.NetApp.getNFSService(this.data.storage.credential, this.data.storage.host, this.data.storage.port, this.data.vserver['vserver-name']);
      }).then((nfsServiceResult) => {
        if (nfsServiceResult.status === 'error') throw {error: nfsServiceResult.error, description: 'Failed to get NFS service status from Storage'};

        this.ifaceServiceData = nfsServiceResult.data;
        this.Modal.closeModal('.modal-recovery-wizard');
      }).catch((e) => {
        this.logger.error(`Infrastructure Manager [${this.data.storage.uuid}] -> Error while getting NetApp data -> host [${this.data.storage.host}] -> ${e.description}`);

        if (this.Modal.isModalOpened('.modal-recovery-wizard')) {
          this.Modal.changeModalType('danger', '.modal-recovery-wizard');
          this.Modal.changeModalText(e.description, '.modal-recovery-wizard');
        }

        this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from NetApp');

        throw e;
      });
    }

  }

  checkFirewallNFS(nfsVersion) {
    if (this.hostData.config.firewall.defaultPolicy.outgoingBlocked === false) return true;

    const firewallRule = this.hostData.config.firewall.ruleset.find((rule: VMWareFirewallRule) => {
      return rule.key === (nfsVersion === 3 ? 'nfsClient' : 'nfs41Client');
    });

    // No default rule found
    if (!firewallRule) return false;

    if (firewallRule.allowedHosts.allIp === true) return true;
    if (firewallRule.allowedHosts.ipAddress && typeof firewallRule.allowedHosts.ipAddress === 'string' && firewallRule.allowedHosts.ipAddress === this.selectedIface.address) return true;
    if (firewallRule.allowedHosts.ipAddress && Array.isArray(firewallRule.allowedHosts.ipAddress) && firewallRule.allowedHosts.ipAddress.includes(this.selectedIface.address)) return true;
    // TODO check when is a network instead of an IP

    return false;
  }

  /**
   * Launched when new ESXi host is selected
   */
  loadESXidata($event): void {
    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter...', '.modal-recovery-wizard', 'plain');

    this.VMWare.connectvCenter(this.selectedHost.virtual).then((con) => {
      if (con.data.status === 'error') throw new Error(con.data.data);

      this.Modal.changeModalText('Getting data...', '.modal-recovery-wizard');

      return this.VMWare.connectvCenterSoap(this.selectedHost.virtual);

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to connect to vCenter');

      // Get Host data
      return this.VMWare.getHost(this.selectedHost.virtual, this.selectedHost.host.host);
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Host from vCenter');

      // Get Resource Pools
      if (res.data.parent.type === 'ClusterComputeResource') {
        return this.VMWare.getClusterComputeResource(this.selectedHost.virtual, res.data.parent.name);
      }

      if (res.data.parent.type === 'ComputeResource') {
        return this.VMWare.getComputeResource(this.selectedHost.virtual, res.data.parent.name);
      }

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Host computeResource from vCenter');

      return this.VMWare.getResourcePool(this.selectedHost.virtual, res.data[0].resourcePool.name);
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Host resourcePool from vCenter');

      this.hostResourcePools = [res.data];

      // Get VM folders in selected vCenter
      // return this.VMWare.doCall(this.selectedHost.virtual.host, this.selectedHost.virtual.port, '/rest/vcenter/folder?filter.type=VIRTUAL_MACHINE').then((dataFolder) => {
      //  if (dataFolder.data.status === 'error') throw new Error(dataFolder.data.data);
      //  this.hostFolders = dataFolder.data.data.response.value;

      this.Modal.closeModal('.modal-recovery-wizard');
      // });
    });
  }

}
