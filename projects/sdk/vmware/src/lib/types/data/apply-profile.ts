import {DynamicData} from './dynamic-data';

import {ProfilePolicy} from './profile-policy';
import {ProfileApplyProfileProperty} from './profile-apply-profile-property';

export interface ApplyProfile extends DynamicData {
  copyEnableStatus?: boolean;
  enabled: boolean;
  favorite?: boolean;
  hidden?: boolean;
  policy?: ProfilePolicy[];
  profileTypeName?: string;
  profileVersion?: string;
  property?: ProfileApplyProfileProperty[];
  toBeDeleted?: boolean;
  toBeMerged?: boolean;
  toReplaceWith?: boolean;
}