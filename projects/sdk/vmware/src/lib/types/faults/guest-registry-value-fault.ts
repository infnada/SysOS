import {GuestRegistryFault} from './guest-registry-fault';


export interface GuestRegistryValueFault extends GuestRegistryFault {
  keyName: string;
  valueName: string;
}