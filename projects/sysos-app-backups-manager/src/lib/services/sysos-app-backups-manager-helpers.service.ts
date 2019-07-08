import {Injectable} from '@angular/core';

import {NGXLogger} from "ngx-logger";
import {v4 as uuidv4} from 'uuid';

import {SysosLibNetappService} from "@sysos/lib-netapp";
import {SysosLibVmwareService} from "@sysos/lib-vmware";

import {
  mountRestoreDatastore,
  restoreDatastoreFiles, restoreVm,
  restoreVmGuestFiles,
  vmInstantRecovery
} from "./sysos-app-backups-manager.service";

@Injectable({
  providedIn: 'root'
})
export class SysosAppBackupsManagerHelpersService {

  constructor(private logger: NGXLogger,
              private NetApp: SysosLibNetappService,
              private VMWare: SysosLibVmwareService) {

  }

  /**
   * Main functions
   */
  mountRestoreSnapshotDatastore(data: mountRestoreDatastore) {
    // Check for available licenses
    return this.checkLicenses(data).then((res) => {
      if (res instanceof Error) throw new Error('Failed to check licenses');

      // Create Volume Clone
      return this.cloneVolumeFromSnapshot(data);
    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to clone volume from snapshot');

      // Mount Volume
      return this.mountVolumeToESXi(data);

    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to mount cloned volume from snapshot to ESXi host');

    }).catch((e) => {
      console.log(e);
      return e;
    });
  }

  restoreSnapshotDatastoreFiles(data: restoreDatastoreFiles) {
    // Check for available licenses
    return this.checkLicenses(data).then((res) => {
      if (res instanceof Error) throw new Error('Failed to check licenses');

      // Create Volume Clone
      return this.cloneVolumeFromSnapshot(data);
    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to clone volume from snapshot');

      // Mount Volume
      return this.mountVolumeToESXi(data);

    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to mount cloned volume from snapshot to ESXi host');

    }).catch((e) => {
      console.log(e);
      return e;
    });
  }

  restoreSnapshotVMGuestFiles(data: restoreVmGuestFiles) {
    // Check for available licenses
    return this.checkLicenses(data).then((res) => {
      if (res instanceof Error) throw new Error('Failed to check licenses');

      // Create Volume Clone
      return this.cloneVolumeFromSnapshot(data);
    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to clone volume from snapshot');

      // Mount Volume
      return this.mountVolumeToESXi(data);

    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to mount cloned volume from snapshot to ESXi host');

      return this.registerVM(data);

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to register VM to vCenter');
      return res;


    }).catch((e) => {
      return e;
    });
  }

  restoreSnapshotIntoInstantVM(data: vmInstantRecovery) {
    // Check for available licenses
    return this.checkLicenses(data).then((res) => {
      if (res instanceof Error) throw new Error('Failed to check licenses');

      // Create Volume Clone
      return this.cloneVolumeFromSnapshot(data);
    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to clone volume from snapshot');

      // Mount Volume
      return this.mountVolumeToESXi(data);

    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to mount cloned volume from snapshot to ESXi host');

      return this.registerVM(data);

    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to register VM from snapshot to ESXi host');

      if (data.vm.powerOn) {
        // Power On VM
        this.logger.debug('Backups Manager [%s] -> Powering on vm -> host [%s], VM [%s], ', data.uuid, data.host.host, data.vm.vm);
        return this.VMWare.powerOnVM(data.virtual.credential, data.virtual.host, data.virtual.port, data.host.host, data.vm.vm);
      }

      return res;

    }).then((res) => {
      if (res && res.status === 'error') throw new Error('Failed to power on VM on vCenter');

      return res;

    }).catch((e) => {
      console.log(e);
      return e;
    });
  }

