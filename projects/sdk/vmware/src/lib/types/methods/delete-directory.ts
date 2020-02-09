import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DeleteDirectory {
  _this: ManagedObjectReference;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  datastorePath: string;
}