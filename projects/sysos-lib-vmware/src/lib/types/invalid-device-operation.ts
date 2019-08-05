import {InvalidDeviceSpec} from './invalid-device-spec';

import {VirtualDeviceConfigSpecFileOperation} from './virtual-device-config-spec-file-operation';
import {VirtualDeviceConfigSpecOperation} from './virtual-device-config-spec-operation';
export interface InvalidDeviceOperation extends InvalidDeviceSpec {
  badFileOp?: VirtualDeviceConfigSpecFileOperation;
  badOp?: VirtualDeviceConfigSpecOperation;
}
