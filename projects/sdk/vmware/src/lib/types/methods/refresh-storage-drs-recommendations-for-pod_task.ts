import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RefreshStorageDrsRecommendationsForPod_Task {
  _this: ManagedObjectReference;
  pod: ManagedObjectReference & { $type: 'StoragePod'; };
}