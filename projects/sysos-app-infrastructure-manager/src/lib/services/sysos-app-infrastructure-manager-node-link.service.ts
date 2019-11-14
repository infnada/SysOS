import {Injectable} from '@angular/core';

import {SysosAppInfrastructureManagerService} from './sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureManagerObjectHelperService} from './sysos-app-infrastructure-manager-object-helper.service';
import {ImConnection} from '../types/im-connection';
import {ImDataObject} from '../types/im-data-object';
import {VMWareDatastore} from '../types/vmware-datastore';
import {NetAppIface} from '../types/netapp-iface';
import {NetAppVserver} from '../types/netapp-vserver';
import {NetAppVolume} from '../types/netapp-volume';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureManagerNodeLinkService {

  constructor(private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureManagerObjectHelper: SysosAppInfrastructureManagerObjectHelperService,) {
  }

  /**
   * Return a link if found
   */
  getLinkByStorageJunctionPath(virtualUuid: string, volume: string, junctionPath: string) { //: IMLink[] {

    // Get Datastore name by Junction Path
    /*return this.linksMap.filter((obj) => {
      return obj.storage === virtualUuid && obj.volume === volume && obj.junction_path === junctionPath;
    });*/
  }

  /**
   * Return a link if found
   */
  getLinkByVMwareDatastore(virtualUuid: string, esxiDatastore: string) { //: IMLink[] {
    /*return this.linksMap.filter((obj) => {
      return obj.virtual === virtualUuid && obj.esxi_datastore === esxiDatastore;
    });*/
  }

  /**
   * @description check link between storage and virtual nodes
   */
  // TODO: some storages could have the same LIF IP!!! and links will be wrong
  checkLinkBetweenManagedNodes(type: string, uuid: string): void {

    /*const connection = this.getConnectionByUuid(uuid);

    if (type === 'vmware') {

      // Get all connection datastores
      this.InfrastructureManagerVMWare.getObjectByType('Datastore', uuid).forEach((datastore: VMWareDatastore) => {

        if (datastore['summary.type'] === 'VMFS') return;

        // Check if any storage volume contains the datastore remotePath as a volume junction path
        this.getConnectionsByType('netapp').forEach((storage) => {

          // Checking for NetApp storage
          if (storage.type === 'netapp') {

            // check if storage have any interface that match the datastore.remoteHost and datastore.type
            const foundInterface = storage.data.Ifaces.netifaces.filter((obj) => {
              return obj.address ===  datastore.info.nas.remoteHost &&
                     obj['data-protocols']['data-protocols'] === (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type);
            })[0];

            // If not found any storage interface matching, return
            if (!foundInterface) return;

            // Search any Data Vservers with allowed protocol that match the datastore.type
            const foundVserver = storage.data.Vservers.filter((obj) => {
              return obj['vserver-type'] === 'data' &&
                     obj['vserver-name'] === foundInterface.vserver &&
                     obj['allowed-protocols'].protocol === (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type);
            })[0];

            if (!foundVserver) return;

            // Search for each Volume containing as a junction path the current datastore remotePath
            const foundVolume = foundVserver.Volumes.filter((obj) => {
              return obj['volume-id-attributes']['junction-path'] === datastore.info.nas.remotePath;
            })[0];

            if (!foundVolume) return;

            // TODO: CHECK VOLUME EXPORTS that match ESXi host

            // Link found!
            this.linksMap.push({
              virtual: uuid,
              esxi_datastore: datastore.obj.name,
              storage: storage.uuid,
              vserver: foundVserver.uuid,
              volume: foundVolume['volume-id-attributes'].uuid,
              junction_path: datastore.info.nas.remotePath
            });

            this.logger.debug('Infrastructure Manager [%s] -> New link found when scanning a vCenter node. -> datastore [%s], junction [%s]',
              connection.uuid, datastore.name, datastore.info.nas.remotePath);

          // end NetApp
          }
        // end storages
        });
      // end datastore
      });
    // end vmware
    }

    if (type === 'netapp') {

      // Get all vmware connections
      this.getConnectionsByType('vmware').forEach((virtual) => {

        // Get all vmware datastores
        virtual.data.Datastores.forEach((datastore) => {

          if (datastore.summary.type === 'VMFS') return;

          // check if connection have any interface that match the vmware datastore.remoteHost
          // and datastore.type
          const foundInterface = connection.data.Ifaces.netifaces.filter((obj) => {
            return obj.address === datastore.info.nas.remoteHost &&
                   obj['data-protocols']['data-protocol'] === (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type);
          })[0];

          // If not found any storage interface matching, return
          if (!foundInterface) return;

          const foundVserver = connection.data.Vservers.filter((obj) => {
            return obj['vserver-type'] === 'data' &&
              obj['vserver-name'] === foundInterface.vserver &&
              obj['allowed-protocols'].protocol === (datastore.info.nas.type === 'NFS41' ? 'nfs' : datastore.info.nas.type);
          })[0];

          if (!foundVserver) return;

          // Search for each Volume containing as a junction path the current datastore remotePath
          const foundVolume = foundVserver.Volumes.filter((obj) => {
            return obj['volume-id-attributes']['junction-path'] === datastore.info.nas.remotePath;
          })[0];

          if (!foundVolume) return;

          // Link found!
          this.linksMap.push({
            virtual: virtual.uuid,
            esxi_datastore: datastore.obj.name,
            storage: uuid,
            vserver: foundVserver.uuid,
            volume: foundVolume['volume-id-attributes'].uuid,
            junction_path: datastore.info.nas.remotePath
          });

          this.logger.debug('Infrastructure Manager [%s] -> New link found when scanning a NetApp node. -> datastore [%s], junction [%s]',
            connection.uuid, datastore.name, datastore.info.nas.remotePath);

        // end datastore
        });
      // end virtual
      });
    // end netapp
    }
    this.saveLinksMap();*/

  }

  /**
   * Check if VMWare Datastore is linked to any managed storage
   */
  checkDatastoreLinkWithManagedStorage(datastoreObj: ImDataObject & { info: { data: VMWareDatastore } }): (ImDataObject & { info: { data: NetAppVolume } })[] {
    const results = [];

    this.InfrastructureManager.getConnectionsByType('netapp').forEach((storageObj: ImConnection) => {

      // Checking for NetApp storage
      if (storageObj.type === 'netapp') {

        // check if storage has any interface that match the datastore.remoteHost and datastore.type
        const foundInterface: ImDataObject & { info: { data: NetAppIface } } = this.InfrastructureManagerObjectHelper.getObjectsByType(storageObj.uuid, 'netiface')
          .filter((ifaceObj: ImDataObject & { info: { data: NetAppIface } }) => {
            return ifaceObj.info.data.address ===  datastoreObj.info.data.info.nas.remoteHost &&
              ifaceObj.info.data['data-protocols']['data-protocol'] === (
                datastoreObj.info.data.info.nas.type === 'NFS41' ||
                datastoreObj.info.data.info.nas.type === 'NFS' ? 'nfs' :
                  datastoreObj.info.data.info.nas.type
              );
          })[0];

        // If not found any storage interface matching, return
        if (!foundInterface) return;

        // Search any Data Vservers with allowed protocol that match the datastore.type
        const foundVserver: ImDataObject & { info: { data: NetAppVserver } } = this.InfrastructureManagerObjectHelper.getObjectsByType(storageObj.uuid, 'vserver')
          .filter((vserverObj: ImDataObject & { info: { data: NetAppVserver } }) => {
            return vserverObj.info.data['vserver-type'] === 'data' &&
              vserverObj.name === foundInterface.info.data.vserver &&
              vserverObj.info.data['allowed-protocols'].protocol.includes(
                (datastoreObj.info.data.info.nas.type === 'NFS41' || datastoreObj.info.data.info.nas.type === 'NFS' ? 'nfs' : datastoreObj.info.data.info.nas.type)
              );
          })[0];

        if (!foundVserver) return;

        // Search for each Volume containing as a junction path the current datastore remotePath
        const foundVolume: ImDataObject & { info: { data: NetAppVolume } } = this.InfrastructureManagerObjectHelper.getChildObjectsByType(storageObj.uuid, 'volume', foundVserver.info.obj.name)
          .filter((volumeObj: ImDataObject & { info: { data: NetAppVolume } }) => {
            return volumeObj.info.data['volume-id-attributes']['junction-path'] === datastoreObj.info.data.info.nas.remotePath;
          })[0];

        if (!foundVolume) return;

        // TODO: CHECK VOLUME EXPORTS that match ESXi host

        // Link found!
        results.push(foundVolume);

      }

    });

    return results;

  }
}
