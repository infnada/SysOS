import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface HostPlacedVirtualNicIdentifier extends DynamicData {
  reservation?: number;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vnicKey: string;
}