import {CpuIncompatible} from './cpu-incompatible';

export interface CpuIncompatible81EDX extends CpuIncompatible {
  ffxsr: boolean;
  lm: boolean;
  nx: boolean;
  other: boolean;
  otherOnly: boolean;
  rdtscp: boolean;
}
