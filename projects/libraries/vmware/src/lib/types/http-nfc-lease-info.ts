import {DynamicData} from './dynamic-data';

import {HttpNfcLeaseDeviceUrl} from './http-nfc-lease-device-url';
import {ManagedObjectReference} from './managed-object-reference';
import {HttpNfcLeaseDatastoreLeaseInfo} from './http-nfc-lease-datastore-lease-info';
import {Int} from './int';
import {Long} from './long';
export interface HttpNfcLeaseInfo extends DynamicData {
  deviceUrl?: HttpNfcLeaseDeviceUrl[];
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
  hostMap?: HttpNfcLeaseDatastoreLeaseInfo[];
  lease: ManagedObjectReference & { $type: 'HttpNfcLease' };
  leaseTimeout: Int;
  totalDiskCapacityInKB: Long;
}
