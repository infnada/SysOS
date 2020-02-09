import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ResetListViewFromView {
  _this: ManagedObjectReference;
  view: ManagedObjectReference & { $type: 'View'; };
}