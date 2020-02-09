import {NasConfigFault} from './nas-config-fault';


export interface NasVolumeNotMounted extends NasConfigFault {
  remoteHost: string;
  remotePath: string;
}