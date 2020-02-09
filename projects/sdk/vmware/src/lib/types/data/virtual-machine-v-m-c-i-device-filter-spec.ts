import {DynamicData} from './dynamic-data';


export interface VirtualMachineVMCIDeviceFilterSpec extends DynamicData {
  action: string;
  direction: string;
  lowerDstPortBoundary?: number;
  protocol: string;
  rank: number;
  upperDstPortBoundary?: number;
}