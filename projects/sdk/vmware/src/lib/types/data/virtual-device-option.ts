import {DynamicData} from './dynamic-data';

import {BoolOption} from './bool-option';
import {VirtualDeviceBackingOption} from './virtual-device-backing-option';
import {VirtualDeviceBusSlotOption} from './virtual-device-bus-slot-option';
import {VirtualDeviceConnectOption} from './virtual-device-connect-option';

export interface VirtualDeviceOption extends DynamicData {
  autoAssignController?: BoolOption;
  backingOption?: VirtualDeviceBackingOption[];
  busSlotOption?: VirtualDeviceBusSlotOption;
  connectOption?: VirtualDeviceConnectOption;
  controllerType?: string;
  defaultBackingOptionIndex?: number;
  deprecated: boolean;
  hotRemoveSupported: boolean;
  licensingLimit?: string[];
  plugAndPlay: boolean;
  type: string;
}