import {BaseConfigInfo} from './base-config-info';

import {ID} from './i-d';
import {Long} from './long';
export interface VStorageObjectConfigInfo extends BaseConfigInfo {
  capacityInMB: Long;
  consumerId?: ID[];
  consumptionType?: string[];
}
