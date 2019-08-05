import {CpuIncompatible} from './cpu-incompatible';

export interface CpuIncompatible1ECX extends CpuIncompatible {
  aes: boolean;
  other: boolean;
  otherOnly: boolean;
  pclmulqdq: boolean;
}
