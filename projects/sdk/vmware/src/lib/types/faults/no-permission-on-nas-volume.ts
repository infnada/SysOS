import {NasConfigFault} from './nas-config-fault';


export interface NoPermissionOnNasVolume extends NasConfigFault {
  userName?: string;
}