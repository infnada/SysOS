import {ClusterSlotPolicy} from './cluster-slot-policy';


export interface ClusterFixedSizeSlotPolicy extends ClusterSlotPolicy {
  cpu: number;
  memory: number;
}