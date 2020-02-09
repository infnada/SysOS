import {DynamicData} from './dynamic-data';


export interface VirtualMachineGuestQuiesceSpec extends DynamicData {
  timeout?: number;
}