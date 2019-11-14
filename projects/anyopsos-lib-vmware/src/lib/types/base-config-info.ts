import {DynamicData} from './dynamic-data';

import {BaseConfigInfoBackingInfo} from './base-config-info-backing-info';
import {ID} from './i-d';
import {DateTime} from './date-time';
export interface BaseConfigInfo extends DynamicData {
  backing: BaseConfigInfoBackingInfo;
  changedBlockTrackingEnabled?: boolean;
  createTime: DateTime;
  id: ID;
  iofilter?: string[];
  keepAfterDeleteVm?: boolean;
  name: string;
  nativeSnapshotSupported?: boolean;
  relocationDisabled?: boolean;
}