  restoreSnapshotIntoVM(data: restoreVm) {
    //TODO: if new location
    /*return cloneVMFromSnapshot(data).then((data) => {

     });*/

    // Restore to current location (override VM)
    return this.restoreVMfromSnapshotToCurrentLocation(data).then((data) => {

      if (data.vm_power_on) {
        // Power On VM
        this.logger.debug('Backups Manager [%s] -> Powering on vm -> host [%s], VM [%s], ', data.uuid, data.esxi_host, data.vm.vm);
        return this.VMWare.powerOnVM(data.esxi_credential, data.esxi_address, data.esxi_port, data.esxi_host, data.vm.vm);
      }

    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to restore VM snapshot to current location');

    }).catch((e) => {
      console.log(e);
      return e;
    });
  }

  startVMBackup(data) {
    var relationships = {};
    var main_promises = [];
    var datastore_promises = [];
    var ss_promises = [];
    var ssr_promises = [];

    this.connections = connectionsFactory.connections();

    if (data.backupNow !== true) return; //TODO: set schedule

    if (data.selectedPrimaryStorage !== 'snapshot') return;

    // Start backup
    this.logger.debug('Backups Manager [%s] -> Running backup now -> name [%s]', data.uuid, data.backupName);

    // Get all relationships
    angular.forEach(data.selectedObjects, (object) => {

      if (object.type === 'Datastore') {
        var connection = connectionsFactory.getConnectionByUuid(object.parent);
        var datastore_data = $filter('filter')(connection.datastores, {
          obj: {
            name: object.id
          }
        })[0];

        angular.forEach(datastore_data.vm.ManagedObjectReference, (vm) => {
          var vm_data = $filter('filter')(connection.vms, {
            obj: {
              name: vm.name
            }
          })[0];

          // TODO: VM with more than 1 datastore
          if (Array.isArray(vm_data.datastore.ManagedObjectReference)) return;

          // Create a VM --> Datastor --> vCenter relationship
          if (!relationships[object.parent]) relationships[object.parent] = {};
          if (!relationships[object.parent][vm_data.datastore.ManagedObjectReference.name]) relationships[object.parent][vm_data.datastore.ManagedObjectReference.name] = [];

          relationships[object.parent][vm_data.datastore.ManagedObjectReference.name].push({
            vm: vm_data.obj.name,
            state: vm_data.runtime.powerState,
            type: 'VirtualMachine'
          });
        });
      }

      if (object.type === 'VirtualMachine') {

        // TODO: remove VMs in previous selected objects

        // TODO: VM with more than 1 datastore
        if (Array.isArray(object.object.datastore.ManagedObjectReference)) return;

        // Create a VM --> Datastor --> vCenter relationship
        if (!relationships[object.parent]) relationships[object.parent] = {};
        if (!relationships[object.parent][object.object.datastore.ManagedObjectReference.name]) relationships[object.parent][object.object.datastore.ManagedObjectReference.name] = [];

        relationships[object.parent][object.object.datastore.ManagedObjectReference.name].push({
          vm: object.id,
          state: object.object.runtime.powerState,
          type: 'VirtualMachine'
        });

      }
    });

    console.log(relationships);

    // For each vCenter
    angular.forEach(relationships, (datastores, vCenter) => {

      var connection = connectionsFactory.getConnectionByUuid(vCenter);
      var esxi_credential = connection.credential;
      var esxi_address = connection.host;
      var esxi_port = connection.port;
      var task_id;

      this.logger.debug('Backups Manager [%s] -> Connecting to vCenter -> vCenter [%s]', data.uuid, esxi_address);
      main_promises.push(this.VMWare.connectvCenterSoap(esxi_credential, esxi_address, esxi_port).then((res) => {
        if (res.status === 'error') throw new Error('Failed to connect to vCenter');

        return this.VMWare.createTask(esxi_credential, esxi_address, esxi_port, 'com.sysos.management.backup', 'Datacenter', 'group-d1');

      }).then((res) => {
        if (res.status === 'error') throw new Error('Failed to create task');
        this.logger.debug('Backups Manager [%s] -> Main task created -> vCenter [%s], task [%s]', data.uuid, esxi_address, res.data.key);

        task_id = res.data.key;

        return this.VMWare.setTaskState(esxi_credential, esxi_address, esxi_port, task_id, 'running');
      }).then((res) => {
        if (res.status === 'error') throw new Error('Failed to set task state');
        this.logger.debug('Backups Manager [%s] -> Main task running -> vCenter [%s], task [%s]', data.uuid, esxi_address, task_id);

        return this.VMWare.updateTaskProgress(esxi_credential, esxi_address, esxi_port, task_id, 20);
      }).then((res) => {
        if (res.status === 'error') throw new Error('Failed to update task progress');
        this.logger.debug('Backups Manager [%s] -> Main task 20% -> vCenter [%s], task [%s]', data.uuid, esxi_address, task_id);

        // Backup for each Datstore
        angular.forEach(datastores, (objects, datastore) => {

          var datastore_task_id;

          datastore_promises.push(this.VMWare.createTask(esxi_credential, esxi_address, esxi_port, 'com.sysos.management.backup', 'Datastore', datastore).then((res) => {
            if (res.status === 'error') throw new Error('Failed to create task');
            this.logger.debug('Backups Manager [%s] -> Datastore task created -> vCenter [%s], datastore [%s], task [%s]', data.uuid, esxi_address, datastore, res.data.key);

            datastore_task_id = res.data.key;

            return this.VMWare.setTaskState(esxi_credential, esxi_address, esxi_port, datastore_task_id, 'running');
          }).then((res) => {
            if (res.status === 'error') throw new Error('Failed to set task state');
            this.logger.debug('Backups Manager [%s] -> Datastore task running -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

            return this.VMWare.updateTaskProgress(esxi_credential, esxi_address, esxi_port, datastore_task_id, 20);
          }).then((res) => {
            if (res.status === 'error') throw new Error('Failed to update task progress');
            this.logger.debug('Backups Manager [%s] -> Datastore task 20% -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

            var smanagerFactory = $injector.get('smanagerFactory');
            var storage_link = smanagerFactory.getLinkByVMwareDatastore(vCenter, datastore);

            if (!storage_link) throw new Error('Unable to get Storage Link');

            var storage = connectionsFactory.getConnectionByUuid(storage_link.storage);
            var vserver = eval(connectionsFactory.getObjectByUuidMapping(storage_link.vserver)); // jshint ignore:line
            var volume = eval(connectionsFactory.getObjectByUuidMapping(storage_link.volume)); // jshint ignore:line

            if (!storage) throw new Error('Unable to get Storage object');
            if (!vserver) throw new Error('Unable to get Vserver object');
            if (!volume) throw new Error('Unable to get Volume object');

            var netapp_credential = storage.credential;
            var netapp_host = storage.host;
            var netapp_port = storage.port;
            var snapshots = [];

            angular.forEach(objects, (key) => {

              /*
               * Create VM Snapshot if vm state is poweredOn and quiesceTools checked
               */
              if (key.state === 'poweredOn' && data.quiesceTools) {
                this.logger.debug('Backups Manager [%s] -> Creating VM snapshot -> VM [%s]', data.uuid, key.vm);

                ss_promises.push(this.VMWare.createSnapShot(esxi_credential, esxi_address, esxi_port, key.vm, 'SysOS_backup_' + data.uuid, 'SysOS temporary snapshot. Do not delete this snapshot while a backup is running.', false, true).then((res) => {
                  if (res.status === 'error') throw new Error('Failed to create snapshot');
                  if (res.data[0].propSet.info.error) throw new Error('Failed to create snapshot');

                  this.logger.debug('Backups Manager [%s] -> VM snapshot created -> vCenter [%s], vm [%s], snapshot [%s]', data.uuid, esxi_address, key.vm, res.data[0].propSet.info.result.name);

                  snapshots.push(res.data[0].propSet.info.result.name);

                }).catch((e) => {
                  console.log(e);
                  return e;
                }));
              } else {
                this.logger.debug('Backups Manager [%s] -> VM poweredOff, do not create snapshot -> VM [%s]', data.uuid, key.vm);
              }

            });
            //End VM each

            return $q.all(ss_promises).then(() => {

              return this.VMWare.updateTaskProgress(esxi_credential, esxi_address, esxi_port, datastore_task_id, 40);
            }).then((res) => {
              if (res.status === 'error') throw new Error('Failed to update task progress');
              this.logger.debug('Backups Manager [%s] -> Datastore task 40% -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

              /*
               * Create Storage Snapshot
               */
              return this.NetApp.createSnapshot(netapp_credential, netapp_host, netapp_port, vserver['vserver-name'], volume['volume-id-attributes'].name, data.backupName);

            }).then((res) => {
              if (res.status === 'error') throw new Error('Failed to create Volume Snapshot');
              this.logger.debug('Backups Manager [%s] -> Storage snapshot created -> vCenter [%s], storage [%s], vserver [%s], volume [%s]', data.uuid, esxi_address, netapp_host, vserver['vserver-name'], volume['volume-id-attributes'].name);

              return this.VMWare.updateTaskProgress(esxi_credential, esxi_address, esxi_port, datastore_task_id, 60);
            }).then((res) => {
              if (res.status === 'error') throw new Error('Failed to update task progress');
              this.logger.debug('Backups Manager [%s] -> Datastore task 60% -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

              /*
               * Delete VM Snapshot
               */
              angular.forEach(snapshots, (snapshot) => {
                ssr_promises.push(this.VMWare.removeSnapshot(esxi_credential, esxi_address, esxi_port, snapshot, false).then((res) => {
                  if (res.status === 'error') throw new Error('Failed to delete snapshot');
                  this.logger.debug('Backups Manager [%s] -> VM snapshot deleted -> vCenter [%s], snapshot [%s]', data.uuid, esxi_address, snapshot);

                }).catch((e) => {
                  console.log(e);
                  return e;
                }));
              });
              //End Snapshots each

              return $q.all(ssr_promises);

            }).then(() => {
              return this.VMWare.updateTaskProgress(esxi_credential, esxi_address, esxi_port, datastore_task_id, 80);
            }).then((res) => {
              if (res.status === 'error') throw new Error('Failed to update task progress');
              this.logger.debug('Backups Manager [%s] -> Datastore task 80% -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

              // End Task
              return this.VMWare.setTaskState(esxi_credential, esxi_address, esxi_port, datastore_task_id, 'success');

            }).then((res) => {
              if (res.status === 'error') throw new Error('Failed to set task state');
              this.logger.debug('Backups Manager [%s] -> Datastore task success -> vCenter [%s], task [%s]', data.uuid, esxi_address, datastore_task_id);

            }).catch((e) => {
              console.log(e);
              return e;
            });

          }));

        });
        //End Datastore each

        // End vCenter backup task
        return $q.all(datastore_promises).then(() => {

          return this.VMWare.updateTaskProgress(esxi_credential, esxi_address, esxi_port, task_id, 80);

        }).then((res) => {
          if (res.status === 'error') throw new Error('Failed to update task progress');
          this.logger.debug('Backups Manager [%s] -> Main task 80% -> vCenter [%s], task [%s]', data.uuid, esxi_address, task_id);

          // End Task
          return this.VMWare.setTaskState(esxi_credential, esxi_address, esxi_port, task_id, 'success');
        }).then((res) => {
          if (res.status === 'error') throw new Error('Failed to set task state');
          this.logger.debug('Backups Manager [%s] -> Main task success -> vCenter [%s], task [%s]', data.uuid, esxi_address, task_id);

        }).catch((e) => {
          console.log(e);
          return e;
        });

      }));
    });
    // End vCenter each

    return $q.all(main_promises).catch((e) => {
      console.log(e);
      return e;
    });
  }

  /**
   * Helpers
   */

  /**
   * @description
   * Returns snapshot object given snapshot uuid
   */
  getSnapshotName(data) {
    return $filter('filter')(data.snapshots, {
      'snapshot-instance-uuid': data.snapshot
    })[0].name;
  };

  /**
   * @description
   * Return the latest VM snapshot
   */
  getLastSnapshot(rootSnapshotList) {
    if (rootSnapshotList.hasOwnProperty('childSnapshotList')) return this.getLastSnapshot(rootSnapshotList.childSnapshotList);

    return rootSnapshotList;
  };

  /**
   * @description
   * Checks if NetApp storage have required licenses
   */
  checkLicenses(data: mountRestoreDatastore | restoreDatastoreFiles | restoreVmGuestFiles | vmInstantRecovery) {
    this.logger.debug('Backups Manager [%s] -> Cloning storage licenses -> storage [%s]', data.uuid, data.storage.host);

    return this.NetApp.getLicenses(
      data.storage.credential,
      data.storage.host,
      data.storage.port
    ).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get licenses');

      const flexClone = res.data.filter(obj => {
        return obj.package === 'flexclone';
      })[0].method;

      if (flexClone !== 'license') throw new Error('FlexClone license not found');

    }).catch((e) => {
      console.log(e);
      return e;
    });
  }

  /**
   * @description
   * Clones Storage Volume from Snapshot
   */
  cloneVolumeFromSnapshot(data: mountRestoreDatastore | restoreDatastoreFiles | restoreVmGuestFiles | vmInstantRecovery, volumeNum: number = 0) {

    // Set new volume name
    if (volumeNum !== 0) {
      data.volumeName = 'SysOS_' + data.volume['volume-id-attributes'].name + '_Restore_' + volumeNum;
      data.datastorePath = 'SysOS_' + data.volume['volume-id-attributes'].name + '_' + volumeNum;
    } else {
      data.volumeName = 'SysOS_' + data.volume['volume-id-attributes'].name + '_Restore';
      data.datastorePath = 'SysOS_' + data.volume['volume-id-attributes'].name;
    }

    // Create Volume Clone
    this.logger.debug('Backups Manager [%s] -> Cloning volume from snapshot -> vserver [%s], volume [%s], snapshot [%s], volumeName [%s]', data.uuid, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, this.getSnapshotName(data), data.volumeName);
    return this.NetApp.cloneVolumeFromSnapshot(
      data.storage.credential,
      data.storage.host,
      data.storage.port,
      data.vserver['vserver-name'],
      data.volume['volume-id-attributes'].name,
      data.volumeName,
      this.getSnapshotName(data)
    ).then((res) => {
      if (res.status === 'error') {

        // Error duplicated volume, try next.
        if (res.error.errno === '17') throw new Error('17');

        throw new Error('Failed to clone Volume');
      }

      return setRestoreStatus(data, 'volume_cloned');
    }).then(() => {

      // Mount Volume Point
      this.logger.debug('Backups Manager [%s] -> Mounting cloned volume -> vserver [%s], volume [%s]', data.uuid, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name);
      return this.NetApp.mountVolume(
        data.storage.credential,
        data.storage.host,
        data.storage.port,
        data.vserver['vserver-name'],
        data.volumeName,
        '/' + data.volumeName
      );

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to mount Volume');

      return setRestoreStatus(data, 'namespace_mounted');

    }).catch((e) => {

      // Error duplicated volume, try next.
      if (e.message === '17') {
        this.logger.debug('Backups Manager [%s] -> Cloning volume from snapshot -> vserver [%s], volume [%s], snapshot [%s], volumeName [%s] -> Volume with same name found', data.uuid, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, this.getSnapshotName(data), data.volumeName);

        return this.cloneVolumeFromSnapshot(data, ++volumeNum);
      }

      console.log(e);
      return e;
    });
  }

  /**
   * @description
   * Mount storage Datastore to ESXi host
   */
  mountVolumeToESXi(data: mountRestoreDatastore | restoreDatastoreFiles | restoreVmGuestFiles | vmInstantRecovery) {
    this.logger.debug('Backups Manager [%s] -> Connection to vCenter using SOAP -> vCenter [%s]', data.uuid, data.virtual.host);

    let datastoreSystem: string;

    return this.VMWare.connectvCenterSoap(data.virtual.credential, data.virtual.host, data.virtual.port).then((res) => {
      if (res.status === 'error') throw new Error('Failed to connect to vCenter');

      // Get Datastore System from ESXi host to mount
      this.logger.debug('Backups Manager [%s] -> Getting datastore system -> host [%s]', data.uuid, data.host.host);
      return this.VMWare.getHostConfigManagerDatastoreSystem(data.virtual.credential, data.virtual.host, data.virtual.port, data.host.host);

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get datastoreSystem from vCenter');

      datastoreSystem = res.data;

      this.logger.debug('Backups Manager [%s] -> Get Volume Exports -> vserver [%s], volume [%s], volumeName [%s]', data.uuid, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, data.volumeName);
      return this.NetApp.getNFSExportRulesList(
        data.storage.credential,
        data.storage.host,
        data.storage.port,
        data.vserver['vserver-name'],
        data.volume['volume-id-attributes'].name
      );

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Volume Exports');

      console.log(res);

      // Check export that allows "all-hosts"
      var allHostsExport = $filter('filter')(res.data['exports-rule-info-2']['security-rules']['security-rule-info'], {
        'read-write': {
          'exports-hostname-info': {
            'all-hosts': true
          }
        }
      });

      if (allHostsExport.length === 0) {

        // TODO: check connectivity from NFS node
        this.logger.debug('Backups Manager [%s] -> Getting network system -> host [%s]', data.uuid, data.host.host);
        return this.VMWare.getHostConfigManagerNetworkSystem(data.virtual.credential, data.virtual.host, data.virtual.port, data.host.host).then((res) => {
          if (res.status === 'error') throw new Error('Failed to get networkSystem from vCenter');

          const networkSystem = res.data;
          return this.VMWare.getHostNetworkInfoConsoleVnic(data.virtual.credential, data.virtual.host, data.virtual.port, networkSystem);

        }).then((res) => {
          if (res.status === 'error') throw new Error('Failed to get NetworkInfoConsoleVnic from vCenter');

          const esxiExportAddress = '0.0.0.0/0'; //TODO

          var esxiHostExport = $filter('filter')(res.data['exports-rule-info-2']['security-rules']['security-rule-info'], {
            'read-write': {
              'exports-hostname-info': {
                'name': esxiExportAddress //TODO
              }
            }
          });

          if (esxiHostExport.length === 0) {
            this.logger.debug('Backups Manager [%s] -> No Volume Export matched, create it -> vserver [%s], policy [%s], client [%s]', data.uuid, data.vserver['vserver-name'], esxiExportAddress);
            return this.NetApp.setExportRule(
              data.storage.credential,
              data.storage.host,
              data.storage.port,
              data.vserver['vserver-name'],
              data.volume['volume-export-attributes'].policy,
              esxiExportAddress // TODO
            );
          }

        }).then((res) => {
          if (res.status === 'error') throw new Error('Failed to create Volume Exports');
        });

      }

      return;

    }).then(() => {

      //TODO: check esxi firewall rules to make sure NFS connectivity

      return;

    }).then(() => {

      this.logger.debug('Backups Manager [%s] -> Mount volume to ESXi -> datastoreSystem [%s], nfs_ip [%s], volume [%s], path [%s]', data.uuid, datastoreSystem, data.netapp_nfs_ip[0].address, '/' + data.volumeName + '/', data.datastorePath);
      return this.VMWare.mountDatastore(
        data.virtual.credential,
        data.virtual.host,
        data.virtual.port,
        datastoreSystem,
        data.netapp_nfs_ip[0].address, //TODO: why use the 1st ip
        '/' + data.volumeName + '/',
        data.datastorePath
      );

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to mount Datastore to host');

      // Get mounted datastore name
      data.esxi_datastore = res.data;
      return setRestoreStatus(data, 'mounted_to_esx');

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Datastore Properties from vCenter');

    }).catch((e) => {
      console.log(e);
      return e;
    });
  }

  /**
   * @description
   * Register and power on VM
   */
  registerVM(data: restoreVmGuestFiles | vmInstantRecovery) {

    data.vm.path = data.vm.summary.config.vmPathName.split(']').pop();
    data.vm.path = data.vm.path.substring(0, data.vm.path.lastIndexOf('/') + 1).substr(1);

    // Get VM in Datastore (check if exist)
    return this.VMWare.getVMFileDataFromDatastore(
      data.virtual.credential,
      data.virtual.host,
      data.virtual.port,
      data.esxi_datastore,
      data.datastorePath,
      data.vm.path,
      data.vm.summary.config.vmPathName.split('/').pop()
    ).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get files from datastore');
      if (res.data[0].propSet.info.error) throw new Error(res.data[0].propSet.info.error);

      // Register VM
      //TODO: check if VM with same name exists
      this.logger.debug('Backups Manager [%s] -> Register VM to ESXi -> host [%s], vmx_file [%s], vm_name [%s], folder [%s], resource_pool [%s]', data.uuid, data.host.host, '[' + data.datastorePath + '] ' + data.vm.summary.config.vmPathName.split(']').pop(), data.vm.name, data.host.folder, data.host.resource_pool);
      return this.VMWare.registerVM(
        data.virtual.credential,
        data.virtual.host,
        data.virtual.port,
        data.host.host,
        '[' + data.datastorePath + '] ' + data.vm.summary.config.vmPathName.split(']').pop().substr(1),
        data.vm.name,
        data.host.folder,
        data.host.resource_pool
      );

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to register VM to vCenter');

      setRestoreStatus(data, 'vm_registred');

      data.vm.vm = res.data.result.name;

      // Set new uuid to this VM to prevent duplicates
      const newVMUuid = uuidv4();
      data.vm.config.uuid = newVMUuid;
      this.logger.debug('Backups Manager [%s] -> Reconfigure VM uuid -> vm_name [%s], newVMUuid [%s]', data.vm.name, newVMUuid);
      return this.VMWare.reconfigureVM(data.virtual.credential, data.virtual.host, data.virtual.port, data.vm.vm, '<uuid>' + newVMUuid + '</uuid>');
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to change VM uuid');

      return this.goToSnapshot(data);

    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to revert VM to Snapshot');

    }).catch((e) => {
      console.log(e);
      return e;
    });

  };

  /**
   * @description
   * Restore a VM from Snapshot to same location (override)
   */
  restoreVMfromSnapshotToCurrentLocation(data: restoreVm) {
    let sfr_promises = [];
    let vm_path;

    this.logger.debug('Backups Manager [%s] -> Connection to vCenter using SOAP -> vCenter [%s]', data.uuid, data.virtual.host);
    return this.VMWare.connectvCenterSoap(data.virtual.credential, data.virtual.host, data.virtual.port).then((res) => {
      if (res.status === 'error') throw new Error('Failed to connect to vCenter');

      this.logger.debug('Backups Manager [%s] -> Get VM path -> VM [%s]', data.uuid, data.vm.vm);
      return this.VMWare.getVMPath(data.virtual.credential, data.virtual.host, data.virtual.port, data.vm.vm);
    }).then((res) => {
      if (res && res.status === 'error') throw new Error('Failed to get VM path');

      const regex = /\[*\]\s(.*)\/.*\.vmx/gi;
      const str = res.data.propSet['config.files.vmPathName'];

      vm_path = regex.exec(str)[1];

      if (!vm_path) throw new Error('SAFETY STOP: VM cannot be on root folder');

      this.logger.debug('Backups Manager [%s] -> Get VM runtime -> VM [%s]', data.uuid, data.vm.vm);
      return this.VMWare.getVMRuntime(data.virtual.credential, data.virtual.host, data.virtual.port, data.vm.vm);
    }).then((res) => {
      if (res && res.status === 'error') throw new Error('Failed to get VM runtime');

      if (res.data.propSet.runtime.powerState === 'poweredOn') {
        this.logger.debug('Backups Manager [%s] -> Powering off VM -> VM [%s]', data.uuid, data.vm.vm);
        return this.VMWare.powerOffVM(data.virtual.credential, data.virtual.host, data.virtual.port, data.vm.vm);
      }

      return res;

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to power off VM at vCenter');

      this.logger.debug('Backups Manager [%s] -> Get snapshot files from storage -> storage [%s], vserver [%s], volume [%s], snapshot [%s], path [%s]', data.uuid, data.storage.host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, this.getSnapshotName(data), '/' + vm_path);
      return this.NetApp.getSnapshotFiles(
        data.storage.credential,
        data.storage.host,
        data.storage.port,
        data.vserver['vserver-name'],
        data.volume['volume-id-attributes'].name,
        this.getSnapshotName(data),
        '/' + vm_path
      );
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Snapshot files');

      res.data.forEach((file: { name: string }) => {
        if (file.name.indexOf('.lck') >= 0) return;

        sfr_promises.push(this.NetApp.snapshotRestoreFile(
          data.storage.credential,
          data.storage.host,
          data.storage.port,
          data.vserver['vserver-name'],
          data.volume['volume-id-attributes'].name,
          this.getSnapshotName(data),
          '/vol/' + data.volume['volume-id-attributes'].name + '/' + vm_path + '/' + file.name
        ).then((res) => {
          this.logger.debug('Backups Manager [%s] -> Restoring file from storage snapshot -> storage [%s], vserver [%s], volume [%s], snapshot [%s], path [%s]', data.uuid, data.storage.host, data.vserver['vserver-name'], data.volume['volume-id-attributes'].name, this.getSnapshotName(data), '/vol/' + data.volume['volume-id-attributes'].name + '/' + vm_path + '/' + file.name);
          if (res.status === 'error') throw new Error('Failed to restore file from storage snapshot');
        }));
      });

      return Promise.all(sfr_promises);

    }).then(() => {

      this.logger.debug('Backups Manager [%s] -> Reloading VM -> VM [%s]', data.uuid, data.vm.vm);
      return this.VMWare.reloadVM(data.virtual.credential, data.virtual.host, data.virtual.port, data.vm.vm);

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to reload VM');

      return this.goToSnapshot(data);

    }).then((res) => {
      if (res instanceof Error) throw new Error('Failed to revert VM to Snapshot');

      return res;

    }).catch((e) => {
      console.log(e);
      return e;
    });
  };

  /**
   * goToSnapshot
   *
   * @description
   * Checks if VM have a snapshot called 'SysOS_backup_*' and if exists reverts the VM to this snapshot
   */
  goToSnapshot(data: restoreVmGuestFiles | vmInstantRecovery | restoreVm) {
    let last_snapshot: {
      name: string,
      snapshot: {
        name: string
      }
    };

    this.logger.debug('Backups Manager [%s] -> Get all VM snapshots -> vm [%s]', data.uuid, data.vm.vm);
    return this.VMWare.getVMSnapshots(data.virtual.credential, data.virtual.host, data.virtual.port, data.vm.vm).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get VM Snapshots');

      // No snapshots found
      if (!res.data[0].propSet) {
        this.logger.debug('Backups Manager [%s] -> No snapshots found -> vm [%s]', data.uuid, data.vm.vm);
        return res;
      }

      last_snapshot = this.getLastSnapshot(res.data[0].propSet.snapshot.rootSnapshotList);

      if (last_snapshot.name.startsWith('SysOS_backup_')) {
        this.logger.debug('Backups Manager [%s] -> Reverting VM to snapshot -> snapshot [%s]', data.uuid, last_snapshot.snapshot.name);
        return this.VMWare.revertToSnapshot(data.virtual.credential, data.virtual.host, data.virtual.port, last_snapshot.snapshot.name);
      }

      this.logger.debug('Backups Manager [%s] -> Last snapshot is not from SysOS backup -> snapshot [%s], snapshot_id [%s]', data.uuid, last_snapshot.name, last_snapshot.snapshot.name);
      return res;

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get VM Snapshots');

      // No snapshots found
      if (!last_snapshot) return res;

      if (last_snapshot.name.startsWith('SysOS_backup_')) {
        this.logger.debug('Backups Manager [%s] -> Deleting VM snapshot -> snapshot [%s]', data.uuid, last_snapshot.snapshot.name);
        return this.VMWare.removeSnapshot(data.virtual.credential, data.virtual.host, data.virtual.port, last_snapshot.snapshot.name, true);
      }

      return res;

    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to delete VM Snapshot');

      return res;

    }).catch((e) => {
      console.log(e);
      return e;
    });
  };
}
