import {DynamicData} from './dynamic-data';

import {DiskChangeExtent} from './disk-change-extent';
import {Long} from './long';
export interface DiskChangeInfo extends DynamicData {
  changedArea?: DiskChangeExtent[];
  length: Long;
  startOffset: Long;
}
