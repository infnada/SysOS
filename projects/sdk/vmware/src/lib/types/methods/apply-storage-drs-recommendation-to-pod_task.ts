import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ApplyStorageDrsRecommendationToPod_Task {
  _this: ManagedObjectReference;
  pod: ManagedObjectReference & { $type: 'StoragePod'; };
  key: string;
}