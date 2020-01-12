import {InsufficientResourcesFault} from './insufficient-resources-fault';
import {Long} from './long';

export interface InsufficientCpuResourcesFault extends InsufficientResourcesFault {
  requested: Long;
  unreserved: Long;
}
