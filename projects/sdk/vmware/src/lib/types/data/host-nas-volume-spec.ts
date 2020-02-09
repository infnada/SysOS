import {DynamicData} from './dynamic-data';


export interface HostNasVolumeSpec extends DynamicData {
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