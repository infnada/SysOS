import {DynamicData} from './dynamic-data';

import {HostCpuIdInfo} from './host-cpu-id-info';

export interface HostCapability extends DynamicData {
  accel3dSupported: boolean;
  backgroundSnapshotsSupported: boolean;
  cloneFromSnapshotSupported: boolean;
  cpuHwMmuSupported?: boolean;
  cpuMemoryResourceConfigurationSupported: boolean;
  cryptoSupported?: boolean;
  datastorePrincipalSupported: boolean;
  deltaDiskBackingsSupported: boolean;
  eightPlusHostVmfsSharedAccessSupported: boolean;
  encryptedVMotionSupported?: boolean;
  encryptionCBRCSupported?: boolean;
  encryptionChangeOnAddRemoveSupported?: boolean;
  encryptionFaultToleranceSupported?: boolean;
  encryptionHBRSupported?: boolean;
  encryptionHotOperationSupported?: boolean;
  encryptionMemorySaveSupported?: boolean;
  encryptionRDMSupported?: boolean;
  encryptionVFlashSupported?: boolean;
  encryptionWithSnapshotsSupported?: boolean;
  featureCapabilitiesSupported: boolean;
  firewallIpRulesSupported?: boolean;
  ftCompatibilityIssues?: string[];
  ftEfiSupported?: boolean;
  ftSupported: boolean;
  ftVmcpSupported?: boolean;
  gatewayOnNicSupported?: boolean;
  hbrNicSelectionSupported: boolean;
  highGuestMemSupported: boolean;
  hostAccessManagerSupported?: boolean;
  interVMCommunicationThroughVMCISupported: boolean;
  ipmiSupported?: boolean;
  iscsiSupported: boolean;
  latencySensitivitySupported: boolean;
  localSwapDatastoreSupported: boolean;
  loginBySSLThumbprintSupported?: boolean;
  maintenanceModeSupported: boolean;
  markAsLocalSupported?: boolean;
  markAsSsdSupported?: boolean;
  markPerenniallyReservedSupported?: boolean;
  maxHostRunningVms?: number;
  maxHostSupportedVcpus?: number;
  maxMemMBPerFtVm?: number;
  maxNumDisksSVMotion?: number;
  maxRegisteredVMs?: number;
  maxRunningVMs?: number;
  maxSupportedVcpus?: number;
  maxSupportedVMs?: number;
  maxVcpusPerFtVm?: number;
  messageBusProxySupported?: boolean;
  multipleNetworkStackInstanceSupported?: boolean;
  nestedHVSupported: boolean;
  nfs41Krb5iSupported?: boolean;
  nfs41Supported?: boolean;
  nfsSupported: boolean;
  nicTeamingSupported: boolean;
  oneKVolumeAPIsSupported?: boolean;
  perVMNetworkTrafficShapingSupported: boolean;
  perVmSwapFiles: boolean;
  pMemSnapshotSupported?: boolean;
  pMemSupported?: boolean;
  preAssignedPCIUnitNumbersSupported: boolean;
  provisioningNicSelectionSupported: boolean;
  quickBootSupported?: boolean;
  rebootSupported: boolean;
  recordReplaySupported: boolean;
  recursiveResourcePoolsSupported: boolean;
  reliableMemoryAware?: boolean;
  replayCompatibilityIssues?: string[];
  replayUnsupportedReason?: string;
  restrictedSnapshotRelocateSupported: boolean;
  sanSupported: boolean;
  scaledScreenshotSupported: boolean;
  scheduledHardwareUpgradeSupported?: boolean;
  screenshotSupported: boolean;
  servicePackageInfoSupported?: boolean;
  shutdownSupported: boolean;
  smartCardAuthenticationSupported?: boolean;
  smpFtCompatibilityIssues?: string[];
  smpFtSupported: boolean;
  snapshotRelayoutSupported: boolean;
  standbySupported: boolean;
  storageIORMSupported: boolean;
  storagePolicySupported?: boolean;
  storageVMotionSupported: boolean;
  supportedCpuFeature?: HostCpuIdInfo[];
  supportedVmfsMajorVersion?: number[];
  suspendedRelocateSupported: boolean;
  tpmSupported: boolean;
  tpmVersion?: string;
  turnDiskLocatorLedSupported?: boolean;
  txtEnabled?: boolean;
  unmapMethodSupported?: string;
  unsharedSwapVMotionSupported: boolean;
  upitSupported?: boolean;
  vFlashSupported?: boolean;
  virtualExecUsageIgnored?: boolean;
  virtualExecUsageSupported: boolean;
  virtualMmuUsageIgnored?: boolean;
  virtualVolumeDatastoreSupported?: boolean;
  vlanTaggingSupported: boolean;
  vmCreateDateSupported?: boolean;
  vmDirectPathGen2Supported: boolean;
  vmDirectPathGen2UnsupportedReason?: string[];
  vmDirectPathGen2UnsupportedReasonExtended?: string;
  vmfs3EOLSupported?: boolean;
  vmfsDatastoreMountCapable: boolean;
  vmotionAcrossNetworkSupported?: boolean;
  vmotionSupported: boolean;
  vmotionWithStorageVMotionSupported: boolean;
  vPMCSupported: boolean;
  vrNfcNicSelectionSupported: boolean;
  vsanSupported?: boolean;
  vStorageCapable: boolean;
}