import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface VmfsUnmapBandwidthSpec extends DynamicData {
  dynamicMax: Long;
  dynamicMin: Long;
  fixedValue: Long;
  policy: string;
}
