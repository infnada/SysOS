import {DynamicData} from './dynamic-data';

import {SelectionSpec} from './selection-spec';
import {ManagedObjectReference} from './managed-object-reference';
export interface ObjectSpec extends DynamicData {
  obj: ManagedObjectReference;
  selectSet?: SelectionSpec[];
  skip?: boolean;
}
