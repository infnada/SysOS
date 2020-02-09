import {ManagedObjectReference} from '../data/managed-object-reference';


export interface FindByDatastorePath {
  _this: ManagedObjectReference;
  datacenter: ManagedObjectReference & { $type: 'Datacenter'; };
  path: string;
}