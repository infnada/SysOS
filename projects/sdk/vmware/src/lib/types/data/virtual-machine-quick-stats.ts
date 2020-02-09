import {DynamicData} from './dynamic-data';

import {ManagedEntityStatus} from '../enums/managed-entity-status';

export interface VirtualMachineQuickStats extends DynamicData {
  balloonedMemory?: number;
  compressedMemory?: number;
  consumedOverheadMemory?: number;
  distributedCpuEntitlement?: number;
  distributedMemoryEntitlement?: number;
  ftLatencyStatus?: ManagedEntityStatus;
  ftLogBandwidth?: number;
  ftSecondaryLatency?: number;
  guestHeartbeatStatus: ManagedEntityStatus;
  guestMemoryUsage?: number;
  hostMemoryUsage?: number;
  overallCpuDemand?: number;
  overallCpuUsage?: number;
  privateMemory?: number;
  sharedMemory?: number;
  ssdSwappedMemory?: number;
  staticCpuEntitlement?: number;
  staticMemoryEntitlement?: number;
  swappedMemory?: number;
  uptimeSeconds?: number;
}