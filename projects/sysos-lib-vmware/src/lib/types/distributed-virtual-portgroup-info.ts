import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface DistributedVirtualPortgroupInfo extends DynamicData {
  networkReservationSupported?: boolean;
  portgroup: ManagedObjectReference & { $type: 'DistributedVirtualPortgroup' };
  portgroupKey: string;
  portgroupName: string;
  portgroupType: string;
  switchName: string;
  switchUuid: string;
  uplinkPortgroup: boolean;
}
