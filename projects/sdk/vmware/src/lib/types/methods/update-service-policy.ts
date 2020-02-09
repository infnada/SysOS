import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateServicePolicy {
  _this: ManagedObjectReference;
  id: string;
  policy: string;
}