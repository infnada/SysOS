import {InsufficientHostCapacityFault} from './insufficient-host-capacity-fault';
import {Long} from './long';

export interface InsufficientHostMemoryCapacityFault extends InsufficientHostCapacityFault {
  requested: Long;
  unreserved: Long;
}
