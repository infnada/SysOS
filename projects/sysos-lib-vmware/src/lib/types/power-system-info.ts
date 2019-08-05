import {DynamicData} from './dynamic-data';

import {HostPowerPolicy} from './host-power-policy';
export interface PowerSystemInfo extends DynamicData {
  currentPolicy: HostPowerPolicy;
}
