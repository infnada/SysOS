import {DynamicData} from './dynamic-data';

import {ManagedEntityStatus} from './managed-entity-status';
import {Int} from './int';
import {Short} from './short';
import {Long} from './long';
export interface ComputeResourceSummary extends DynamicData {
  effectiveCpu: Int;
  effectiveMemory: Long;
  numCpuCores: Short;
  numCpuThreads: Short;
  numEffectiveHosts: Int;
  numHosts: Int;
  overallStatus: ManagedEntityStatus;
  totalCpu: Int;
  totalMemory: Long;
}
