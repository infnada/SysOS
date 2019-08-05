import {NasConfigFault} from './nas-config-fault';

export interface NasConnectionLimitReached extends NasConfigFault {
  remoteHost: string;
  remotePath: string;
}
