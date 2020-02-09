import {InsufficientResourcesFault} from './insufficient-resources-fault';


export interface VmFaultToleranceTooManyVMsOnHost extends InsufficientResourcesFault {
  hostName?: string;
  maxNumFtVms: number;
}