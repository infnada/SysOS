import {ClusterEvent} from './cluster-event';

export interface HostMonitoringStateChangedEvent extends ClusterEvent {
  prevState?: string;
  state: string;
}
