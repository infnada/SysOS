import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {StorageDrsPlacementRankVmSpec} from './storage-drs-placement-rank-vm-spec';
import {PlacementAffinityRule} from './placement-affinity-rule';
import {PlacementSpec} from './placement-spec';

export interface PlacementRankSpec extends DynamicData {
  clusters: ManagedObjectReference & { $type: 'ClusterComputeResource[]'; };
  placementRankByVm?: StorageDrsPlacementRankVmSpec[];
  rules?: PlacementAffinityRule[];
  specs: PlacementSpec[];
}