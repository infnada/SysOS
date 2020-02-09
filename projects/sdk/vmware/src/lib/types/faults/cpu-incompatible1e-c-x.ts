import {CpuIncompatible} from './cpu-incompatible';


export interface CpuIncompatible1ECX extends CpuIncompatible {
  aes: boolean;
  other: boolean;
  otherOnly: boolean;
  pclmulqdq: boolean;
  sse3: boolean;
  sse41: boolean;
  sse42: boolean;
  ssse3: boolean;
}