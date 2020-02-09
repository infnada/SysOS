import {ClusterComputeResourceValidationResultBase} from './cluster-compute-resource-validation-result-base';


export interface ClusterComputeResourceDVSConfigurationValidation extends ClusterComputeResourceValidationResultBase {
  isDvpgValid: boolean;
  isDvsValid: boolean;
}