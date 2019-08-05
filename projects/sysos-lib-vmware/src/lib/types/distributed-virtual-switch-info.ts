import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface DistributedVirtualSwitchInfo extends DynamicData {
  distributedVirtualSwitch: ManagedObjectReference & { $type: 'DistributedVirtualSwitch' };
  networkReservationSupported?: boolean;
  switchName: string;
  switchUuid: string;
}
