import {DynamicData} from './dynamic-data';

import {ID} from './i-d';

export interface VStorageObjectSnapshotInfoVStorageObjectSnapshot extends DynamicData {
  backingObjectId?: string;
  createTime: string;
  description: string;
  id?: ID;
}