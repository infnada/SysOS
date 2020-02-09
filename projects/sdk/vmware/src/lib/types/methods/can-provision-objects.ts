import {ManagedObjectReference} from '../data/managed-object-reference';
import {VsanNewPolicyBatch} from '../data/vsan-new-policy-batch';


export interface CanProvisionObjects {
  _this: ManagedObjectReference;
  npbs: VsanNewPolicyBatch[];
  ignoreSatisfiability?: boolean;
}