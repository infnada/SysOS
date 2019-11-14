import {GuestAuthentication} from './guest-authentication';

export interface SSPIAuthentication extends GuestAuthentication {
  sspiToken: string;
}
