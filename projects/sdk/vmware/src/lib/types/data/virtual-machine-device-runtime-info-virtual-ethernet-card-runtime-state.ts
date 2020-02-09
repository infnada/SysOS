import {VirtualMachineDeviceRuntimeInfoDeviceRuntimeState} from './virtual-machine-device-runtime-info-device-runtime-state';

import {VirtualMachineFeatureRequirement} from './virtual-machine-feature-requirement';

export interface VirtualMachineDeviceRuntimeInfoVirtualEthernetCardRuntimeState extends VirtualMachineDeviceRuntimeInfoDeviceRuntimeState {
  attachmentStatus?: string;
  featureRequirement?: VirtualMachineFeatureRequirement[];
  reservationStatus?: string;
  vmDirectPathGen2Active: boolean;
  vmDirectPathGen2InactiveReasonExtended?: string;
  vmDirectPathGen2InactiveReasonOther?: string[];
  vmDirectPathGen2InactiveReasonVm?: string[];
}