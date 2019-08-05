import {RuntimeFault} from './runtime-fault';

export interface SystemError extends RuntimeFault {
  reason: string;
}
