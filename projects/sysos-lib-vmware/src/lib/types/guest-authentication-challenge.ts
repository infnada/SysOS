import {GuestOperationsFault} from './guest-operations-fault';

import {GuestAuthentication} from './guest-authentication';
import {Long} from './long';
export interface GuestAuthenticationChallenge extends GuestOperationsFault {
  serverChallenge: GuestAuthentication;
  sessionID: Long;
}
