import {DynamicData} from './dynamic-data';

import {AutoStartDefaults} from './auto-start-defaults';
import {AutoStartPowerInfo} from './auto-start-power-info';

export interface HostAutoStartManagerConfig extends DynamicData {
  defaults?: AutoStartDefaults;
  powerInfo?: AutoStartPowerInfo[];
}