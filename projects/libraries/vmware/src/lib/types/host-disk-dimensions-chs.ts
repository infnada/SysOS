import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface HostDiskDimensionsChs extends DynamicData {
  cylinder: Long;
  head: Int;
  sector: Int;
}
