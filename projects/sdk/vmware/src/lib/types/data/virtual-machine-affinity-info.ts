import {DynamicData} from './dynamic-data';


export interface VirtualMachineAffinityInfo extends DynamicData {
  affinitySet?: number[];
}