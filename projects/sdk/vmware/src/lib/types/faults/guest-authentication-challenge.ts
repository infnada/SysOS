import {GuestOperationsFault} from './guest-operations-fault';

import {GuestAuthentication} from '../data/guest-authentication';

export interface GuestAuthenticationChallenge extends GuestOperationsFault {
  serverChallenge: GuestAuthentication;
  sessionID: number;
}