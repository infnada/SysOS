import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface VirtualMachineConfigInfoOverheadInfo extends DynamicData {
  initialMemoryReservation?: Long;
  initialSwapReservation?: Long;
}
