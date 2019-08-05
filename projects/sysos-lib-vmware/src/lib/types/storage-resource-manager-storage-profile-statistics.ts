import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface StorageResourceManagerStorageProfileStatistics extends DynamicData {
  profileId: string;
  totalSpaceMB: Long;
  usedSpaceMB: Long;
}
