import {DynamicData} from './dynamic-data';

import {HostConfigSpec} from './host-config-spec';
import {ProfileExecuteError} from './profile-execute-error';
import {ProfileDeferredPolicyOptionParameter} from './profile-deferred-policy-option-parameter';
export interface ProfileExecuteResult extends DynamicData {
  configSpec?: HostConfigSpec;
  error?: ProfileExecuteError[];
  inapplicablePath?: string[];
  requireInput?: ProfileDeferredPolicyOptionParameter[];
  status: string;
}
