import {DynamicData} from './dynamic-data';

import {BoolOption} from './bool-option';

export interface VirtualDeviceConnectOption extends DynamicData {
  allowGuestControl: BoolOption;
  startConnected: BoolOption;
}