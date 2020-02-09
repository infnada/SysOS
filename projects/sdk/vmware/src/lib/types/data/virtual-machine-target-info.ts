import {DynamicData} from './dynamic-data';


export interface VirtualMachineTargetInfo extends DynamicData {
  configurationTag?: string[];
  name: string;
}