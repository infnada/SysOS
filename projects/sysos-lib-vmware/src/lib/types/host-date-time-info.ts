import {DynamicData} from './dynamic-data';

import {HostNtpConfig} from './host-ntp-config';
import {HostDateTimeSystemTimeZone} from './host-date-time-system-time-zone';
export interface HostDateTimeInfo extends DynamicData {
  ntpConfig?: HostNtpConfig;
  timeZone: HostDateTimeSystemTimeZone;
}
