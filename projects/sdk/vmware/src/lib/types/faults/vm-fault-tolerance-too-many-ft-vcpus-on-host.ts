import {InsufficientResourcesFault} from './insufficient-resources-fault';


export interface VmFaultToleranceTooManyFtVcpusOnHost extends InsufficientResourcesFault {
  hostName?: string;
  maxNumFtVcpus: number;
}