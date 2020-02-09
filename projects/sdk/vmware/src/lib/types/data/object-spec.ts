import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {SelectionSpec} from './selection-spec';

export interface ObjectSpec extends DynamicData {
  obj: ManagedObjectReference;
  selectSet?: SelectionSpec[];
  skip?: boolean;
}