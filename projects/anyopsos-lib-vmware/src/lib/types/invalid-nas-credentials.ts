import {NasConfigFault} from './nas-config-fault';

export interface InvalidNasCredentials extends NasConfigFault {
  userName: string;
}
