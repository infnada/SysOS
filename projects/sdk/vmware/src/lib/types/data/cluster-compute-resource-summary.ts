import {ComputeResourceSummary} from './compute-resource-summary';

import {ClusterDasAdmissionControlInfo} from './cluster-das-admission-control-info';
import {ClusterDasData} from './cluster-das-data';
import {ClusterUsageSummary} from './cluster-usage-summary';

export interface ClusterComputeResourceSummary extends ComputeResourceSummary {
  admissionControlInfo?: ClusterDasAdmissionControlInfo;
  currentBalance?: number;
  currentEVCModeKey?: string;
  currentFailoverLevel: number;
  dasData?: ClusterDasData;
  numVmotions: number;
  targetBalance?: number;
  usageSummary?: ClusterUsageSummary;
}