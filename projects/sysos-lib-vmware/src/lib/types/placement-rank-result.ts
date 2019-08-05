import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {LocalizedMethodFault} from './localized-method-fault';
import {Long} from './long';
import {Double} from './double';
export interface PlacementRankResult extends DynamicData {
  candidate: ManagedObjectReference & { $type: 'ClusterComputeResource' };
  faults?: LocalizedMethodFault[];
  key: string;
  reservedSpaceMB: Long;
  totalSpaceMB: Long;
  usedSpaceMB: Long;
  utilization: Double;
}
