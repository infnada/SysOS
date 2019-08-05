import {GuestOperationsFault} from './guest-operations-fault';
import {Long} from './long';

export interface GuestProcessNotFound extends GuestOperationsFault {
  pid: Long;
}
