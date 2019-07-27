import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {EventFilterSpec} from '../types/event-filter-spec';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {HostNasVolumeSpec} from '../types/host-nas-volume-spec';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostDatastoreSystemService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  ConfigureDatastorePrincipal() {

  }

  CreateLocalDatastore() {

  }

  CreateNasDatastore(
    connectionData: ConnectionData,
    managedDatstoreSystem: ManagedObjectReference & { $type: 'HostDatastoreSystem' },
    spec: HostNasVolumeSpec
  ) {
    const xml = `<CreateNasDatastore xmlns='urn:vim25'>
      <_this type='HostDatastoreSystem'>${managedDatstoreSystem._value}</_this>
      <spec>${this.SysosLibVmwareHelper.setDynamicProperties(spec)}</spec>
    </CreateNasDatastore>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.CreateNasDatastoreResponse[0]._);
    })).toPromise();
  }

  CreateVmfsDatastore() {

  }

  CreateVvolDatastore() {

  }

  ExpandVmfsDatastore() {

  }

  ExtendVmfsDatastore() {

  }

  QueryAvailableDisksForVmfs() {

  }

  QueryUnresolvedVmfsVolumes() {

  }

  QueryVmfsDatastoreCreateOptions() {

  }

  QueryVmfsDatastoreExpandOptions() {

  }

  QueryVmfsDatastoreExtendOptions() {

  }

  RemoveDatastore(
    connectionData: ConnectionData,
    managedDatastoreSystem: ManagedObjectReference & { $type: 'HostDatastoreSystem' },
    managedDatastore: ManagedObjectReference & { $type: 'Datastore' }
  ) {
    const xml = `<RemoveDatastore xmlns='urn:vim25'>
      <_this type='HostDatastoreSystem'>${managedDatastoreSystem._value}</_this>
      <datastore type='Datastore'>${managedDatastore._value}</datastore>
    </RemoveDatastore>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.RemoveDatastoreResponse[0]);
    })).toPromise();
  }

  RemoveDatastoreEx_Task() {

  }

  ResignatureUnresolvedVmfsVolume_Task() {

  }

  UpdateLocalSwapDatastore() {

  }
}
