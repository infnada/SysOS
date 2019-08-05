import {GuestAuthentication} from './guest-authentication';

export interface SAMLTokenAuthentication extends GuestAuthentication {
  token: string;
  username?: string;
}
