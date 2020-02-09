import {DynamicData} from './dynamic-data';

import {VirtualMachineConnectionState} from '../enums/virtual-machine-connection-state';
import {VirtualMachineRuntimeInfoDasProtectionState} from './virtual-machine-runtime-info-das-protection-state';
import {VirtualMachineDeviceRuntimeInfo} from './virtual-machine-device-runtime-info';
import {VirtualMachineFaultToleranceState} from '../enums/virtual-machine-fault-tolerance-state';
import {HostFeatureMask} from './host-feature-mask';
import {VirtualMachineFeatureRequirement} from './virtual-machine-feature-requirement';
import {ManagedObjectReference} from './managed-object-reference';
import {VirtualMachinePowerState} from '../enums/virtual-machine-power-state';
import {VirtualMachineQuestionInfo} from './virtual-machine-question-info';
import {VirtualMachineRecordReplayState} from '../enums/virtual-machine-record-replay-state';

export interface VirtualMachineRuntimeInfo extends DynamicData {
  bootTime?: string;
  cleanPowerOff?: boolean;
  connectionState: VirtualMachineConnectionState;
  consolidationNeeded: boolean;
  cryptoState?: string;
  dasVmProtection?: VirtualMachineRuntimeInfoDasProtectionState;
  device?: VirtualMachineDeviceRuntimeInfo[];
  faultToleranceState: VirtualMachineFaultToleranceState;
  featureMask?: HostFeatureMask[];
  featureRequirement?: VirtualMachineFeatureRequirement[];
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  instantCloneFrozen?: boolean;
  maxCpuUsage?: number;
  maxMemoryUsage?: number;
  memoryOverhead?: number;
  minRequiredEVCModeKey?: string;
  needSecondaryReason?: string;
  numMksConnections: number;
  offlineFeatureRequirement?: VirtualMachineFeatureRequirement[];
  onlineStandby: boolean;
  paused?: boolean;
  powerState: VirtualMachinePowerState;
  question?: VirtualMachineQuestionInfo;
  quiescedForkParent?: boolean;
  recordReplayState: VirtualMachineRecordReplayState;
  snapshotInBackground?: boolean;
  suspendInterval?: number;
  suspendTime?: string;
  toolsInstallerMounted: boolean;
  vFlashCacheAllocation?: number;
}