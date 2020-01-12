import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface ClusterVmToolsMonitoringSettings extends DynamicData {
  clusterSettings?: boolean;
  enabled?: boolean;
  failureInterval?: Int;
  maxFailures?: Int;
  maxFailureWindow?: Int;
  minUpTime?: Int;
  vmMonitoring?: string;
}
