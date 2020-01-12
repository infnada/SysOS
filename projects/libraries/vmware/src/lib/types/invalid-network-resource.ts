import {NasConfigFault} from './nas-config-fault';

export interface InvalidNetworkResource extends NasConfigFault {
  remoteHost: string;
  remotePath: string;
}
