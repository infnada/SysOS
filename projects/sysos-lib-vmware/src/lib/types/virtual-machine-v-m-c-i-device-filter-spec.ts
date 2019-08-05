import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface VirtualMachineVMCIDeviceFilterSpec extends DynamicData {
  action: string;
  direction: string;
  lowerDstPortBoundary?: Long;
  protocol: string;
  rank: Long;
  upperDstPortBoundary?: Long;
}
