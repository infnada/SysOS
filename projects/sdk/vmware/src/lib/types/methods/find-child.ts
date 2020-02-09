import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindChild {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  name: string;
}