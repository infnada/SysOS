import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryProfileStructure {
  _this: ManagedObjectReference;
  profile?: ManagedObjectReference & { $type: 'Profile'; };
}