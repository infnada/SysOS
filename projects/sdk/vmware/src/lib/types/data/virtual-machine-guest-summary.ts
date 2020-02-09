import {DynamicData} from './dynamic-data';

import {VirtualMachineToolsStatus} from '../enums/virtual-machine-tools-status';

export interface VirtualMachineGuestSummary extends DynamicData {
  guestFullName?: string;
  guestId?: string;
  hostName?: string;
  ipAddress?: string;
  toolsRunningStatus?: string;
  toolsStatus?: VirtualMachineToolsStatus;
  toolsVersionStatus?: string;
  toolsVersionStatus2?: string;
}