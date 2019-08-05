import {DynamicData} from './dynamic-data';

import {ID} from './i-d';
import {DateTime} from './date-time';
export interface VStorageObjectSnapshotInfoVStorageObjectSnapshot extends DynamicData {
  backingObjectId?: DateTime;
  description?: ID;
}
