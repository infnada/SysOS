import {ManagedObjectReference} from '../data/managed-object-reference';


export interface AddFilterEntities {
  _this: ManagedObjectReference;
  filterId: string;
  entities?: ManagedObjectReference & { $type: 'ManagedEntity[]'; };
}