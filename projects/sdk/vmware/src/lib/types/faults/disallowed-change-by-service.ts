import {RuntimeFault} from './runtime-fault';


export interface DisallowedChangeByService extends RuntimeFault {
  disallowedChange?: string;
  serviceName: string;
}