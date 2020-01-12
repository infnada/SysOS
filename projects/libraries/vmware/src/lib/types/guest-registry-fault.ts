import {GuestOperationsFault} from './guest-operations-fault';
import {Long} from './long';

export interface GuestRegistryFault extends GuestOperationsFault {
  windowsSystemErrorCode: Long;
}
