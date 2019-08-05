import {NasConfigFault} from './nas-config-fault';

export interface NasSessionCredentialConflict extends NasConfigFault {
  remoteHost: string;
  remotePath: string;
  userName: string;
}
