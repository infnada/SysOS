import {DynamicData} from './dynamic-data';

import {VsanHostRuntimeInfoDiskIssue} from './vsan-host-runtime-info-disk-issue';
import {VsanHostMembershipInfo} from './vsan-host-membership-info';

export interface VsanHostRuntimeInfo extends DynamicData {
  accessGenNo?: number;
  diskIssues?: VsanHostRuntimeInfoDiskIssue[];
  membershipList?: VsanHostMembershipInfo[];
}