import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CreateListViewFromView {
  _this: ManagedObjectReference;
  view: ManagedObjectReference & { $type: 'View'; };
}