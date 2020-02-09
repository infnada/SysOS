import {ManagedObjectReference} from '../data/managed-object-reference';
import {VsanPolicyChangeBatch} from '../data/vsan-policy-change-batch';


export interface ReconfigurationSatisfiable {
  _this: ManagedObjectReference;
  pcbs: VsanPolicyChangeBatch[];
  ignoreSatisfiability?: boolean;
}