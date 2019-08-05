import {RuntimeFault} from './runtime-fault';

export interface RestrictedByAdministrator extends RuntimeFault {
  details: string;
}
