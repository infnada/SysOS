import {DynamicData} from './dynamic-data';

import {VirtualMachineConfigSummary} from './virtual-machine-config-summary';
import {CustomFieldValue} from './custom-field-value';
import {VirtualMachineGuestSummary} from './virtual-machine-guest-summary';
import {ManagedEntityStatus} from '../enums/managed-entity-status';
import {VirtualMachineQuickStats} from './virtual-machine-quick-stats';
import {VirtualMachineRuntimeInfo} from './virtual-machine-runtime-info';
import {VirtualMachineStorageSummary} from './virtual-machine-storage-summary';
import {ManagedObjectReference} from './managed-object-reference';

export interface VirtualMachineSummary extends DynamicData {
  config: VirtualMachineConfigSummary;
  customValue?: CustomFieldValue[];
  guest?: VirtualMachineGuestSummary;
  overallStatus: ManagedEntityStatus;
  quickStats: VirtualMachineQuickStats;
  runtime: VirtualMachineRuntimeInfo;
  storage?: VirtualMachineStorageSummary;
  vm?: ManagedObjectReference & { $type: 'VirtualMachine'; };
}