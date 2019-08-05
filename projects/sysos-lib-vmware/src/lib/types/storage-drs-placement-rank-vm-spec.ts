import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {PlacementSpec} from './placement-spec';
export interface StorageDrsPlacementRankVmSpec extends DynamicData {
  vmClusters: ManagedObjectReference[] & { $type: 'ClusterComputeResource' };
  vmPlacementSpec: PlacementSpec;
}
