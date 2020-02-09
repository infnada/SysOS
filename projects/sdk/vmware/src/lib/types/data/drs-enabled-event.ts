import {ClusterEvent} from './cluster-event';


export interface DrsEnabledEvent extends ClusterEvent {
  behavior: string;
}