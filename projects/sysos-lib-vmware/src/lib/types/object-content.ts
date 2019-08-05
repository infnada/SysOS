import {DynamicData} from './dynamic-data';

import {MissingProperty} from './missing-property';
import {ManagedObjectReference} from './managed-object-reference';
import {DynamicProperty} from './dynamic-property';
export interface ObjectContent extends DynamicData {
  missingSet?: MissingProperty[];
  obj: ManagedObjectReference;
  propSet?: DynamicProperty[];
}
