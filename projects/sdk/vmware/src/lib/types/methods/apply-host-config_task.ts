import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostConfigSpec} from '../data/host-config-spec';
import {ProfileDeferredPolicyOptionParameter} from '../data/profile-deferred-policy-option-parameter';


export interface ApplyHostConfig_Task {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  configSpec: HostConfigSpec;
  userInput?: ProfileDeferredPolicyOptionParameter[];
}