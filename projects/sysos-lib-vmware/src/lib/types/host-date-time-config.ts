import {HostNtpConfig} from "./host-ntp-config";

export interface HostDateTimeConfig {
  ntpConfig?: HostNtpConfig;
  timeZone?: string;
}
