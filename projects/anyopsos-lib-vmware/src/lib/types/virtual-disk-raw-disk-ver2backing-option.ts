import {VirtualDeviceDeviceBackingOption} from './virtual-device-device-backing-option';

import {ChoiceOption} from './choice-option';
export interface VirtualDiskRawDiskVer2BackingOption extends VirtualDeviceDeviceBackingOption {
  descriptorFileNameExtensions: ChoiceOption;
  uuid: boolean;
}
