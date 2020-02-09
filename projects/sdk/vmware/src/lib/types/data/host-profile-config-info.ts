import {ProfileConfigInfo} from './profile-config-info';

import {HostApplyProfile} from './host-apply-profile';
import {ComplianceProfile} from './compliance-profile';
import {ComplianceLocator} from './compliance-locator';
import {ProfileDescription} from './profile-description';

export interface HostProfileConfigInfo extends ProfileConfigInfo {
  applyProfile?: HostApplyProfile;
  customComplyProfile?: ComplianceProfile;
  defaultComplyLocator?: ComplianceLocator[];
  defaultComplyProfile?: ComplianceProfile;
  description?: ProfileDescription;
  disabledExpressionList?: string[];
}