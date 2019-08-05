import {InsufficientResourcesFault} from './insufficient-resources-fault';
import {Long} from './long';

export interface InsufficientNetworkResourcePoolCapacity extends InsufficientResourcesFault {
  available: Long;
  device: string[];
  dvsName: string;
  dvsUuid: string;
  requested: Long;
  resourcePoolKey: string;
}
