import {GuestOperationsFault} from './guest-operations-fault';


export interface GuestRegistryFault extends GuestOperationsFault {
  windowsSystemErrorCode: number;
}