import {DynamicData} from './dynamic-data';

import {VsanHostRuntimeInfoDiskIssue} from './vsan-host-runtime-info-disk-issue';
import {VsanHostMembershipInfo} from './vsan-host-membership-info';
import {Int} from './int';
export interface VsanHostRuntimeInfo extends DynamicData {
  accessGenNo?: Int;
  diskIssues?: VsanHostRuntimeInfoDiskIssue[];
  membershipList?: VsanHostMembershipInfo[];
}
