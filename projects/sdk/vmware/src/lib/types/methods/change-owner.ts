import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ChangeOwner {
  _this: ManagedObjectReference;
  name: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  owner: string;
}