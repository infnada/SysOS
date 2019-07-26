import {VirtualMachineBootOptions} from "./virtual-machine-boot-options";
import {VirtualMachineConsolePreferences} from "./virtual-machine-console-preferences";
import {VirtualMachineAffinityInfo} from "./virtual-machine-affinity-info";
import {ResourceAllocationInfo} from "./resource-allocation-info";
import {VirtualMachineCpuIdInfoSpec} from "./virtual-machine-cpu-id-info-spec";
import {CryptoSpec} from "./crypto-spec";
import {VirtualDeviceConfigSpec} from "./virtual-device-config-spec";
import {OptionValue} from "./option-value";
import {VirtualMachineFileInfo} from "./virtual-machine-file-info";
import {VirtualMachineFlagInfo} from "./virtual-machine-flag-info";
import {FaultToleranceConfigInfo} from "./fault-tolerance-config-info";
import {LatencySensitivity} from "./latency-sensitivity";
import {ManagedByInfo} from "./managed-by-info";
import {VirtualMachineNetworkShaperInfo} from "./virtual-machine-network-shaper-info";
import {VirtualMachineDefaultPowerOpInfo} from "./virtual-machine-default-power-op-info";
import {ReplicationConfigSpec} from "./replication-config-spec";
import {ScheduledHardwareUpgradeInfo} from "./scheduled-hardware-upgrade-info";
import {ToolsConfigInfo} from "./tools-config-info";
import {VirtualMachineProfileSpec} from "./virtual-machine-profile-spec";
import {VmConfigSpec} from "./vm-config-spec";

export interface VirtualMachineConfigSpec {
  alternateGuestName?: string;
  annotation?: string;
  bootOptions?: VirtualMachineBootOptions;
  changeTrackingEnabled?: boolean;
  changeVersion?: string;
  consolePreferences?: VirtualMachineConsolePreferences;
  cpuAffinity?: VirtualMachineAffinityInfo;
  cpuAllocation?: ResourceAllocationInfo;
  cpuFeatureMask?: VirtualMachineCpuIdInfoSpec[];
  cpuHotAddEnabled?: boolean;
  cpuHotRemoveEnabled?: boolean;
  createDate?: Date;
  crypto?: CryptoSpec;
  deviceChange?: VirtualDeviceConfigSpec[];
  extraConfig?: OptionValue[];
  files?: VirtualMachineFileInfo;
  firmware?: string;
  flags?: VirtualMachineFlagInfo;
  ftInfo?: FaultToleranceConfigInfo;
  guestAutoLockEnabled?: boolean;
  guestId?: string;
  instanceUuid?: string;
  latencySensitivity?: LatencySensitivity;
  locationId?: string;
  managedBy?: ManagedByInfo;
  maxMksConnections?: number;
  memoryAffinity?: VirtualMachineAffinityInfo;
  memoryAllocation?: ResourceAllocationInfo;
  memoryHotAddEnabled?: boolean;
  memoryMB?: number;
  memoryReservationLockedToMax?: boolean;
  messageBusTunnelEnabled?: boolean;
  migrateEncryption?: string;
  name?: string;
  nestedHVEnabled?: boolean;
  networkShaper?: VirtualMachineNetworkShaperInfo;
  npivDesiredNodeWwns?: number;
  npivDesiredPortWwns?: number;
  npivNodeWorldWideName?: number[];
  npivOnNonRdmDisks?: boolean;
  npivPortWorldWideName?: number[];
  npivTemporaryDisabled?: boolean;
  npivWorldWideNameOp?: string;
  npivWorldWideNameType?: string;
  numCoresPerSocket?: number;
  numCPUs?: number;
  powerOpInfo?: VirtualMachineDefaultPowerOpInfo;
  repConfig?: ReplicationConfigSpec;
  scheduledHardwareUpgradeInfo?: ScheduledHardwareUpgradeInfo;
  swapPlacement?: string;
  tools?: ToolsConfigInfo;
  uuid?: string;
  vAppConfig?: VmConfigSpec;
  vAppConfigRemoved?: boolean;
  vAssertsEnabled?: boolean;
  version?: string;
  virtualICH7MPresent?: boolean;
  virtualSMCPresent?: boolean;
  vmProfile?: VirtualMachineProfileSpec[];
  vPMCEnabled?: boolean;
}