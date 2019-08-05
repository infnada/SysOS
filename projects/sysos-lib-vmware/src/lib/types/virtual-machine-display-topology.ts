import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VirtualMachineDisplayTopology extends DynamicData {
  height: Int;
  width: Int;
  x: Int;
  y: Int;
}
