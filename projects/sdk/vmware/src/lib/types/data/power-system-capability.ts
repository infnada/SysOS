import {DynamicData} from './dynamic-data';

import {HostPowerPolicy} from './host-power-policy';

export interface PowerSystemCapability extends DynamicData {
  availablePolicy: HostPowerPolicy[];
}