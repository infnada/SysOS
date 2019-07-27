import {VirtualDeviceConfigSpecBackingSpec} from './virtual-device-config-spec-backing-spec';
import {VirtualDevice} from './virtual-device';
import {VirtualDeviceConfigSpecFileOperation} from './virtual-device-config-spec-file-operation';
import {VirtualDeviceConfigSpecOperation} from './virtual-device-config-spec-operation';
import {VirtualMachineProfileSpec} from './virtual-machine-profile-spec';

export interface VirtualDeviceConfigSpec {
  backing?: VirtualDeviceConfigSpecBackingSpec;
  device: VirtualDevice;
  fileOperation?: VirtualDeviceConfigSpecFileOperation;
  operation?: VirtualDeviceConfigSpecOperation;
  profile?: VirtualMachineProfileSpec[];
}
