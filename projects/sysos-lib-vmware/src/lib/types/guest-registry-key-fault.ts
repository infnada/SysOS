import {GuestRegistryFault} from './guest-registry-fault';

export interface GuestRegistryKeyFault extends GuestRegistryFault {
  keyName: string;
}
