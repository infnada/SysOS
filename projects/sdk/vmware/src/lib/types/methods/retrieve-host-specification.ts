import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RetrieveHostSpecification {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  fromHost: boolean;
}