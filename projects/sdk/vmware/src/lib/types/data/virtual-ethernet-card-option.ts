import {VirtualDeviceOption} from './virtual-device-option';

import {ChoiceOption} from './choice-option';
import {BoolOption} from './bool-option';

export interface VirtualEthernetCardOption extends VirtualDeviceOption {
  macType: ChoiceOption;
  supportedOUI: ChoiceOption;
  uptCompatibilityEnabled?: BoolOption;
  vmDirectPathGen2Supported: boolean;
  wakeOnLanEnabled: BoolOption;
}