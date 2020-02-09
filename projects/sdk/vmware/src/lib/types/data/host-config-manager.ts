import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface HostConfigManager extends DynamicData {
  accountManager?: ManagedObjectReference & { $type: 'HostLocalAccountManager'; };
  advancedOption?: ManagedObjectReference & { $type: 'OptionManager'; };
  authenticationManager?: ManagedObjectReference & { $type: 'HostAuthenticationManager'; };
  autoStartManager?: ManagedObjectReference & { $type: 'HostAutoStartManager'; };
  bootDeviceSystem?: ManagedObjectReference & { $type: 'HostBootDeviceSystem'; };
  cacheConfigurationManager?: ManagedObjectReference & { $type: 'HostCacheConfigurationManager'; };
  certificateManager?: ManagedObjectReference & { $type: 'HostCertificateManager'; };
  cpuScheduler?: ManagedObjectReference & { $type: 'HostCpuSchedulerSystem'; };
  cryptoManager?: ManagedObjectReference & { $type: 'CryptoManager'; };
  datastoreSystem?: ManagedObjectReference & { $type: 'HostDatastoreSystem'; };
  dateTimeSystem?: ManagedObjectReference & { $type: 'HostDateTimeSystem'; };
  diagnosticSystem?: ManagedObjectReference & { $type: 'HostDiagnosticSystem'; };
  esxAgentHostManager?: ManagedObjectReference & { $type: 'HostEsxAgentHostManager'; };
  firewallSystem?: ManagedObjectReference & { $type: 'HostFirewallSystem'; };
  firmwareSystem?: ManagedObjectReference & { $type: 'HostFirmwareSystem'; };
  graphicsManager?: ManagedObjectReference & { $type: 'HostGraphicsManager'; };
  healthStatusSystem?: ManagedObjectReference & { $type: 'HostHealthStatusSystem'; };
  hostAccessManager?: ManagedObjectReference & { $type: 'HostAccessManager'; };
  imageConfigManager?: ManagedObjectReference & { $type: 'HostImageConfigManager'; };
  iscsiManager?: ManagedObjectReference & { $type: 'IscsiManager'; };
  kernelModuleSystem?: ManagedObjectReference & { $type: 'HostKernelModuleSystem'; };
  licenseManager?: ManagedObjectReference & { $type: 'LicenseManager'; };
  memoryManager?: ManagedObjectReference & { $type: 'HostMemorySystem'; };
  messageBusProxy?: ManagedObjectReference & { $type: 'MessageBusProxy'; };
  networkSystem?: ManagedObjectReference & { $type: 'HostNetworkSystem'; };
  nvdimmSystem?: ManagedObjectReference & { $type: 'HostNvdimmSystem'; };
  patchManager?: ManagedObjectReference & { $type: 'HostPatchManager'; };
  pciPassthruSystem?: ManagedObjectReference & { $type: 'HostPciPassthruSystem'; };
  powerSystem?: ManagedObjectReference & { $type: 'HostPowerSystem'; };
  serviceSystem?: ManagedObjectReference & { $type: 'HostServiceSystem'; };
  snmpSystem?: ManagedObjectReference & { $type: 'HostSnmpSystem'; };
  storageSystem?: ManagedObjectReference & { $type: 'HostStorageSystem'; };
  userDirectory?: ManagedObjectReference & { $type: 'UserDirectory'; };
  vFlashManager?: ManagedObjectReference & { $type: 'HostVFlashManager'; };
  virtualNicManager?: ManagedObjectReference & { $type: 'HostVirtualNicManager'; };
  vmotionSystem?: ManagedObjectReference & { $type: 'HostVMotionSystem'; };
  vsanInternalSystem?: ManagedObjectReference & { $type: 'HostVsanInternalSystem'; };
  vsanSystem?: ManagedObjectReference & { $type: 'HostVsanSystem'; };
}