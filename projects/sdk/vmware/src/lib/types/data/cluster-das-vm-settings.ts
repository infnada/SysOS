import {DynamicData} from './dynamic-data';

import {ClusterVmComponentProtectionSettings} from './cluster-vm-component-protection-settings';
import {ClusterVmToolsMonitoringSettings} from './cluster-vm-tools-monitoring-settings';

export interface ClusterDasVmSettings extends DynamicData {
  isolationResponse?: string;
  restartPriority?: string;
  restartPriorityTimeout?: number;
  vmComponentProtectionSettings?: ClusterVmComponentProtectionSettings;
  vmToolsMonitoringSettings?: ClusterVmToolsMonitoringSettings;
}