import {DynamicData} from './dynamic-data';

import {VsanHostClusterStatusStateCompletionEstimate} from './vsan-host-cluster-status-state-completion-estimate';
export interface VsanHostClusterStatusState extends DynamicData {
  completion?: VsanHostClusterStatusStateCompletionEstimate;
  state: string;
}
