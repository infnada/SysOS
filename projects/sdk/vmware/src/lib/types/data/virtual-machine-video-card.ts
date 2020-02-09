import {VirtualDevice} from './virtual-device';


export interface VirtualMachineVideoCard extends VirtualDevice {
  enable3DSupport?: boolean;
  graphicsMemorySizeInKB?: number;
  numDisplays?: number;
  use3dRenderer?: string;
  useAutoDetect?: boolean;
  videoRamSizeInKB?: number;
}