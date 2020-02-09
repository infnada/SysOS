import {DynamicData} from './dynamic-data';


export interface ComputeResourceConfigInfo extends DynamicData {
  defaultHardwareVersionKey?: string;
  spbmEnabled?: boolean;
  vmSwapPlacement: string;
}