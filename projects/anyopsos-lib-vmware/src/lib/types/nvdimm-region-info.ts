import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface NvdimmRegionInfo extends DynamicData {
  offset: Long;
  rangeType: string;
  regionId: Int;
  setId: Int;
  size: Long;
  startAddr: Long;
}
