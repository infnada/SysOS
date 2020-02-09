import {DynamicData} from './dynamic-data';


export interface ClusterVmToolsMonitoringSettings extends DynamicData {
  clusterSettings?: boolean;
  enabled?: boolean;
  failureInterval?: number;
  maxFailures?: number;
  maxFailureWindow?: number;
  minUpTime?: number;
  vmMonitoring?: string;
}