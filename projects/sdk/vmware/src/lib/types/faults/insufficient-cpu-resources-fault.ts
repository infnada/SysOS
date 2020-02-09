import {InsufficientResourcesFault} from './insufficient-resources-fault';


export interface InsufficientCpuResourcesFault extends InsufficientResourcesFault {
  requested: number;
  unreserved: number;
}