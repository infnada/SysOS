import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RetrieveHostCustomizations {
  _this: ManagedObjectReference;
  hosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
}