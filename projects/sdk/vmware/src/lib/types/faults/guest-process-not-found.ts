import {GuestOperationsFault} from './guest-operations-fault';


export interface GuestProcessNotFound extends GuestOperationsFault {
  pid: number;
}