import {DynamicData} from './dynamic-data';


export interface VirtualMachineMemoryReservationInfo extends DynamicData {
  allocationPolicy: string;
  virtualMachineMax: number;
  virtualMachineMin: number;
  virtualMachineReserved: number;
}