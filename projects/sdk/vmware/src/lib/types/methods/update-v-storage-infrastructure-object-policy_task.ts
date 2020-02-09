import {ManagedObjectReference} from '../data/managed-object-reference';
import {vslmInfrastructureObjectPolicySpec} from '../data/vslm-infrastructure-object-policy-spec';


export interface UpdateVStorageInfrastructureObjectPolicy_Task {
  _this: ManagedObjectReference;
  spec: vslmInfrastructureObjectPolicySpec;
}