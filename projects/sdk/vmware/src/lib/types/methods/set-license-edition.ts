import {ManagedObjectReference} from '../data/managed-object-reference';


export interface SetLicenseEdition {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  featureKey?: string;
}