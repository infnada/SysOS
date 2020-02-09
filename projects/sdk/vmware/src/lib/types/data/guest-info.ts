import {DynamicData} from './dynamic-data';

import {GuestDiskInfo} from './guest-disk-info';
import {GuestInfoNamespaceGenerationInfo} from './guest-info-namespace-generation-info';
import {GuestStackInfo} from './guest-stack-info';
import {GuestNicInfo} from './guest-nic-info';
import {GuestScreenInfo} from './guest-screen-info';
import {VirtualMachineToolsStatus} from '../enums/virtual-machine-tools-status';

export interface GuestInfo extends DynamicData {
  appHeartbeatStatus?: string;
  appState?: string;
  disk?: GuestDiskInfo[];
  generationInfo?: GuestInfoNamespaceGenerationInfo[];
  guestFamily?: string;
  guestFullName?: string;
  guestId?: string;
  guestKernelCrashed?: boolean;
  guestOperationsReady?: boolean;
  guestState: string;
  guestStateChangeSupported?: boolean;
  hostName?: string;
  interactiveGuestOperationsReady?: boolean;
  ipAddress?: string;
  ipStack?: GuestStackInfo[];
  net?: GuestNicInfo[];
  screen?: GuestScreenInfo;
  toolsInstallType?: string;
  toolsRunningStatus?: string;
  toolsStatus?: VirtualMachineToolsStatus;
  toolsVersion?: string;
  toolsVersionStatus?: string;
  toolsVersionStatus2?: string;
}