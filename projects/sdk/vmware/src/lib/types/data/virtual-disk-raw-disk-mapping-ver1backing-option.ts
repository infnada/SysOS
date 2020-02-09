import {VirtualDeviceDeviceBackingOption} from './virtual-device-device-backing-option';

import {ChoiceOption} from './choice-option';

export interface VirtualDiskRawDiskMappingVer1BackingOption extends VirtualDeviceDeviceBackingOption {
  compatibilityMode: ChoiceOption;
  descriptorFileNameExtensions?: ChoiceOption;
  diskMode: ChoiceOption;
  uuid: boolean;
}