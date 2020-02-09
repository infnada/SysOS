import {DynamicData} from './dynamic-data';

import {HostSystemSwapConfigurationSystemSwapOption} from './host-system-swap-configuration-system-swap-option';

export interface HostSystemSwapConfiguration extends DynamicData {
  option?: HostSystemSwapConfigurationSystemSwapOption[];
}