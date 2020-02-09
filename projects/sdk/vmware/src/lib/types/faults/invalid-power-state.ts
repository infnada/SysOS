import {InvalidState} from './invalid-state';

import {VirtualMachinePowerState} from '../enums/virtual-machine-power-state';

export interface InvalidPowerState extends InvalidState {
  existingState: VirtualMachinePowerState;
  requestedState?: VirtualMachinePowerState;
}