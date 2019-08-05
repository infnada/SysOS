import {CpuIncompatible} from './cpu-incompatible';

export interface FaultToleranceCpuIncompatible extends CpuIncompatible {
  family: boolean;
  model: boolean;
  stepping: boolean;
}
