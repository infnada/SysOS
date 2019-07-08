import {Injectable} from '@angular/core';

import {NGXLogger} from 'ngx-logger';
import {ToastrService} from 'ngx-toastr';

import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibFileSystemUiService} from '@sysos/lib-file-system-ui';
import {SysosLibVmwareService} from '@sysos/lib-vmware';

import {SysosAppInfrastructureManagerService} from './sysos-app-infrastructure-manager.service';
import {IMConnection} from '../types/imconnection';
import {IMESXiHost} from '../types/imesxi-hosts';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureVmwareService {
  constructor(private logger: NGXLogger,
              private Toastr: ToastrService,
              private Modal: SysosLibModalService,
              private FileSystemUi: SysosLibFileSystemUiService,
              private VMWare: SysosLibVmwareService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {
  }

  getVMWareData(connection: IMConnection): void {

    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter/ESXi...', '.window--infrastructure-manager .window__main', 'plain').then(() => {

      /*  // Login to vmware
        return this.VMWare.connectvCenter(connection.credential, connection.host, connection.port);
      }).then((res) => {
        if (res.status === 'error') throw new Error(res.data);
  */
      // Login to SOAP vmware
      return this.VMWare.connectvCenterSoap(connection.credential, connection.host, connection.port);
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to connect to VMWare');

      // Get client version
      return this.VMWare.getClientVersion(connection.host, connection.port);
    }).then((res) => {
      if (res.status === 'error') throw new Error(res.data);

      if (res.data.version[0] < 6) throw new Error('VMWare version not compatible');

      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Base = {
        apiVersion: res.data.apiVersion[0],
        downloadUrl: res.data.downloadUrl[0],
        exactVersion: res.data.exactVersion[0],
        flexClientVersion: res.data.flexClientVersion[0],
        patchVersion: res.data.patchVersion[0],
        version: res.data.version[0],
        authdPort: (res.data.authdPort ? res.data.authdPort[0] : null),
        type: (res.data.authdPort ? 'ESXi' : 'vCenter')
      };

      this.Modal.changeModalText('Checking SysOS extension...', '.window--infrastructure-manager .window__main');

      // Get SysOS management extension
      return this.VMWare.findSysOSExtension(connection.credential, connection.host, connection.port);

    }).then((res) => {

      // Register extension if not registered
      if (!res.data.returnval) return this.VMWare.registerExtension(connection.credential, connection.host, connection.port);

    }).then(() => {

      this.Modal.changeModalText('Getting data...', '.window--infrastructure-manager .window__main');

      return this.VMWare.createAllBasicDataFilter(connection.credential, connection.host, connection.port);

    }).then((res) => {

      console.log(res);

      return this.VMWare.getWaitForUpdatesEx(connection.credential, connection.host, connection.port);

    }).then((res) => {

      this.InfrastructureManager.getConnectionByUuid(connection.uuid).data.Data = res.data.returnval[0].filterSet[0].objectSet;

      /*const getChildren = (parent) => {

        // Set parent object name
        parent.kind = parent.kind[0];
        parent.name = parent.changeSet.find(set => set.name[0] === 'name').val[0]._;
        const parentSet = parent.changeSet.find(set => set.name[0] === 'parent');
        parent.parent = (parentSet.hasOwnProperty('val') ? parentSet.val[0]._ : '');

        parent.realName = parent.obj[0]._;
        parent.realType = parent.obj[0].$.type;

        // Delete unused properties
        parent.changeSet = parent.changeSet.filter(set => set.name[0] !== 'name' && set.name[0] !== 'parent');
        delete parent.obj;

        // Get childrens
        parent.children = res.data.returnval[0].filterSet[0].objectSet.filter(obj => {

          // Return when property name === 'parent' and it's value === func.parent name
          return obj.changeSet.find(set => set.name[0] === 'parent' && set.hasOwnProperty('val') && set.val[0]._ === parent.realName);
        });

        // Recursively get children
        parent.children.forEach(child => {

          // Remove child from response array
          res.data.returnval[0].filterSet[0].objectSet.splice(
            res.data.returnval[0].filterSet[0].objectSet.indexOf(child), 1
          );


          getChildren(child);
        });

      };

      // Get main parent object
      const mainParent = res.data.returnval[0].filterSet[0].objectSet.find(obj => {
        return obj.changeSet.find(set => set.name[0] === 'parent' && !set.hasOwnProperty('val'));
      });

      // Remove element from response array
      res.data.returnval[0].filterSet[0].objectSet.splice(
        res.data.returnval[0].filterSet[0].objectSet.findIndex(obj => {
          return obj.changeSet.find(set => set.name[0] === 'parent' && !set.hasOwnProperty('val'));
        }), 1
      );

      // Get all children from mainParent object
      getChildren(mainParent);

      console.log(mainParent);*/

    }).then(() => {

      // Check if any datastore is from a managed storage system and link it.
      return this.InfrastructureManager.checkLinkBetweenManagedNodes('vmware', connection.uuid);

    }).then(() => {

      this.Modal.changeModalText('Saving connection to file', '.window--infrastructure-manager .window__main');

      this.InfrastructureManager.saveConnection(this.InfrastructureManager.getConnectionByUuid(connection.uuid));
      this.Modal.closeModal('.window--infrastructure-manager .window__main');

      this.Toastr.success('VMWare connection added successfully');

      // Tell InfrastructureManager that we changed connections data
      this.InfrastructureManager.connectionsUpdated();

      return this.VMWare.getWaitForUpdatesEx(connection.credential, connection.host, connection.port);

    }).then(res => {

      console.log(res);

    }).catch((e) => {
      this.Modal.closeModal('.window--infrastructure-manager .window__main');
      this.InfrastructureManager.setActiveConnection(null);

      this.InfrastructureManager.deleteConnection(connection.uuid);

      if (e.message === 'ENOTFOUND') {
        return this.Toastr.error(`Host not found (${connection.host})`, 'Error trying to connect to vCenter');
      }

      if (e.message === 'ETIMEDOUT') {
        return this.Toastr.error(`Timeout while connecting to ${connection.host}`, 'Error trying to connect to vCenter');
      }

      if (e.message === 'Unauthorized') {
        return this.Toastr.error(`Invalid credentials (${connection.host})`, 'Error trying to connect to vCenter');
      }

      this.Toastr.error(e.message, 'Error getting data from vCenter');
      throw new Error(e);
    });

    // Tell InfrastructureManager that we changed connections data
    this.InfrastructureManager.connectionsUpdated();
  }

  /**
   * @description
   * Gets all ESXi hosts from all existing vCenter connections
   */
  getESXihosts(): IMESXiHost[] {
    const connections = this.InfrastructureManager.getConnectionsByType('vmware');
    const ESXihosts: IMESXiHost[] = [];

    connections.forEach((vCenter: IMConnection) => {
      vCenter.data.Datacenters.forEach(datacenter => {

        // Standalone hosts
        datacenter.Hosts.forEach(host => {

          // Setup basic connection information required for "Backups Manager" application
          ESXihosts.push({
            virtual: {
              uuid: vCenter.uuid,
              credential: vCenter.credential,
              host: vCenter.host,
              port: vCenter.port,
            },
            host: {
              connection_state: host.connection_state,
              host: host.host,
              name: host.name,
              power_state: host.power_state,
              datacenter: datacenter.datacenter
            }
          });
        });

        // Cluster hosts
        datacenter.Clusters.forEach(cluster => {
          cluster.Hosts.forEach(host => {

            // Setup basic connection information required for "Backups Manager" application
            ESXihosts.push({
              virtual: {
                uuid: vCenter.uuid,
                credential: vCenter.credential,
                host: vCenter.host,
                port: vCenter.port,
              },
              host: {
                connection_state: host.connection_state,
                host: host.host,
                name: host.name,
                power_state: host.power_state,
                datacenter: datacenter.datacenter
              }
            });
          });
        });

      });
    });

    return ESXihosts;
  }

  doWithVM(connectionUuid: string, vm: {[key: string]: any}, action: 'powerOn'|'powerOff'|'suspend'|'reset'|'powerOffGuestOS'|'restartGuestOS'|'refresh'): void {

    const connection = this.InfrastructureManager.getConnectionByUuid(connectionUuid);

    this.VMWare.connectvCenterSoap(connection.credential, connection.host, connection.port).then((res) => {
      if (res.status === 'error') throw new Error('Failed to connect to vCenter');

      return this.VMWare.getVMRuntime(connection.credential, connection.host, connection.port, vm);
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get VM runtime');

      // powerOn
      if (action === 'powerOn') {
        if (res.data.propSet.runtime.powerState === 'poweredOn') return res;
        return this.VMWare.powerOnVM(connection.credential, connection.host, connection.port, res.data.propSet.runtime.host.name, vm);
      }

      // powerOff
      if (action === 'powerOff') {
        if (res.data.propSet.runtime.powerState === 'poweredOff') return res;
        return this.VMWare.powerOffVM(connection.credential, connection.host, connection.port, vm);
      }

      // suspend
      if (action === 'suspend') {
        if (res.data.propSet.runtime.powerState !== 'poweredOn') return res;
        return this.VMWare.suspendVM(connection.credential, connection.host, connection.port, vm);
      }

      // reset
      if (action === 'reset') {
        if (res.data.propSet.runtime.powerState !== 'poweredOn') return res;
        return this.VMWare.resetVM(connection.credential, connection.host, connection.port, vm);
      }

      // powerOffGuestOS
      if (action === 'powerOffGuestOS') {
        if (res.data.propSet.runtime.powerState !== 'poweredOn') return res;
        return this.VMWare.shutdownGuest(connection.credential, connection.host, connection.port, vm);
      }

      // restartGuestOS
      if (action === 'restartGuestOS') {
        if (res.data.propSet.runtime.powerState !== 'poweredOn') return res;
        return this.VMWare.rebootGuest(connection.credential, connection.host, connection.port, vm);
      }

      // refresh
      if (action === 'refresh') {
        // TODO: still needed?
      }

    }).then((res) => {
      if (res.status === 'error') throw new Error(`Failed to ${action} off VM`);

    }).catch((e) => {
      throw e;
    });

  }

  /**
   * Returns all datastores with his parent Datacenter
   */
  getConnectionDatastores(connectionUuid): Array<any> {
    const datastores = this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.filter(obj => {
      return obj.type === 'Datastore';
    });

    const getParentObjectByType = (type: string, ofParent: string) => {
      const parentObject = this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.find(obj => {
        return obj.obj[0]._ === ofParent;
      });

      if (parentObject.type === type) return parentObject.obj[0]._;
      return getParentObjectByType(type, parentObject.changeSet.find(set => set.name[0] === 'parent').val[0]._);
    };

    datastores.forEach((datastore) => {
      datastore.datacenter = getParentObjectByType('Datacenter', datastore.obj[0]._);
    });

    return datastores;
  }

  registerFileSystemUiHandlers(): void {
    this.FileSystemUi.createHandler('folder', 'vmware', (data) => {
      this.Modal.openLittleModal('PLEASE WAIT', 'Creating folder...', data.selector, 'plain');

      this.VMWare.createFolderToDatastore(
        data.connection.credential,
        data.connection.host,
        data.connection.port,
        data.connection.name,
        data.currentPath + data.name,
        data.connection.datacenter
      ).then((res) => {
        if (res.status === 'error') throw new Error('Failed to create folder');

        this.Modal.closeModal(data.selector);

        this.FileSystemUi.refreshPath(data.currentPath);
      }).catch((error) => {
        this.logger.error('[DatastoreExplorerServer] -> UIcreateFolder -> Error while creating folder -> ', error);
        this.Modal.closeModal(data.selector);
      });
    });

    this.FileSystemUi.createHandler('rename', 'vmware', (data) => {
      this.Modal.openLittleModal('PLEASE WAIT', 'Moving file...', data.selector, 'plain');

      this.VMWare.moveFileFromDatastore(
        data.connection.credential,
        data.connection.host,
        data.connection.port,
        data.connection.name,
        data.currentPath + data.file.filename, // original file name
        data.connection.datacenter,
        data.connection.name,
        data.currentPath + data.name, // new file name
        data.connection.datacenter
      ).then((res) => {
        if (res.status === 'error') throw new Error('Failed to rename the fie');

        this.Modal.closeModal(data.selector);

        this.FileSystemUi.refreshPath(data.currentPath);
      }).catch((error) => {
        this.logger.error('[DatastoreExplorerServer] -> UIcreateFolder -> Error while creating folder -> ', error);
        this.Modal.closeModal(data.selector);
      });
    });

    this.FileSystemUi.createHandler('delete', 'vmware', (data) => {
      this.Modal.openLittleModal('PLEASE WAIT', 'Deleting file...', data.selector, 'plain');

      this.VMWare.deleteFileFromDatastore(
        data.connection.credential,
        data.connection.host,
        data.connection.port,
        data.connection.name,
        data.currentPath + data.file.filename,
        data.connection.datacenter
      ).then((res) => {
        if (res.status === 'error') throw new Error('Failed to delete the fie');

        this.Modal.closeModal(data.selector);

        this.FileSystemUi.refreshPath(data.currentPath);
      }).catch((error) => {
        this.logger.error('[DatastoreExplorerServer] -> UIcreateFolder -> Error while creating folder -> ', error);
        this.Modal.closeModal(data.selector);
      });
    });
  }
}
