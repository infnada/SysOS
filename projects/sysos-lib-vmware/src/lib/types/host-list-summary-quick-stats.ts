import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostListSummaryQuickStats extends DynamicData {
  availablePMemCapacity?: Int;
  distributedCpuFairness?: Int;
  distributedMemoryFairness?: Int;
  overallCpuUsage?: Int;
  overallMemoryUsage?: Int;
  uptime?: Int;
}
