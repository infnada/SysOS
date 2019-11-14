import {DynamicData} from './dynamic-data';

import {CustomizationIPSettings} from './customization-i-p-settings';
import {ManagedObjectReference} from './managed-object-reference';
export interface ClusterNetworkConfigSpec extends DynamicData {
  ipSettings: CustomizationIPSettings;
  networkPortGroup: ManagedObjectReference & { $type: 'Network' };
}
