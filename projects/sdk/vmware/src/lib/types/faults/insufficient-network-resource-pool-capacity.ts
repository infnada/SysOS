import {InsufficientResourcesFault} from './insufficient-resources-fault';


export interface InsufficientNetworkResourcePoolCapacity extends InsufficientResourcesFault {
  available: number;
  device: string[];
  dvsName: string;
  dvsUuid: string;
  requested: number;
  resourcePoolKey: string;
}