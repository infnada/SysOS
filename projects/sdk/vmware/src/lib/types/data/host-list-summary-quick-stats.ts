import {DynamicData} from './dynamic-data';


export interface HostListSummaryQuickStats extends DynamicData {
  availablePMemCapacity?: number;
  distributedCpuFairness?: number;
  distributedMemoryFairness?: number;
  overallCpuUsage?: number;
  overallMemoryUsage?: number;
  uptime?: number;
}