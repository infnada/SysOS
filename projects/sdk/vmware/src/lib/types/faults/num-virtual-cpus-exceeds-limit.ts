import {InsufficientResourcesFault} from './insufficient-resources-fault';


export interface NumVirtualCpusExceedsLimit extends InsufficientResourcesFault {
  maxSupportedVcpus: number;
}