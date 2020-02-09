import {VirtualDeviceConfigSpec} from './virtual-device-config-spec';


export interface VirtualDiskConfigSpec extends VirtualDeviceConfigSpec {
  diskMoveType?: string;
  migrateCache?: boolean;
}