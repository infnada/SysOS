import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {LocalizedMethodFault} from './localized-method-fault';
export interface BatchResult extends DynamicData {
  ds?: ManagedObjectReference & { $type: 'Datastore' };
  fault?: LocalizedMethodFault;
  hostKey: string;
  result: string;
}
