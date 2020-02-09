import {ClusterProfileConfigSpec} from './cluster-profile-config-spec';

import {ComplianceProfile} from './compliance-profile';

export interface ClusterProfileCompleteConfigSpec extends ClusterProfileConfigSpec {
  complyProfile?: ComplianceProfile;
}