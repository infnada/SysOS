import {GuestAuthentication} from './guest-authentication';

export interface NamePasswordAuthentication extends GuestAuthentication {
  password: string;
  username: string;
}
