import {RuntimeFault} from './runtime-fault';


export interface LicenseAssignmentFailed extends RuntimeFault {
  reason?: string;
}