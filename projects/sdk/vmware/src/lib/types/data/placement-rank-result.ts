import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {LocalizedMethodFault} from './localized-method-fault';

export interface PlacementRankResult extends DynamicData {
  candidate: ManagedObjectReference & { $type: 'ClusterComputeResource'; };
  faults?: LocalizedMethodFault[];
  key: string;
  reservedSpaceMB: number;
  totalSpaceMB: number;
  usedSpaceMB: number;
  utilization: any;
}