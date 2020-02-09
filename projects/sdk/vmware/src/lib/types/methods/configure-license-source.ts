import {ManagedObjectReference} from '../data/managed-object-reference';
import {LicenseSource} from '../data/license-source';


export interface ConfigureLicenseSource {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  licenseSource: LicenseSource;
}