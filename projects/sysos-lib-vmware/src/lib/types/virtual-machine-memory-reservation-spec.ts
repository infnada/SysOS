import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface VirtualMachineMemoryReservationSpec extends DynamicData {
  allocationPolicy?: string;
  virtualMachineReserved?: Long;
}
