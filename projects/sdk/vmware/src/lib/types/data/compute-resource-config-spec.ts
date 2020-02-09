import {DynamicData} from './dynamic-data';


export interface ComputeResourceConfigSpec extends DynamicData {
  defaultHardwareVersionKey?: string;
  spbmEnabled?: boolean;
  vmSwapPlacement?: string;
}