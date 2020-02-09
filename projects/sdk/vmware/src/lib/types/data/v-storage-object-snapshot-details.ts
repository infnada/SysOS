import {DynamicData} from './dynamic-data';


export interface VStorageObjectSnapshotDetails extends DynamicData {
  changedBlockTrackingId?: string;
  path?: string;
}