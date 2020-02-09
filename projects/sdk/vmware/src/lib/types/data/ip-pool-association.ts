import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface IpPoolAssociation extends DynamicData {
  network?: ManagedObjectReference & { $type: 'Network'; };
  networkName: string;
}