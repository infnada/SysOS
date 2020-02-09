import {DynamicData} from './dynamic-data';


export interface VirtualMachineConfigInfoOverheadInfo extends DynamicData {
  initialMemoryReservation?: number;
  initialSwapReservation?: number;
}