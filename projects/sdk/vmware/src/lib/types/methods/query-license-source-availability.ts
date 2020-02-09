import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryLicenseSourceAvailability {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}