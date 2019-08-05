import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface ClusterUsageSummary extends DynamicData {
  cpuDemandMhz: Int;
  cpuEntitledMhz: Int;
  cpuReservationMhz: Int;
  memDemandMB: Int;
  memEntitledMB: Int;
  memReservationMB: Int;
  poweredOffCpuReservationMhz?: Int;
  poweredOffMemReservationMB?: Int;
  poweredOffVmCount: Int;
  statsGenNumber: Long;
  totalCpuCapacityMhz: Int;
  totalMemCapacityMB: Int;
  totalVmCount: Int;
}
