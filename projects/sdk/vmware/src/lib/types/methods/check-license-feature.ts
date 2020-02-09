import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CheckLicenseFeature {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  featureKey: string;
}