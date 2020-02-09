import {DynamicData} from './dynamic-data';

import {VirtualMachineBootOptions} from './virtual-machine-boot-options';
import {VirtualMachineConsolePreferences} from './virtual-machine-console-preferences';
import {VirtualMachineAffinityInfo} from './virtual-machine-affinity-info';
import {ResourceAllocationInfo} from './resource-allocation-info';
import {HostCpuIdInfo} from './host-cpu-id-info';
import {VirtualMachineConfigInfoDatastoreUrlPair} from './virtual-machine-config-info-datastore-url-pair';
import {VirtualMachineDefaultPowerOpInfo} from './virtual-machine-default-power-op-info';
import {OptionValue} from './option-value';
import {VirtualMachineFileInfo} from './virtual-machine-file-info';
import {VirtualMachineFlagInfo} from './virtual-machine-flag-info';
import {VirtualMachineForkConfigInfo} from './virtual-machine-fork-config-info';
import {FaultToleranceConfigInfo} from './fault-tolerance-config-info';
import {VirtualMachineGuestIntegrityInfo} from './virtual-machine-guest-integrity-info';
import {VirtualHardware} from './virtual-hardware';
import {VirtualMachineConfigInfoOverheadInfo} from './virtual-machine-config-info-overhead-info';
import {CryptoKeyId} from './crypto-key-id';
import {LatencySensitivity} from './latency-sensitivity';
import {ManagedByInfo} from './managed-by-info';
import {VirtualMachineNetworkShaperInfo} from './virtual-machine-network-shaper-info';
import {ReplicationConfigSpec} from './replication-config-spec';
import {ScheduledHardwareUpgradeInfo} from './scheduled-hardware-upgrade-info';
import {ToolsConfigInfo} from './tools-config-info';
import {VmConfigInfo} from './vm-config-info';

export interface VirtualMachineConfigInfo extends DynamicData {
  alternateGuestName: string;
  annotation?: string;
  bootOptions?: VirtualMachineBootOptions;
  changeTrackingEnabled?: boolean;
  changeVersion: string;
  consolePreferences?: VirtualMachineConsolePreferences;
  cpuAffinity?: VirtualMachineAffinityInfo;
  cpuAllocation?: ResourceAllocationInfo;
  cpuFeatureMask?: HostCpuIdInfo[];
  cpuHotAddEnabled?: boolean;
  cpuHotRemoveEnabled?: boolean;
  createDate?: string;
  datastoreUrl?: VirtualMachineConfigInfoDatastoreUrlPair[];
  defaultPowerOps: VirtualMachineDefaultPowerOpInfo;
  extraConfig?: OptionValue[];
  files: VirtualMachineFileInfo;
  firmware?: string;
  flags: VirtualMachineFlagInfo;
  forkConfigInfo?: VirtualMachineForkConfigInfo;
  ftInfo?: FaultToleranceConfigInfo;
  guestAutoLockEnabled?: boolean;
  guestFullName: string;
  guestId: string;
  guestIntegrityInfo?: VirtualMachineGuestIntegrityInfo;
  hardware: VirtualHardware;
  hotPlugMemoryIncrementSize?: number;
  hotPlugMemoryLimit?: number;
  initialOverhead?: VirtualMachineConfigInfoOverheadInfo;
  instanceUuid?: string;
  keyId?: CryptoKeyId;
  latencySensitivity?: LatencySensitivity;
  locationId?: string;
  managedBy?: ManagedByInfo;
  maxMksConnections?: number;
  memoryAffinity?: VirtualMachineAffinityInfo;
  memoryAllocation?: ResourceAllocationInfo;
  memoryHotAddEnabled?: boolean;
  memoryReservationLockedToMax?: boolean;
  messageBusTunnelEnabled?: boolean;
  migrateEncryption?: string;
  modified: string;
  name: string;
  nestedHVEnabled?: boolean;
  networkShaper?: VirtualMachineNetworkShaperInfo;
  npivDesiredNodeWwns?: number;
  npivDesiredPortWwns?: number;
  npivNodeWorldWideName?: number[];
  npivOnNonRdmDisks?: boolean;
  npivPortWorldWideName?: number[];
  npivTemporaryDisabled?: boolean;
  npivWorldWideNameType?: string;
  repConfig?: ReplicationConfigSpec;
  scheduledHardwareUpgradeInfo?: ScheduledHardwareUpgradeInfo;
  swapPlacement?: string;
  swapStorageObjectId?: string;
  template: boolean;
  tools?: ToolsConfigInfo;
  uuid: string;
  vAppConfig?: VmConfigInfo;
  vAssertsEnabled?: boolean;
  version: string;
  vFlashCacheReservation?: number;
  vmStorageObjectId?: string;
  vmxConfigChecksum?: string;
  vPMCEnabled?: boolean;
}