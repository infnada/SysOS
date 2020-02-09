import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CreateListView {
  _this: ManagedObjectReference;
  obj?: ManagedObjectReference[];
}