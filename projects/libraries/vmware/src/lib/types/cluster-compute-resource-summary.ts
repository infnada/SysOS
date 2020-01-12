import {ComputeResourceSummary} from './compute-resource-summary';

import {ClusterDasAdmissionControlInfo} from './cluster-das-admission-control-info';
import {ClusterDasData} from './cluster-das-data';
import {ClusterUsageSummary} from './cluster-usage-summary';
import {Int} from './int';
export interface ClusterComputeResourceSummary extends ComputeResourceSummary {
  admissionControlInfo?: ClusterDasAdmissionControlInfo;
  currentBalance?: Int;
  currentEVCModeKey?: string;
  currentFailoverLevel: Int;
  dasData?: ClusterDasData;
  numVmotions: Int;
  targetBalance?: Int;
  usageSummary?: ClusterUsageSummary;
}
