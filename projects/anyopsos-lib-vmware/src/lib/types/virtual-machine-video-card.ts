import {VirtualDevice} from './virtual-device';
import {Int} from './int';
import {Long} from './long';

export interface VirtualMachineVideoCard extends VirtualDevice {
  graphicsMemorySizeInKB?: Long;
  numDisplays?: Int;
  useAutoDetect?: boolean;
  videoRamSizeInKB?: Long;
}
