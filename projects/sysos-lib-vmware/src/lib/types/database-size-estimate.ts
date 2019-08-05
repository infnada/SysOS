import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface DatabaseSizeEstimate extends DynamicData {
  size: Long;
}
