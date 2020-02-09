import {InsufficientHostCapacityFault} from './insufficient-host-capacity-fault';


export interface InsufficientHostCpuCapacityFault extends InsufficientHostCapacityFault {
  requested: number;
  unreserved: number;
}