import {ClusterComputeResourceValidationResultBase} from './cluster-compute-resource-validation-result-base';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterComputeResourceHostConfigurationValidation extends ClusterComputeResourceValidationResultBase {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  isDvsSettingValid?: boolean;
  isLockdownModeValid?: boolean;
  isNtpSettingValid?: boolean;
  isVmknicSettingValid?: boolean;
}