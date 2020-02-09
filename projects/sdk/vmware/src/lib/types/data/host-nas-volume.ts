import {HostFileSystemVolume} from './host-file-system-volume';


export interface HostNasVolume extends HostFileSystemVolume {
  protocolEndpoint?: boolean;
  remoteHost: string;
  remoteHostNames?: string[];
  remotePath: string;
  securityType?: string;
  userName?: string;
}