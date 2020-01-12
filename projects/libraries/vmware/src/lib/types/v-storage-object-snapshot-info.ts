import {DynamicData} from './dynamic-data';

import {VStorageObjectSnapshotInfoVStorageObjectSnapshot} from './v-storage-object-snapshot-info-v-storage-object-snapshot';
export interface VStorageObjectSnapshotInfo extends DynamicData {
  snapshots?: VStorageObjectSnapshotInfoVStorageObjectSnapshot[];
}
