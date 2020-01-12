import {InsufficientResourcesFault} from './insufficient-resources-fault';
import {Long} from './long';

export interface InsufficientMemoryResourcesFault extends InsufficientResourcesFault {
  requested: Long;
  unreserved: Long;
}
