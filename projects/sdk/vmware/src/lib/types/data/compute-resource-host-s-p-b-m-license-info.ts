import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ComputeResourceHostSPBMLicenseInfoHostSPBMLicenseState} from '../enums/compute-resource-host-s-p-b-m-license-info-host-s-p-b-m-license-state';

export interface ComputeResourceHostSPBMLicenseInfo extends DynamicData {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  licenseState: ComputeResourceHostSPBMLicenseInfoHostSPBMLicenseState;
}