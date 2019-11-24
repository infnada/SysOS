import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibVmwareService} from '@anyopsos/lib-vmware';
import {AnyOpsOSLibNetappService} from '@anyopsos/lib-netapp';
import {
  AnyOpsOSAppInfrastructureManagerUtilsService,
  ConnectionVmware,
  ConnectionNetapp,
  ImDataObject,
  NetAppVserver,
  NetAppVolume,
  NetAppSnapshot,
  NetAppIface,
  VMWareHost,
  VMWareFolder,
  VMWareResourcePool,
  VMWareFirewallRule,
  VMWareDatastore,
  VMWareVM
} from '@anyopsos/app-infrastructure-manager';

@Component({
  selector: 'smrw-anyopsos-modal-recovery-wizard',
  templateUrl: './anyopsos-modal-recovery-wizard.component.html',
  styleUrls: ['./anyopsos-modal-recovery-wizard.component.scss']
})
export class AnyOpsOSModalRecoveryWizardComponent implements OnInit {
  @Input() type: 'mount_volume_snapshot' | 'restore_volume_files' | 'restore_vm_guest_files' | 'restore_vm' | 'vm_instant_recovery';
  @Input() title: string;
  @Input() data: {
    snapshot?: ImDataObject & { info: { data: NetAppSnapshot } };
    volume?: ImDataObject & { info: { data: NetAppVolume } };
    vm?: ImDataObject & { info: { data: VMWareVM } };
  };

  private InfrastructureManager;
  private InfrastructureManagerVMWare;
  private InfrastructureManagerNodeLink;
  private InfrastructureManagerObjectHelper;

  mainVmLinkFound: boolean = true;

  // Data to return
  selectedSnapshot: ImDataObject & { info: { data: NetAppIface } };
  selectedIface: ImDataObject & { info: { data: NetAppIface } };
  selectedHost: ImDataObject & { info: { data: VMWareHost } };
  selectedFolder: ImDataObject & { info: { data: VMWareFolder } };
  selectedResourcePool: ImDataObject & { info: { data: VMWareResourcePool } };
  powerOnVm: boolean;
  vmName: string;

  // Data for Forms
  ESXIHosts: (ImDataObject & { info: { data: VMWareHost } })[];
  volumeSnapshots: (ImDataObject & { info: { data: NetAppSnapshot } })[];

  hostFolders: { name: string; }[];
  hostResourcePools: { name: string; }[];

  snapshotStorage: ConnectionNetapp;
  snapshotVserver: ImDataObject & { info: { data: NetAppVserver } };
  snapshotVolume: ImDataObject & { info: { data: NetAppVolume } };

  private hostData;
  finishLoading: boolean = false;
  foundIp: boolean = false;
  foundIfaces: (ImDataObject & { info: { data: NetAppIface } })[];
  sameSubnetIp: (ImDataObject & { info: { data: NetAppIface } })[] = [];
  manualIp: boolean = false;
  ifaceServiceData: {
    'is-nfsv3-enabled': boolean;
    'is-nfsv41-enabled': boolean;
  };

