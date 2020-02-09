import {InsufficientResourcesFault} from './insufficient-resources-fault';


export interface VmSmpFaultToleranceTooManyVMsOnHost extends InsufficientResourcesFault {
  hostName?: string;
  maxNumSmpFtVms: number;
}