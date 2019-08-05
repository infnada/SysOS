import {RuntimeFault} from './runtime-fault';

export interface MethodDisabled extends RuntimeFault {
  source?: string;
}
