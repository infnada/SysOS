import {ClusterSlotPolicy} from './cluster-slot-policy';
import {Int} from './int';

export interface ClusterFixedSizeSlotPolicy extends ClusterSlotPolicy {
  cpu: Int;
  memory: Int;
}
