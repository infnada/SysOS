import {DynamicData} from './dynamic-data';

import {PropertyChange} from './property-change';
import {ObjectUpdateKind} from './object-update-kind';
import {MissingProperty} from './missing-property';
import {ManagedObjectReference} from './managed-object-reference';
export interface ObjectUpdate extends DynamicData {
  changeSet?: PropertyChange[];
  kind: ObjectUpdateKind;
  missingSet?: MissingProperty[];
  obj: ManagedObjectReference;
}
