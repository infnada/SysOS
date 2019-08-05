import {VirtualDeviceRemoteDeviceBackingOption} from './virtual-device-remote-device-backing-option';

import {BoolOption} from './bool-option';
export interface VirtualCdromRemotePassthroughBackingOption extends VirtualDeviceRemoteDeviceBackingOption {
  exclusive: BoolOption;
}
