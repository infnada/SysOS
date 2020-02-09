import {DynamicData} from './dynamic-data';

import {ManagedEntityStatus} from '../enums/managed-entity-status';

export interface ComputeResourceSummary extends DynamicData {
  effectiveCpu: number;
  effectiveMemory: number;
  numCpuCores: number;
  numCpuThreads: number;
  numEffectiveHosts: number;
  numHosts: number;
  overallStatus: ManagedEntityStatus;
  totalCpu: number;
  totalMemory: number;
}