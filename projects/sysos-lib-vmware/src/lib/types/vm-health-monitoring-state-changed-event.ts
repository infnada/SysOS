import {ClusterEvent} from './cluster-event';

export interface VmHealthMonitoringStateChangedEvent extends ClusterEvent {
  prevState?: string;
  state: string;
}
