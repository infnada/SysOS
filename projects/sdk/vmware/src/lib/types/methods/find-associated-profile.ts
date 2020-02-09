import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindAssociatedProfile {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
}