  // Froms
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private logger: AnyOpsOSLibLoggerService,
              private Toastr: ToastrService,
              private formBuilder: FormBuilder,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private VMWare: AnyOpsOSLibVmwareService,
              private NetApp: AnyOpsOSLibNetappService,
              private InfrastructureManagerUtils: AnyOpsOSAppInfrastructureManagerUtilsService) {

    this.InfrastructureManager = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerService');
    this.InfrastructureManagerVMWare = this.serviceInjector.get('AnyOpsOSAppInfrastructureVmwareService');
    this.InfrastructureManagerNodeLink = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerNodeLinkService');
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerObjectHelperService');

    this.ESXIHosts = this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'HostSystem');
  }

  get f1() {
    return this.firstFormGroup.controls;
  }

  get f2() {
    return this.secondFormGroup.controls;
  }

  get f3() {
    return this.thirdFormGroup.controls;
  }

  getHostOfConnection(host: ImDataObject & { info: { data: VMWareHost } }): string {
    return this.InfrastructureManager.getConnectionByUuid(host.info.mainUuid).host;
  }

  getVolumeFromSnapshot(snapshot: ImDataObject & { info: { data: NetAppSnapshot } }): string {
    return this.InfrastructureManagerObjectHelper.getParentObjectByType(snapshot.info.mainUuid, 'volume', snapshot.info.parent.name).name;
  }

  ngOnInit(): void {

    // https://github.com/anyOpsOS/anyOpsOS/issues/3
    setTimeout(() => {
      this.firstFormGroup = this.formBuilder.group({
        snapshotFormControl: [(this.data.snapshot ? this.data.snapshot.info.uuid : ''), Validators.required]
      });
      this.secondFormGroup = this.formBuilder.group({
        recoveryModeFormControl: [(this.type === 'vm_instant_recovery' ? 'new' : this.type === 'restore_vm' ? 'original' : ''), Validators.required]
      });
      this.thirdFormGroup = this.formBuilder.group({
        hostFormControl: ['', Validators.required],
        ifaceFormControl: ['', Validators.required],
        folderFormControl: ['', (this.type === 'restore_vm' || this.type === 'vm_instant_recovery' ? Validators.required : '')],
        resourcePoolFormControl: ['', (this.type === 'restore_vm' || this.type === 'vm_instant_recovery' ? Validators.required : '')],
        vmNameFormControl: ['', (this.type === 'restore_vm' || this.type === 'vm_instant_recovery' ? Validators.required : '')],
        powerVMFormControl: [false],
      });

      // Set initial Snapshot Data
      this.checkSnapshotData(this.f1.snapshotFormControl);

      /**
       * Get Volume Snapshots
       */
      // If Volume already provided (means no initial Snapshot is provided)
      if (this.data.volume) {
        this.volumeSnapshots = this.InfrastructureManagerObjectHelper.getChildObjectsByType(this.data.volume.info.mainUuid, 'snapshot', this.data.volume.info.obj.name);

      // If we have a snapshot, get all snapshots from it's Volume. If a VM is provided, some checks are required
      } else if (this.data.snapshot && !this.data.vm) {
        const volume = this.InfrastructureManagerObjectHelper.getParentObjectByType(this.data.snapshot.info.mainUuid, 'volume', this.data.snapshot.info.parent.name);
        this.volumeSnapshots = this.InfrastructureManagerObjectHelper.getChildObjectsByType(volume.info.mainUuid, 'snapshot', volume.info.obj.name);

      // A VM is provided
      } else {

        // TODO: this not manages VM files in multiple Datastores
        /**
         * Check if VM exists in any managed datastore
         */
        this.Modal.openLittleModal('PLEASE WAIT', 'Searching VM in SnapShots...', '.modal-recovery-wizard', 'plain').then(() => {

          // Get VM main Datastore (where VM .vmx file is located)
          const mainDatastoreName: string = this.data.vm.info.data['summary.config.vmPathName'].split(/\[(.*?)\]/)[1];
          let manageAllVmDatastores = true;

          const regex = /\[*\]\s(.*)\/.*\.vmx/gi;
          const vmPath: string = regex.exec(this.data.vm.info.data['summary.config.vmPathName'])[1];

          // If it's an Object (only 1 managed datastore) convert to array
          if (!Array.isArray(this.data.vm.info.data.datastore[0].ManagedObjectReference)) {
            this.data.vm.info.data.datastore[0].ManagedObjectReference = [this.data.vm.info.data.datastore.ManagedObjectReference];
          }

          // Get links for each VM datastore to extract Storage Snapshots and check if it contains the VM
          return Promise.all(this.data.vm.info.data.datastore[0].ManagedObjectReference.map(async (datastoreObj: { type: string; name: string; }) => {

            const fullDatastoreObj: ImDataObject & { info: { data: VMWareDatastore } } = this.InfrastructureManagerObjectHelper.getObjectById(this.data.vm.info.mainUuid, datastoreObj.name);
            const linkVolume: (ImDataObject & { info: { data: NetAppVolume } }) = this.InfrastructureManagerNodeLink.checkVMWareDatastoreLinkWithManagedStorageVolume(fullDatastoreObj);

            if (fullDatastoreObj.name === mainDatastoreName && !linkVolume) throw new Error('No main link found');
            if (!linkVolume) manageAllVmDatastores = false; // One or more VM datastores are not managed by anyOpsOS (full recovery may not be possible)

            // True work
            if (fullDatastoreObj.name === mainDatastoreName) {

              const linkVserver = this.InfrastructureManagerObjectHelper.getParentObjectByType(linkVolume.info.mainUuid, 'vserver', linkVolume.info.parent.name);
              const linkStorage = this.InfrastructureManager.getConnectionByUuid(linkVolume.info.mainUuid);

              this.volumeSnapshots = JSON.parse(JSON.stringify(
                this.InfrastructureManagerObjectHelper.getChildObjectsByType(linkStorage.uuid, 'snapshot', linkVolume.info.obj.name)
              ));

              this.logger.debug('Recovery Wizard', 'Check VM from storage snapshot');

              // Check in every storage snapshot if main VM .vmx file exists
              await Promise.all(this.volumeSnapshots.map(async (snapshot: ImDataObject & { info: { data: NetAppSnapshot } }) => {
                await this.NetApp.getSnapshotFiles(
                  linkStorage.credential,
                  linkStorage.host,
                  linkStorage.port,
                  linkVserver.name,
                  linkStorage.name,
                  snapshot.name,
                  '/' + vmPath
                ).then((res) => {
                  if (res.status === 'error') {
                    this.logger.debug('Recovery Wizard', 'No VM data at this storage snapshot');

                    // Disable this storage snapshot on error (file does not exist)
                    snapshot.info.data.disabled = true;
                  }
                });
              }));
            }

          }));

        }).then(() => {
          this.Modal.closeModal('.modal-recovery-wizard');
        }).catch((e) => {
          console.log(e);

          if (e.message === 'No main link found') this.mainVmLinkFound = false;

          this.Modal.closeModal('.modal-recovery-wizard');
        });
      }

    }, 0);
  }

  /**
   * Sets initial Snapshot data. This is required by the Template
   */
  checkSnapshotData($event): void {
    if (!$event.value) return;

    const snapshotMainUuid = this.InfrastructureManagerObjectHelper.extractMainUuidFromObjectUuid($event.value);
    this.selectedSnapshot = this.InfrastructureManagerObjectHelper.getObjectByUuid(snapshotMainUuid, $event.value);

    this.snapshotVolume = this.InfrastructureManagerObjectHelper.getParentObjectByType(this.selectedSnapshot.info.mainUuid, 'volume', this.selectedSnapshot.info.parent.name);
    this.snapshotVserver = this.InfrastructureManagerObjectHelper.getParentObjectByType(this.selectedSnapshot.info.mainUuid, 'vserver', this.selectedSnapshot.info.parent.name);
    this.snapshotStorage = this.InfrastructureManager.getConnectionByUuid(this.selectedSnapshot.info.mainUuid);
  }

  checkESXidata(): void {
    this.ifaceServiceData = null;
    this.foundIp = false;
    this.manualIp = false;
    this.finishLoading = false;
    this.sameSubnetIp = [];
    this.selectedHost = this.f3.hostFormControl.value;

    const selectedHostConnection: ConnectionVmware = this.InfrastructureManager.getConnectionByUuid(this.selectedHost.info.mainUuid);

    // Get Volume IP and Protocol
    this.foundIfaces = this.InfrastructureManagerObjectHelper.getObjectsByType(this.selectedSnapshot.info.mainUuid, 'netiface').filter((iface: ImDataObject & { info: { data: NetAppIface } }) => {
      return iface.info.data.role === 'data' &&
        iface.info.data.vserver === this.snapshotVserver.name &&
        iface.info.data['operational-status'] === 'up' &&
        iface.info.data['administrative-status'] === 'up' &&
        iface.info.data['current-node'] === this.snapshotVolume.info.data['volume-id-attributes'].node; // TODO: necessary this check?
    });

    // Get all required data to complete the form
    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter...', '.modal-recovery-wizard', 'plain').then(() => {

      return this.VMWare.connectvCenterSoap(selectedHostConnection);
    }).then((connectSoapResult) => {
      if (connectSoapResult.status === 'error') {
        throw {
          error: connectSoapResult.error,
          description: 'Failed to connect to vCenter'
        };
      }

      this.Modal.changeModalText('Getting data...', '.modal-recovery-wizard');

      /**
       * Get Host data
       */
      return this.VMWare.getHost(selectedHostConnection, this.selectedHost.info.obj.name);
    }).then((hostResult) => {
      if (hostResult.status === 'error') {
        throw {
          error: hostResult.error,
          description: 'Failed to get Host data from vCenter'
        };
      }

      this.hostData = hostResult.data;

      /**
       * Get Host/Cluster ComputeResource to Get Resource Pools
       */
      if (this.hostData.propSet.parent.type === 'ClusterComputeResource') {
        return this.VMWare.getClusterComputeResource(selectedHostConnection, this.hostData.propSet.parent.name);
      }

      if (this.hostData.propSet.parent.type === 'ComputeResource') {
        return this.VMWare.getComputeResource(selectedHostConnection, this.hostData.propSet.parent.name);
      }

    }).then((computeResourceResult) => {
      if (computeResourceResult.status === 'error') throw new Error('Failed to get Host computeResource from vCenter');

      // Get Host Resource Pools
      return this.VMWare.getResourcePool(selectedHostConnection, computeResourceResult.data[0].propSet.resourcePool.name);
    }).then((resourcePoolResult) => {
      if (resourcePoolResult.status === 'error') throw new Error('Failed to get Host resourcePool from vCenter');

      this.hostResourcePools = [resourcePoolResult.data];

      // Get VM folders in selected vCenter
      // return this.VMWare.doCall(this.selectedHost.virtual.host, this.selectedHost.virtual.port, '/rest/vcenter/folder?filter.type=VIRTUAL_MACHINE').then((dataFolder) => {
      //  if (dataFolder.data.status === 'error') throw new Error(dataFolder.data.data);
      //  this.hostFolders = dataFolder.data.data.response.value;

      /**
       * Check Storage IPs
       */
      // If it's an Object (only 1 managed datastore) convert to array
      if (!Array.isArray(this.hostData.propSet.datastore[0].ManagedObjectReference)) {
        this.hostData.propSet.datastore[0].ManagedObjectReference = [this.hostData.propSet.datastore[0].ManagedObjectReference];
      }

      // Check if some of the datastores IPs match foundIfaces IP
      this.hostData.propSet.datastore[0].ManagedObjectReference.forEach((datastoreObj) => {
        this.VMWare.getDatastoreProps(selectedHostConnection, datastoreObj.name).then((datastoreResult) => {
          if (datastoreResult.status === 'error') {
            throw {
              error: datastoreResult.error,
              description: 'Failed to get Datastore data from vCenter'
            };
          }

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
        this.foundIfaces.forEach((iface) => {
          // TODO: get correct ESXi address
          // TODO: choose the lowest netmask
          if (this.InfrastructureManagerUtils.ipInSameSubnet(this.hostData.propSet.config[0].network[0].vnic[0].spec[0].ip[0].ipAddress, iface.info.data.address, iface.info.data.netmask)) {
            this.sameSubnetIp.push(iface);
          }
        });

        // Preselect 1st IP on same subnet
        if (this.sameSubnetIp.length > 0) {
          this.f3.ifaceFormControl.setValue(this.sameSubnetIp[0]);
          this.checkIface();
        } else {
          // Ask user to select an IP
          this.manualIp = true;
        }
      }

      this.finishLoading = true;

      // Get Host firewall rules data
      this.Modal.closeModal('.modal-recovery-wizard');
    }).catch((e) => {
      this.logger.error('Recover Wizard', 'Error while getting VMWare data', null, e.description);

      if (this.Modal.isModalOpened('.modal-recovery-wizard')) {
        this.Modal.changeModalType('danger', '.modal-recovery-wizard');
        this.Modal.changeModalText((e.description ? e.description : e.message), '.modal-recovery-wizard');
      }

      this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from VMWare');

      this.f3.hostFormControl.reset();

      throw e;
    });
  }

  checkIface(): void {
    this.selectedIface = this.f3.ifaceFormControl.value;

    if (this.selectedIface.info.data['data-protocols']['data-protocol'] === 'nfs' && !this.ifaceServiceData) {
      this.Modal.openLittleModal('PLEASE WAIT', 'Checking storage service status...', '.modal-recovery-wizard', 'plain').then(() => {

        return this.NetApp.getNFSService(this.snapshotStorage.credential, this.snapshotStorage.host, this.snapshotStorage.port, this.snapshotVserver.name);
      }).then((nfsServiceResult) => {
        if (nfsServiceResult.status === 'error') {
          throw {
            error: nfsServiceResult.error,
            description: 'Failed to get NFS service status from Storage'
          };
        }

        this.ifaceServiceData = nfsServiceResult.data;
        this.Modal.closeModal('.modal-recovery-wizard');
      }).catch((e) => {
        this.logger.error('Infrastructure Manager', 'Error while getting NetApp data', null, e.description);

        if (this.Modal.isModalOpened('.modal-recovery-wizard')) {
          this.Modal.changeModalType('danger', '.modal-recovery-wizard');
          this.Modal.changeModalText((e.description ? e.description : e.message), '.modal-recovery-wizard');
        }

        this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from NetApp');

        this.f3.ifaceFormControl.reset();

        throw e;
      });
    }

  }

  checkFirewallNFS(nfsVersion: number): boolean {
    if (this.hostData.propSet.config[0].firewall[0].defaultPolicy[0].outgoingBlocked === false) return true;

    const firewallRule = this.hostData.propSet.config[0].firewall[0].ruleset.find((rule: VMWareFirewallRule) => {
      return rule.key === (nfsVersion === 3 ? 'nfsClient' : 'nfs41Client');
    });

    // No default rule found
    if (!firewallRule) return false;

    if (firewallRule.allowedHosts.allIp === true) return true;
    if (firewallRule.allowedHosts.ipAddress && typeof firewallRule.allowedHosts.ipAddress === 'string' && firewallRule.allowedHosts.ipAddress === this.selectedIface.info.data.address) return true;
    if (firewallRule.allowedHosts.ipAddress && Array.isArray(firewallRule.allowedHosts.ipAddress) && firewallRule.allowedHosts.ipAddress.includes(this.selectedIface.info.data.address)) return true;
    // TODO check when is a network instead of an IP

    return false;
  }
}
