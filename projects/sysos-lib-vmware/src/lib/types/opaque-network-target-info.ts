import {VirtualMachineTargetInfo} from './virtual-machine-target-info';

import {OpaqueNetworkSummary} from './opaque-network-summary';
export interface OpaqueNetworkTargetInfo extends VirtualMachineTargetInfo {
  network: OpaqueNetworkSummary;
  networkReservationSupported?: boolean;
}
