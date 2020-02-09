import {DynamicData} from './dynamic-data';

import {SharesLevel} from '../enums/shares-level';

export interface SharesInfo extends DynamicData {
  level: SharesLevel;
  shares: number;
}