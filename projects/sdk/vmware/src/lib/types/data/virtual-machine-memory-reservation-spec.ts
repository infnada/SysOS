import {DynamicData} from './dynamic-data';


export interface VirtualMachineMemoryReservationSpec extends DynamicData {
  allocationPolicy?: string;
  virtualMachineReserved?: number;
}