import {BaseConfigInfo} from './base-config-info';

import {ID} from './i-d';

export interface VStorageObjectConfigInfo extends BaseConfigInfo {
  capacityInMB: number;
  consumerId?: ID[];
  consumptionType?: string[];
}