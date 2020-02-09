import {ManagedObjectReference} from '../data/managed-object-reference';
import {ProfileDeferredPolicyOptionParameter} from '../data/profile-deferred-policy-option-parameter';


export interface ExecuteHostProfile {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  deferredParam?: ProfileDeferredPolicyOptionParameter[];
}