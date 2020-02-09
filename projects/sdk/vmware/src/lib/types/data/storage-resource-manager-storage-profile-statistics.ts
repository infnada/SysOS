import {DynamicData} from './dynamic-data';


export interface StorageResourceManagerStorageProfileStatistics extends DynamicData {
  profileId: string;
  totalSpaceMB: number;
  usedSpaceMB: number;
}