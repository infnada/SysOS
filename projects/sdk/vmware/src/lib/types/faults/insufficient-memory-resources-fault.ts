import {InsufficientResourcesFault} from './insufficient-resources-fault';


export interface InsufficientMemoryResourcesFault extends InsufficientResourcesFault {
  requested: number;
  unreserved: number;
}