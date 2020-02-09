import {DynamicData} from './dynamic-data';


export interface VirtualMachineMessage extends DynamicData {
  argument?: any[];
  id: string;
  text?: string;
}