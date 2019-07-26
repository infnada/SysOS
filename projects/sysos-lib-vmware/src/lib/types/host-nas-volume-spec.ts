export interface HostNasVolumeSpec {
  accessMode: string;
  localPath: string;
  password?: string;
  remoteHost: string;
  remoteHostNames?: string[];
  remotePath: string;
  securityType?: string;
  type?: string;
  userName?: string;
}
