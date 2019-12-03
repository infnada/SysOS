import {Injectable} from '@angular/core';

import {AnyOpsOSAppInfrastructureManagerService} from './anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerObjectHelperService} from './anyopsos-app-infrastructure-manager-object-helper.service';

import {ConnectionNetapp} from '../types/connections/connection-netapp';
import {ImDataObject} from '../types/im-data-object';
import {VMWareDatastore} from '../types/vmware-datastore';
import {NetAppIface} from '../types/netapp-iface';
import {NetAppVserver} from '../types/netapp-vserver';
import {NetAppVolume} from '../types/netapp-volume';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerNodeLinkService {

  constructor(private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerObjectHelper: AnyOpsOSAppInfrastructureManagerObjectHelperService) {
  }

  /**
   * Check if Volume is linked to any managed VMWare Datastore
   * Not perfect code but easier to maintain
   */
  checkStorageVolumeLinkWithManagedVMWareDatastore(volumeObj: ImDataObject & { info: { data: NetAppVolume } }): (ImDataObject & { info: { data: VMWareDatastore } })[] {
    const results = [];

    this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'Datastore').forEach((datastoreObj: ImDataObject & { info: { data: VMWareDatastore } }) => {

      const linkedWith = this.checkVMWareDatastoreLinkWithManagedStorageVolume(datastoreObj);

      if (linkedWith && linkedWith.info.uuid === volumeObj.info.uuid) results.push(datastoreObj);
    });

    return results;
  }

  /**
   * Check if VMWare Datastore is linked to any managed storage
   */
  checkVMWareDatastoreLinkWithManagedStorageVolume(datastoreObj: ImDataObject & { info: { data: VMWareDatastore } }): (ImDataObject & { info: { data: NetAppVolume } }) {
    const results = [];

    this.InfrastructureManager.getConnectionsByType('netapp').forEach((storageObj: ConnectionNetapp) => {

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
        const foundVolume: ImDataObject & { info: { data: NetAppVolume } } = this.InfrastructureManagerObjectHelper.getChildObjectsByType(storageObj.uuid, 'volume', foundVserver.info.obj)
          .filter((volumeObj: ImDataObject & { info: { data: NetAppVolume } }) => {
            return volumeObj.info.data['volume-id-attributes']['junction-path'] === datastoreObj.info.data.info.nas.remotePath;
          })[0];

        if (!foundVolume) return;

        // TODO: CHECK VOLUME EXPORTS that match ESXi host

        // Link found!
        results.push(foundVolume);
      }

    });

    // If multiple links are found means this function is not working properly
    if (results.length > 1) throw new Error('Multiple links found for this Datastore');

    return results[0];
  }
}
