import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryLicenseUsage {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}