import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface VirtualMachineMemoryReservationInfo extends DynamicData {
  allocationPolicy: string;
  virtualMachineMax: Long;
  virtualMachineMin: Long;
  virtualMachineReserved: Long;
}
