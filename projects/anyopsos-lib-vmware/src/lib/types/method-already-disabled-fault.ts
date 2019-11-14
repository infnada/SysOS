import {RuntimeFault} from './runtime-fault';

export interface MethodAlreadyDisabledFault extends RuntimeFault {
  sourceId: string;
}
