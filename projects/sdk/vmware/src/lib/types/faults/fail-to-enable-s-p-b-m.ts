import {NotEnoughLicenses} from './not-enough-licenses';

import {ManagedObjectReference} from '../data/managed-object-reference';
import {ComputeResourceHostSPBMLicenseInfo} from '../data/compute-resource-host-s-p-b-m-license-info';

export interface FailToEnableSPBM extends NotEnoughLicenses {
  cs: ManagedObjectReference & { $type: 'ComputeResource'; };
  csName: string;
  hostLicenseStates: ComputeResourceHostSPBMLicenseInfo[];
}