import {InsufficientHostCapacityFault} from './insufficient-host-capacity-fault';
import {Long} from './long';

export interface InsufficientHostCpuCapacityFault extends InsufficientHostCapacityFault {
  requested: Long;
  unreserved: Long;
}
