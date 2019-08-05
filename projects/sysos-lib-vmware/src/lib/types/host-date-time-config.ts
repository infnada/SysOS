import {DynamicData} from './dynamic-data';

import {HostNtpConfig} from './host-ntp-config';
export interface HostDateTimeConfig extends DynamicData {
  ntpConfig?: HostNtpConfig;
  timeZone?: string;
}
