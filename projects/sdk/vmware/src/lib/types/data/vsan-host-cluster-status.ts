import {DynamicData} from './dynamic-data';

import {VsanHostClusterStatusState} from './vsan-host-cluster-status-state';

export interface VsanHostClusterStatus extends DynamicData {
  health: string;
  memberUuid?: string[];
  nodeState: VsanHostClusterStatusState;
  nodeUuid?: string;
  uuid?: string;
}