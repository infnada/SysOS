import {DynamicData} from './dynamic-data';


export interface ClusterUsageSummary extends DynamicData {
  cpuDemandMhz: number;
  cpuEntitledMhz: number;
  cpuReservationMhz: number;
  memDemandMB: number;
  memEntitledMB: number;
  memReservationMB: number;
  poweredOffCpuReservationMhz?: number;
  poweredOffMemReservationMB?: number;
  poweredOffVmCount: number;
  statsGenNumber: number;
  totalCpuCapacityMhz: number;
  totalMemCapacityMB: number;
  totalVmCount: number;
}