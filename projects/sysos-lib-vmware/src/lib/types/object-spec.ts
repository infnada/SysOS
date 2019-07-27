import {ManagedObjectReference} from './managed-object-reference';
import {SelectionSpec} from './selection-spec';

export interface ObjectSpec {
  obj: ManagedObjectReference;
  selectSet?: SelectionSpec[];
  skip?: boolean;
}
