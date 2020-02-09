import {InsufficientHostCapacityFault} from './insufficient-host-capacity-fault';


export interface InsufficientHostMemoryCapacityFault extends InsufficientHostCapacityFault {
  requested: number;
  unreserved: number;
}