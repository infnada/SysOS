import {ProfileConfigInfo} from './profile-config-info';

import {ComplianceProfile} from './compliance-profile';

export interface ClusterProfileConfigInfo extends ProfileConfigInfo {
  complyProfile?: ComplianceProfile;
}