import {HostProfileConfigSpec} from './host-profile-config-spec';

import {HostApplyProfile} from './host-apply-profile';
import {ComplianceProfile} from './compliance-profile';
import {HostProfileConfigInfo} from './host-profile-config-info';
import {ManagedObjectReference} from './managed-object-reference';
export interface HostProfileCompleteConfigSpec extends HostProfileConfigSpec {
  applyProfile?: HostApplyProfile;
  customComplyProfile?: ComplianceProfile;
  disabledExpressionList?: string[];
  disabledExpressionListChanged: boolean;
  hostConfig?: HostProfileConfigInfo;
  validating?: boolean;
  validatorHost?: ManagedObjectReference & { $type: 'HostSystem' };
}
