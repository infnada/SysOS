import {DynamicData} from './dynamic-data';

import {ClusterDasVmSettings} from './cluster-das-vm-settings';
import {ManagedObjectReference} from './managed-object-reference';
import {DasVmPriority} from '../enums/das-vm-priority';

export interface ClusterDasVmConfigInfo extends DynamicData {
  dasSettings?: ClusterDasVmSettings;
  key: ManagedObjectReference & { $type: 'VirtualMachine'; };
  powerOffOnIsolation?: boolean;
  restartPriority?: DasVmPriority;
}