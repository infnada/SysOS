import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
export interface MissingObject extends DynamicData {
  fault: LocalizedMethodFault;
  obj: ManagedObjectReference;
}
