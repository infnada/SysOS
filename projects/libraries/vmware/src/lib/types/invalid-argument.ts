import {RuntimeFault} from './runtime-fault';

export interface InvalidArgument extends RuntimeFault {
  invalidProperty?: string;
}
