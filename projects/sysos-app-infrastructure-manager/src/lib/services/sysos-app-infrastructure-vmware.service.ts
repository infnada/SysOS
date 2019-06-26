import { Injectable } from '@angular/core';

import {NGXLogger} from 'ngx-logger';
import {ToastrService} from 'ngx-toastr';

import {SysosLibModalService} from '@sysos/lib-modal';
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

    }).then( () => {

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

    }).then( res => {

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

    connections.forEach((vcenter: IMConnection) => {
      vcenter.data.Datacenters.forEach(datacenter => {

        // Standalone hosts
        datacenter.Hosts.forEach(host => {

          // Setup basic connection information required for "Backups Manager" application
          ESXihosts.push({
            connection_uuid: vcenter.uuid,
            connection_state: host.connection_state,
            host: host.host,
            name: host.name,
            power_state: host.power_state,
            connection_credential: vcenter.credential,
            connection_address: vcenter.host,
            connection_port: vcenter.port,
            datacenter: datacenter.datacenter
          });
        });

        // Cluster hosts
        datacenter.Clusters.forEach(cluster => {
          cluster.Hosts.forEach(host => {

            // Setup basic connection information required for "Backups Manager" application
            ESXihosts.push({
              connection_uuid: vcenter.uuid,
              connection_state: host.connection_state,
              host: host.host,
              name: host.name,
              power_state: host.power_state,
              connection_credential: vcenter.credential,
              connection_address: vcenter.host,
              connection_port: vcenter.port,
              datacenter: datacenter.datacenter
            });
          });
        });

      });
    });

    return ESXihosts;
  }

  doWithVM(connectionUuid: string, vm: {}, action: string): void {

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
}
