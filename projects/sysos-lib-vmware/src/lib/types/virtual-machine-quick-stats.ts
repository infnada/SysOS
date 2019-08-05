import {DynamicData} from './dynamic-data';

import {ManagedEntityStatus} from './managed-entity-status';
import {Int} from './int';
import {Long} from './long';
export interface VirtualMachineQuickStats extends DynamicData {
  balloonedMemory?: Int;
  compressedMemory?: Long;
  consumedOverheadMemory?: Int;
  distributedCpuEntitlement?: Int;
  distributedMemoryEntitlement?: Int;
  ftLatencyStatus?: ManagedEntityStatus;
  ftLogBandwidth?: Int;
  ftSecondaryLatency?: Int;
  guestHeartbeatStatus: ManagedEntityStatus;
  guestMemoryUsage?: Int;
  hostMemoryUsage?: Int;
  overallCpuDemand?: Int;
  overallCpuUsage?: Int;
  privateMemory?: Int;
  sharedMemory?: Int;
  ssdSwappedMemory?: Long;
  staticCpuEntitlement?: Int;
  staticMemoryEntitlement?: Int;
  swappedMemory?: Int;
  uptimeSeconds?: Int;
}
