import {DynamicData} from './dynamic-data';

import {HostDateTimeConfig} from './host-date-time-config';
import {HostLockdownMode} from '../enums/host-lockdown-mode';

export interface ClusterComputeResourceHostConfigurationProfile extends DynamicData {
  dateTimeConfig?: HostDateTimeConfig;
  lockdownMode?: HostLockdownMode;
}