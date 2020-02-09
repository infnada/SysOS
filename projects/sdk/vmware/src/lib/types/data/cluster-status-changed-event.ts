import {ClusterEvent} from './cluster-event';


export interface ClusterStatusChangedEvent extends ClusterEvent {
  newStatus: string;
  oldStatus: string;
}