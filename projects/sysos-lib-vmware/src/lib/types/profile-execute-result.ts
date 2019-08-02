import {ProfileDeferredPolicyOptionParameter} from "./profile-deferred-policy-option-parameter";
import {ProfileExecuteError} from "./profile-execute-error";
import {HostConfigSpec} from "./host-config-spec";

export interface ProfileExecuteResult {
  configSpec?: HostConfigSpec;
  error?: ProfileExecuteError[];
  inapplicablePath?: string[];
  requireInput?: ProfileDeferredPolicyOptionParameter[];
  status: string;
}
