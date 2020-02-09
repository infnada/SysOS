import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RefreshStorageDrsRecommendation {
  _this: ManagedObjectReference;
  pod: ManagedObjectReference & { $type: 'StoragePod'; };
}