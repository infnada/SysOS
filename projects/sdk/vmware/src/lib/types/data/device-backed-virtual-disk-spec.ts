import {VirtualDiskSpec} from './virtual-disk-spec';


export interface DeviceBackedVirtualDiskSpec extends VirtualDiskSpec {
  device: string;
}