import {DynamicData} from './dynamic-data';

import {DiskChangeExtent} from './disk-change-extent';

export interface DiskChangeInfo extends DynamicData {
  changedArea?: DiskChangeExtent[];
  length: number;
  startOffset: number;
}