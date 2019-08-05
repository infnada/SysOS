import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface NvdimmInterleaveSetInfo extends DynamicData {
  availableSize?: Int[];
  rangeType: string;
  setId: Int;
  size: Long;
  state: string;
}
