import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VirtualMachineAffinityInfo extends DynamicData {
  affinitySet?: Int[];
}
