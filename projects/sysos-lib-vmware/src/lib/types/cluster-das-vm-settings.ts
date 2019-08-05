import {DynamicData} from './dynamic-data';

import {ClusterVmComponentProtectionSettings} from './cluster-vm-component-protection-settings';
import {ClusterVmToolsMonitoringSettings} from './cluster-vm-tools-monitoring-settings';
import {Int} from './int';
export interface ClusterDasVmSettings extends DynamicData {
  isolationResponse?: string;
  restartPriority?: string;
  restartPriorityTimeout?: Int;
  vmComponentProtectionSettings?: ClusterVmComponentProtectionSettings;
  vmToolsMonitoringSettings?: ClusterVmToolsMonitoringSettings;
}
