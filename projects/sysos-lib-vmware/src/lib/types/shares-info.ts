import {DynamicData} from './dynamic-data';

import {SharesLevel} from './shares-level';
import {Int} from './int';
export interface SharesInfo extends DynamicData {
  level: SharesLevel;
  shares: Int;
}
