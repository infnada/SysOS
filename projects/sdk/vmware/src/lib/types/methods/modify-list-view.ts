import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ModifyListView {
  _this: ManagedObjectReference;
  add?: ManagedObjectReference[];
  remove?: ManagedObjectReference[];
}