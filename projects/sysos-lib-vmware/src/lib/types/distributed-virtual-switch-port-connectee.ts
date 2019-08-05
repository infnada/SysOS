import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface DistributedVirtualSwitchPortConnectee extends DynamicData {
  addressHint?: string;
  connectedEntity?: ManagedObjectReference & { $type: 'ManagedEntity' };
  nicKey?: string;
  type?: string;
}
