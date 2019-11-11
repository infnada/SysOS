import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import {SysosLibLoggerService} from '@sysos/lib-logger';

import {SysosLibVmwareHelperService} from './sysos-lib-vmware-helper.service';
import {SysosLibVmwareAlarmService} from './managed-object-types/sysos-lib-vmware-alarm.service';
import {SysosLibVmwareAlarmManagerService} from './managed-object-types/sysos-lib-vmware-alarm-manager.service';
import {SysosLibVmwareAuthorizationManagerService} from './managed-object-types/sysos-lib-vmware-authorization-manager.service';
import {SysosLibVmwareCertificateManagerService} from './managed-object-types/sysos-lib-vmware-certificate-manager.service';
import {SysosLibVmwareClusterComputeResourceService} from './managed-object-types/sysos-lib-vmware-cluster-compute-resource.service';
import {SysosLibVmwareClusterEVCManagerService} from './managed-object-types/sysos-lib-vmware-cluster-evc-manager.service';
import {SysosLibVmwareClusterProfileService} from './managed-object-types/sysos-lib-vmware-cluster-profile.service';
import {SysosLibVmwareClusterProfileManagerService} from './managed-object-types/sysos-lib-vmware-cluster-profile-manager.service';
import {SysosLibVmwareComputeResourceService} from './managed-object-types/sysos-lib-vmware-compute-resource.service';
import {SysosLibVmwareContainerViewService} from './managed-object-types/sysos-lib-vmware-container-view.service';
import {SysosLibVmwareCryptoManagerService} from './managed-object-types/sysos-lib-vmware-crypto-manager.service';
import {SysosLibVmwareCryptoManagerHostService} from './managed-object-types/sysos-lib-vmware-crypto-manager-host.service';
import {SysosLibVmwareCryptoManagerHostKMSService} from './managed-object-types/sysos-lib-vmware-crypto-manager-host-kms.service';
import {SysosLibVmwareCryptoManagerKmipService} from './managed-object-types/sysos-lib-vmware-crypto-manager-kmip.service';
import {SysosLibVmwareCustomFieldsManagerService} from './managed-object-types/sysos-lib-vmware-custom-fields-manager.service';
import {SysosLibVmwareCustomizationSpecManagerService} from './managed-object-types/sysos-lib-vmware-customization-spec-manager.service';
import {SysosLibVmwareDatacenterService} from './managed-object-types/sysos-lib-vmware-datacenter.service';
import {SysosLibVmwareDatastoreService} from './managed-object-types/sysos-lib-vmware-datastore.service';
import {SysosLibVmwareDatastoreNamespaceManagerService} from './managed-object-types/sysos-lib-vmware-datastore-namespace-manager.service';
import {SysosLibVmwareDiagnosticManagerService} from './managed-object-types/sysos-lib-vmware-diagnostic-manager.service';
import {SysosLibVmwareDistributedVirtualPortgroupService} from './managed-object-types/sysos-lib-vmware-distributed-virtual-portgroup.service';
import {SysosLibVmwareDistributedVirtualSwitchService} from './managed-object-types/sysos-lib-vmware-distributed-virtual-switch.service';
import {SysosLibVmwareDistributedVirtualSwitchManagerService} from './managed-object-types/sysos-lib-vmware-distributed-virtual-switch-manager.service';
import {SysosLibVmwareEnvironmentBrowserService} from './managed-object-types/sysos-lib-vmware-environment-browser.service';
import {SysosLibVmwareEventHistoryCollectorService} from './managed-object-types/sysos-lib-vmware-event-history-collector.service';
import {SysosLibVmwareEventManagerService} from './managed-object-types/sysos-lib-vmware-event-manager.service';
import {SysosLibVmwareExtensibleManagedObjectService} from './managed-object-types/sysos-lib-vmware-extensible-managed-object.service';
import {SysosLibVmwareExtensionManagerService} from './managed-object-types/sysos-lib-vmware-extension-manager.service';
import {SysosLibVmwareFailoverClusterConfiguratorService} from './managed-object-types/sysos-lib-vmware-failover-cluster-configurator.service';
import {SysosLibVmwareFailoverClusterManagerService} from './managed-object-types/sysos-lib-vmware-failover-cluster-manager.service';
import {SysosLibVmwareFileManagerService} from './managed-object-types/sysos-lib-vmware-file-manager.service';
import {SysosLibVmwareFolderService} from './managed-object-types/sysos-lib-vmware-folder.service';
import {SysosLibVmwareGuestAliasManagerService} from './managed-object-types/sysos-lib-vmware-guest-alias-manager.service';
import {SysosLibVmwareGuestAuthManagerService} from './managed-object-types/sysos-lib-vmware-guest-auth-manager.service';
import {SysosLibVmwareGuestFileManagerService} from './managed-object-types/sysos-lib-vmware-guest-file-manager.service';
import {SysosLibVmwareGuestOperationsManagerService} from './managed-object-types/sysos-lib-vmware-guest-operations-manager.service';
import {SysosLibVmwareGuestProcessManagerService} from './managed-object-types/sysos-lib-vmware-guest-process-manager.service';
import {SysosLibVmwareGuestWindowsRegistryManagerService} from './managed-object-types/sysos-lib-vmware-guest-windows-registry-manager.service';
import {SysosLibVmwareHealthUpdateManagerService} from './managed-object-types/sysos-lib-vmware-health-update-manager.service';
import {SysosLibVmwareHistoryCollectorService} from './managed-object-types/sysos-lib-vmware-history-collector.service';
import {SysosLibVmwareHostAccessManagerService} from './managed-object-types/sysos-lib-vmware-host-access-manager.service';
import {SysosLibVmwareHostActiveDirectoryAuthenticationService} from './managed-object-types/sysos-lib-vmware-host-active-directory-authentication.service';
import {SysosLibVmwareHostAuthenticationManagerService} from './managed-object-types/sysos-lib-vmware-host-authentication-manager.service';
import {SysosLibVmwareHostAuthenticationStoreService} from './managed-object-types/sysos-lib-vmware-host-authentication-store.service';
import {SysosLibVmwareHostAutoStartManagerService} from './managed-object-types/sysos-lib-vmware-host-auto-start-manager.service';
import {SysosLibVmwareHostBootDeviceSystemService} from './managed-object-types/sysos-lib-vmware-host-boot-device-system.service';
import {SysosLibVmwareHostCacheConfigurationManagerService} from './managed-object-types/sysos-lib-vmware-host-cache-configuration-manager.service';
import {SysosLibVmwareHostCertificateManagerService} from './managed-object-types/sysos-lib-vmware-host-certificate-manager.service';
import {SysosLibVmwareHostCpuSchedulerSystemService} from './managed-object-types/sysos-lib-vmware-host-cpu-scheduler-system.service';
import {SysosLibVmwareHostDatastoreBrowserService} from './managed-object-types/sysos-lib-vmware-host-datastore-browser.service';
import {SysosLibVmwareHostDatastoreSystemService} from './managed-object-types/sysos-lib-vmware-host-datastore-system.service';
import {SysosLibVmwareHostDateTimeSystemService} from './managed-object-types/sysos-lib-vmware-host-date-time-system.service';
import {SysosLibVmwareHostDiagnosticSystemService} from './managed-object-types/sysos-lib-vmware-host-diagnostic-system.service';
import {SysosLibVmwareHostDirectoryStoreService} from './managed-object-types/sysos-lib-vmware-host-directory-store.service';
import {SysosLibVmwareHostEsxAgentHostManagerService} from './managed-object-types/sysos-lib-vmware-host-esx-agent-host-manager.service';
import {SysosLibVmwareHostFirewallSystemService} from './managed-object-types/sysos-lib-vmware-host-firewall-system.service';
import {SysosLibVmwareHostFirmwareSystemService} from './managed-object-types/sysos-lib-vmware-host-firmware-system.service';
import {SysosLibVmwareHostGraphicsManagerService} from './managed-object-types/sysos-lib-vmware-host-graphics-manager.service';
import {SysosLibVmwareHostHealthStatusSystemService} from './managed-object-types/sysos-lib-vmware-host-health-status-system.service';
import {SysosLibVmwareHostImageConfigManagerService} from './managed-object-types/sysos-lib-vmware-host-image-config-manager.service';
import {SysosLibVmwareHostKernelModuleSystemService} from './managed-object-types/sysos-lib-vmware-host-kernel-module-system.service';
import {SysosLibVmwareHostLocalAccountManagerService} from './managed-object-types/sysos-lib-vmware-host-local-account-manager.service';
import {SysosLibVmwareHostLocalAuthenticationService} from './managed-object-types/sysos-lib-vmware-host-local-authentication.service';
import {SysosLibVmwareHostMemorySystemService} from './managed-object-types/sysos-lib-vmware-host-memory-system.service';
import {SysosLibVmwareHostNetworkSystemService} from './managed-object-types/sysos-lib-vmware-host-network-system.service';
import {SysosLibVmwareHostNvdimmSystemService} from './managed-object-types/sysos-lib-vmware-host-nvdimm-system.service';
import {SysosLibVmwareHostPatchManagerService} from './managed-object-types/sysos-lib-vmware-host-patch-manager.service';
import {SysosLibVmwareHostPciPassthruSystemService} from './managed-object-types/sysos-lib-vmware-host-pci-passthru-system.service';
import {SysosLibVmwareHostPowerSystemService} from './managed-object-types/sysos-lib-vmware-host-power-system.service';
import {SysosLibVmwareHostProfileService} from './managed-object-types/sysos-lib-vmware-host-profile.service';
import {SysosLibVmwareHostProfileManagerService} from './managed-object-types/sysos-lib-vmware-host-profile-manager.service';
import {SysosLibVmwareHostServiceSystemService} from './managed-object-types/sysos-lib-vmware-host-service-system.service';
import {SysosLibVmwareHostSnmpSystemService} from './managed-object-types/sysos-lib-vmware-host-snmp-system.service';
import {SysosLibVmwareHostSpecificationManagerService} from './managed-object-types/sysos-lib-vmware-host-specification-manager.service';
import {SysosLibVmwareHostStorageSystemService} from './managed-object-types/sysos-lib-vmware-host-storage-system.service';
import {SysosLibVmwareHostSystemService} from './managed-object-types/sysos-lib-vmware-host-system.service';
import {SysosLibVmwareHostVflashManagerService} from './managed-object-types/sysos-lib-vmware-host-vflash-manager.service';
import {SysosLibVmwareHostVirtualNicManagerService} from './managed-object-types/sysos-lib-vmware-host-virtual-nic-manager.service';
import {SysosLibVmwareHostVmotionSystemService} from './managed-object-types/sysos-lib-vmware-host-vmotion-system.service';
import {SysosLibVmwareHostVsanInternalSystemService} from './managed-object-types/sysos-lib-vmware-host-vsan-internal-system.service';
import {SysosLibVmwareHostVsanSystemService} from './managed-object-types/sysos-lib-vmware-host-vsan-system.service';
import {SysosLibVmwareHostVstorageObjectManagerService} from './managed-object-types/sysos-lib-vmware-host-vstorage-object-manager.service';
import {SysosLibVmwareHttpNfcLeaseService} from './managed-object-types/sysos-lib-vmware-http-nfc-lease.service';
import {SysosLibVmwareInventoryViewService} from './managed-object-types/sysos-lib-vmware-inventory-view.service';
import {SysosLibVmwareIoFilterManagerService} from './managed-object-types/sysos-lib-vmware-io-filter-manager.service';
import {SysosLibVmwareIpPoolManagerService} from './managed-object-types/sysos-lib-vmware-ip-pool-manager.service';
import {SysosLibVmwareIscsiManagerService} from './managed-object-types/sysos-lib-vmware-iscsi-manager.service';
import {SysosLibVmwareLicenseAssignmentManagerService} from './managed-object-types/sysos-lib-vmware-license-assignment-manager.service';
import {SysosLibVmwareLicenseManagerService} from './managed-object-types/sysos-lib-vmware-license-manager.service';
import {SysosLibVmwareListViewService} from './managed-object-types/sysos-lib-vmware-list-view.service';
import {SysosLibVmwareLocalizationManagerService} from './managed-object-types/sysos-lib-vmware-localization-manager.service';
import {SysosLibVmwareManagedEntityService} from './managed-object-types/sysos-lib-vmware-managed-entity.service';
import {SysosLibVmwareManagedObjectViewService} from './managed-object-types/sysos-lib-vmware-managed-object-view.service';
import {SysosLibVmwareMessageBusProxyService} from './managed-object-types/sysos-lib-vmware-message-bus-proxy.service';
import {SysosLibVmwareNetworkService} from './managed-object-types/sysos-lib-vmware-network.service';
import {SysosLibVmwareOpaqueNetworkService} from './managed-object-types/sysos-lib-vmware-opaque-network.service';
import {SysosLibVmwareOptionManagerService} from './managed-object-types/sysos-lib-vmware-option-manager.service';
import {SysosLibVmwareOverheadMemoryManagerService} from './managed-object-types/sysos-lib-vmware-overhead-memory-manager.service';
import {SysosLibVmwareOvfManagerService} from './managed-object-types/sysos-lib-vmware-ovf-manager.service';
import {SysosLibVmwarePerformanceManagerService} from './managed-object-types/sysos-lib-vmware-performance-manager.service';
import {SysosLibVmwareProfileService} from './managed-object-types/sysos-lib-vmware-profile.service';
import {SysosLibVmwareProfileComplianceManagerService} from './managed-object-types/sysos-lib-vmware-profile-compliance-manager.service';
import {SysosLibVmwareProfileManagerService} from './managed-object-types/sysos-lib-vmware-profile-manager.service';
import {SysosLibVmwarePropertyCollectorService} from './managed-object-types/sysos-lib-vmware-property-collector.service';
import {SysosLibVmwarePropertyFilterService} from './managed-object-types/sysos-lib-vmware-property-filter.service';
import {SysosLibVmwareResourcePlanningManagerService} from './managed-object-types/sysos-lib-vmware-resource-planning-manager.service';
import {SysosLibVmwareResourcePoolService} from './managed-object-types/sysos-lib-vmware-resource-pool.service';
import {SysosLibVmwareScheduledTaskService} from './managed-object-types/sysos-lib-vmware-scheduled-task.service';
import {SysosLibVmwareScheduledTaskManagerService} from './managed-object-types/sysos-lib-vmware-scheduled-task-manager.service';
import {SysosLibVmwareSearchIndexService} from './managed-object-types/sysos-lib-vmware-search-index.service';
import {SysosLibVmwareServiceInstanceService} from './managed-object-types/sysos-lib-vmware-service-instance.service';
import {SysosLibVmwareServiceManagerService} from './managed-object-types/sysos-lib-vmware-service-manager.service';
import {SysosLibVmwareSessionManagerService} from './managed-object-types/sysos-lib-vmware-session-manager.service';
import {SysosLibVmwareSimpleCommandService} from './managed-object-types/sysos-lib-vmware-simple-command.service';
import {SysosLibVmwareStoragePodService} from './managed-object-types/sysos-lib-vmware-storage-pod.service';
import {SysosLibVmwareStorageResourceManagerService} from './managed-object-types/sysos-lib-vmware-storage-resource-manager.service';
import {SysosLibVmwareTaskService} from './managed-object-types/sysos-lib-vmware-task.service';
import {SysosLibVmwareTaskHistoryCollectorService} from './managed-object-types/sysos-lib-vmware-task-history-collector.service';
import {SysosLibVmwareTaskManagerService} from './managed-object-types/sysos-lib-vmware-task-manager.service';
import {SysosLibVmwareUserDirectoryService} from './managed-object-types/sysos-lib-vmware-user-directory.service';
import {SysosLibVmwareVcenterVstorageObjectManagerService} from './managed-object-types/sysos-lib-vmware-vcenter-vstorage-object-manager.service';
import {SysosLibVmwareViewService} from './managed-object-types/sysos-lib-vmware-view.service';
import {SysosLibVmwareViewManagerService} from './managed-object-types/sysos-lib-vmware-view-manager.service';
import {SysosLibVmwareVirtualAppService} from './managed-object-types/sysos-lib-vmware-virtual-app.service';
import {SysosLibVmwareVirtualDiskManagerService} from './managed-object-types/sysos-lib-vmware-virtual-disk-manager.service';
import {SysosLibVmwareVirtualizationManagerService} from './managed-object-types/sysos-lib-vmware-virtualization-manager.service';
import {SysosLibVmwareVirtualMachineService} from './managed-object-types/sysos-lib-vmware-virtual-machine.service';
import {SysosLibVmwareVirtualMachineCompatibilityCheckerService} from './managed-object-types/sysos-lib-vmware-virtual-machine-compatibility-checker.service';
import {SysosLibVmwareVirtualMachineProvisioningCheckerService} from './managed-object-types/sysos-lib-vmware-virtual-machine-provisioning-checker.service';
import {SysosLibVmwareVirtualMachineSnapshotService} from './managed-object-types/sysos-lib-vmware-virtual-machine-snapshot.service';
import {SysosLibVmwareVmwareDistributedVirtualSwitchService} from './managed-object-types/sysos-lib-vmware-vmware-distributed-virtual-switch.service';
import {SysosLibVmwareVsanUpgradeSystemService} from './managed-object-types/sysos-lib-vmware-vsan-upgrade-system.service';
import {SysosLibVmwareVstorageObjectManagerBaseService} from './managed-object-types/sysos-lib-vmware-vstorage-object-manager-base.service';

import {ConnectionData} from './types/connection-data';
import {ManagedObjectReference} from './types/managed-object-reference';
import {VirtualMachineCloneSpec} from './types/virtual-machine-clone-spec';
import {HostNasVolumeSpec} from './types/host-nas-volume-spec';
import {EventFilterSpec} from './types/event-filter-spec';
import {PerfQuerySpec} from './types/perf-query-spec';
import {Extension} from './types/extension';
import {PropertyFilterSpec} from './types/property-filter-spec';
import {HostDatastoreBrowserSearchSpec} from './types/host-datastore-browser-search-spec';
import {TaskInfoState} from './types/task-info-state';
import {MethodFault} from './types/method-fault';
import {HostFirewallRulesetRulesetSpec} from './types/host-firewall-ruleset-ruleset-spec';
import {WaitOptions} from './types/wait-options';
import {TraversalSpec} from './types/traversal-spec';
import {VirtualMachineConfigSpec} from './types/virtual-machine-config-spec';
import {TaskFilterSpec} from './types/task-filter-spec';
import {DateTime} from './types/date-time';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareService {

  constructor(private http: HttpClient,
              private logger: SysosLibLoggerService,
              private SysosLibVmwareHelper: SysosLibVmwareHelperService,
              private Alarm: SysosLibVmwareAlarmService,
              private AlarmManager: SysosLibVmwareAlarmManagerService,
              private AuthorizationManager: SysosLibVmwareAuthorizationManagerService,
              private CertificateManager: SysosLibVmwareCertificateManagerService,
              private ClusterComputeResource: SysosLibVmwareClusterComputeResourceService,
              private ClusterEVCManager: SysosLibVmwareClusterEVCManagerService,
              private ClusterProfile: SysosLibVmwareClusterProfileService,
              private ClusterProfileManager: SysosLibVmwareClusterProfileManagerService,
              private ComputeResource: SysosLibVmwareComputeResourceService,
              private ContainerView: SysosLibVmwareContainerViewService,
              private CryptoManager: SysosLibVmwareCryptoManagerService,
              private CryptoManagerHost: SysosLibVmwareCryptoManagerHostService,
              private CryptoManagerHostKMS: SysosLibVmwareCryptoManagerHostKMSService,
              private CryptoManagerKmip: SysosLibVmwareCryptoManagerKmipService,
              private CustomFieldsManager: SysosLibVmwareCustomFieldsManagerService,
              private CustomizationSpecManager: SysosLibVmwareCustomizationSpecManagerService,
              private Datacenter: SysosLibVmwareDatacenterService,
              private Datastore: SysosLibVmwareDatastoreService,
              private DatastoreNamespaceManager: SysosLibVmwareDatastoreNamespaceManagerService,
              private DiagnosticManager: SysosLibVmwareDiagnosticManagerService,
              private DistributedVirtualPortgroup: SysosLibVmwareDistributedVirtualPortgroupService,
              private DistributedVirtualSwitch: SysosLibVmwareDistributedVirtualSwitchService,
              private DistributedVirtualSwitchManager: SysosLibVmwareDistributedVirtualSwitchManagerService,
              private EnvironmentBrowser: SysosLibVmwareEnvironmentBrowserService,
              private EventHistoryCollector: SysosLibVmwareEventHistoryCollectorService,
              private EventManager: SysosLibVmwareEventManagerService,
              private ExtensibleManagedObject: SysosLibVmwareExtensibleManagedObjectService,
              private ExtensionManager: SysosLibVmwareExtensionManagerService,
              private FailoverClusterConfigurator: SysosLibVmwareFailoverClusterConfiguratorService,
              private FailoverClusterManager: SysosLibVmwareFailoverClusterManagerService,
              private FileManager: SysosLibVmwareFileManagerService,
              private Folder: SysosLibVmwareFolderService,
              private GuestAliasManager: SysosLibVmwareGuestAliasManagerService,
              private GuestAuthManager: SysosLibVmwareGuestAuthManagerService,
              private GuestFileManager: SysosLibVmwareGuestFileManagerService,
              private GuestOperationsManager: SysosLibVmwareGuestOperationsManagerService,
              private GuestProcessManager: SysosLibVmwareGuestProcessManagerService,
              private GuestWindowsRegistryManager: SysosLibVmwareGuestWindowsRegistryManagerService,
              private HealthUpdateManager: SysosLibVmwareHealthUpdateManagerService,
              private HistoryCollector: SysosLibVmwareHistoryCollectorService,
              private HostAccessManager: SysosLibVmwareHostAccessManagerService,
              private HostActiveDirectoryAuthentication: SysosLibVmwareHostActiveDirectoryAuthenticationService,
              private HostAuthenticationManager: SysosLibVmwareHostAuthenticationManagerService,
              private HostAuthenticationStore: SysosLibVmwareHostAuthenticationStoreService,
              private HostAutoStartManager: SysosLibVmwareHostAutoStartManagerService,
              private HostBootDeviceSystem: SysosLibVmwareHostBootDeviceSystemService,
              private HostCacheConfigurationManager: SysosLibVmwareHostCacheConfigurationManagerService,
              private HostCertificateManager: SysosLibVmwareHostCertificateManagerService,
              private HostCpuSchedulerSystem: SysosLibVmwareHostCpuSchedulerSystemService,
              private HostDatastoreBrowser: SysosLibVmwareHostDatastoreBrowserService,
              private HostDatastoreSystem: SysosLibVmwareHostDatastoreSystemService,
              private HostDateTimeSystem: SysosLibVmwareHostDateTimeSystemService,
              private HostDiagnosticSystem: SysosLibVmwareHostDiagnosticSystemService,
              private HostDirectoryStore: SysosLibVmwareHostDirectoryStoreService,
              private HostEsxAgentHostManager: SysosLibVmwareHostEsxAgentHostManagerService,
              private HostFirewallSystem: SysosLibVmwareHostFirewallSystemService,
              private HostFirmwareSystem: SysosLibVmwareHostFirmwareSystemService,
              private HostGraphicsManager: SysosLibVmwareHostGraphicsManagerService,
              private HostHealthStatusSystem: SysosLibVmwareHostHealthStatusSystemService,
              private HostImageConfigManager: SysosLibVmwareHostImageConfigManagerService,
              private HostKernelModuleSystem: SysosLibVmwareHostKernelModuleSystemService,
              private HostLocalAccountManager: SysosLibVmwareHostLocalAccountManagerService,
              private HostLocalAuthentication: SysosLibVmwareHostLocalAuthenticationService,
              private HostMemorySystem: SysosLibVmwareHostMemorySystemService,
              private HostNetworkSystem: SysosLibVmwareHostNetworkSystemService,
              private HostNvdimmSystem: SysosLibVmwareHostNvdimmSystemService,
              private HostPatchManager: SysosLibVmwareHostPatchManagerService,
              private HostPciPassthruSystem: SysosLibVmwareHostPciPassthruSystemService,
              private HostPowerSystem: SysosLibVmwareHostPowerSystemService,
              private HostProfile: SysosLibVmwareHostProfileService,
              private HostProfileManager: SysosLibVmwareHostProfileManagerService,
              private HostServiceSystem: SysosLibVmwareHostServiceSystemService,
              private HostSnmpSystem: SysosLibVmwareHostSnmpSystemService,
              private HostSpecificationManager: SysosLibVmwareHostSpecificationManagerService,
              private HostStorageSystem: SysosLibVmwareHostStorageSystemService,
              private HostSystem: SysosLibVmwareHostSystemService,
              private HostVFlashManager: SysosLibVmwareHostVflashManagerService,
              private HostVirtualNicManager: SysosLibVmwareHostVirtualNicManagerService,
              private HostVMotionSystem: SysosLibVmwareHostVmotionSystemService,
              private HostVsanInternalSystem: SysosLibVmwareHostVsanInternalSystemService,
              private HostVsanSystem: SysosLibVmwareHostVsanSystemService,
              private HostVStorageObjectManager: SysosLibVmwareHostVstorageObjectManagerService,
              private HttpNfcLease: SysosLibVmwareHttpNfcLeaseService,
              private InventoryView: SysosLibVmwareInventoryViewService,
              private IoFilterManager: SysosLibVmwareIoFilterManagerService,
              private IpPoolManager: SysosLibVmwareIpPoolManagerService,
              private IscsiManager: SysosLibVmwareIscsiManagerService,
              private LicenseAssignmentManager: SysosLibVmwareLicenseAssignmentManagerService,
              private LicenseManager: SysosLibVmwareLicenseManagerService,
              private ListView: SysosLibVmwareListViewService,
              private LocalizationManager: SysosLibVmwareLocalizationManagerService,
              private ManagedEntity: SysosLibVmwareManagedEntityService,
              private ManagedObjectView: SysosLibVmwareManagedObjectViewService,
              private MessageBusProxy: SysosLibVmwareMessageBusProxyService,
              private Network: SysosLibVmwareNetworkService,
              private OpaqueNetwork: SysosLibVmwareOpaqueNetworkService,
              private OptionManager: SysosLibVmwareOptionManagerService,
              private OverheadMemoryManager: SysosLibVmwareOverheadMemoryManagerService,
              private OvfManager: SysosLibVmwareOvfManagerService,
              private PerformanceManager: SysosLibVmwarePerformanceManagerService,
              private Profile: SysosLibVmwareProfileService,
              private ProfileComplianceManager: SysosLibVmwareProfileComplianceManagerService,
              private ProfileManager: SysosLibVmwareProfileManagerService,
              private PropertyCollector: SysosLibVmwarePropertyCollectorService,
              private PropertyFilter: SysosLibVmwarePropertyFilterService,
              private ResourcePlanningManager: SysosLibVmwareResourcePlanningManagerService,
              private ResourcePool: SysosLibVmwareResourcePoolService,
              private ScheduledTask: SysosLibVmwareScheduledTaskService,
              private ScheduledTaskManager: SysosLibVmwareScheduledTaskManagerService,
              private SearchIndex: SysosLibVmwareSearchIndexService,
              private ServiceInstance: SysosLibVmwareServiceInstanceService,
              private ServiceManager: SysosLibVmwareServiceManagerService,
              private SessionManager: SysosLibVmwareSessionManagerService,
              private SimpleCommand: SysosLibVmwareSimpleCommandService,
              private StoragePod: SysosLibVmwareStoragePodService,
              private StorageResourceManager: SysosLibVmwareStorageResourceManagerService,
              private Task: SysosLibVmwareTaskService,
              private TaskHistoryCollector: SysosLibVmwareTaskHistoryCollectorService,
              private TaskManager: SysosLibVmwareTaskManagerService,
              private UserDirectory: SysosLibVmwareUserDirectoryService,
              private VcenterVStorageObjectManager: SysosLibVmwareVcenterVstorageObjectManagerService,
              private View: SysosLibVmwareViewService,
              private ViewManager: SysosLibVmwareViewManagerService,
              private VirtualApp: SysosLibVmwareVirtualAppService,
              private VirtualDiskManager: SysosLibVmwareVirtualDiskManagerService,
              private VirtualizationManager: SysosLibVmwareVirtualizationManagerService,
              private VirtualMachine: SysosLibVmwareVirtualMachineService,
              private VirtualMachineCompatibilityChecker: SysosLibVmwareVirtualMachineCompatibilityCheckerService,
              private VirtualMachineProvisioningChecker: SysosLibVmwareVirtualMachineProvisioningCheckerService,
              private VirtualMachineSnapshot: SysosLibVmwareVirtualMachineSnapshotService,
              private VmwareDistributedVirtualSwitch: SysosLibVmwareVmwareDistributedVirtualSwitchService,
              private VsanUpgradeSystem: SysosLibVmwareVsanUpgradeSystemService,
              private VStorageObjectManagerBase: SysosLibVmwareVstorageObjectManagerBaseService) {
  }

  // https://code.vmware.com/apis/358/vsphere#
  // https://vdc-repo.vmware.com/vmwb-repository/dcr-public/1cd28284-3b72-4885-9e31-d1c6d9e26686/71ef7304-a6c9-43b3-a3cd-868b2c236c81/doc/index.html

  /**
   * BASE VMWARE FUNCTIONS
   */

  AbdicateDomOwnership() { return this.HostVsanInternalSystem.AbdicateDomOwnership.apply( this, arguments ).catch(e => e); }
  AcknowledgeAlarm() { return this.AlarmManager.AcknowledgeAlarm.apply( this, arguments ).catch(e => e); }
  AcquireCimServicesTicket() { return this.HostSystem.AcquireCimServicesTicket.apply( this, arguments ).catch(e => e); }
  AcquireCloneTicket() { return this.SessionManager.AcquireCloneTicket.apply( this, arguments ).catch(e => e); }
  AcquireCredentialsInGuest() { return this.GuestAuthManager.AcquireCredentialsInGuest.apply( this, arguments ).catch(e => e); }
  AcquireGenericServiceTicket() { return this.SessionManager.AcquireGenericServiceTicket.apply( this, arguments ).catch(e => e); }
  AcquireLocalTicket() { return this.SessionManager.AcquireLocalTicket.apply( this, arguments ).catch(e => e); }
  AcquireMksTicket() { return this.VirtualMachine.AcquireMksTicket.apply( this, arguments ).catch(e => e); }
  AcquireTicket(connectionData: ConnectionData,
                managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
                ticketType: string) { return this.VirtualMachine.AcquireTicket.apply( this, arguments ).catch(e => e); }
  AddAuthorizationRole() { return this.AuthorizationManager.AddAuthorizationRole.apply( this, arguments ).catch(e => e); }
  AddCustomFieldDef() { return this.CustomFieldsManager.AddCustomFieldDef.apply( this, arguments ).catch(e => e); }
  AddDisks_Task() { return this.HostVsanSystem.AddDisks_Task.apply( this, arguments ).catch(e => e); }
  AddDVPortgroup_Task() { return this.DistributedVirtualSwitch.AddDVPortgroup_Task.apply( this, arguments ).catch(e => e); }
  AddFilter() { return this.HealthUpdateManager.AddFilter.apply( this, arguments ).catch(e => e); }
  AddFilterEntities() { return this.HealthUpdateManager.AddFilterEntities.apply( this, arguments ).catch(e => e); }
  AddGuestAlias() { return this.GuestAliasManager.AddGuestAlias.apply( this, arguments ).catch(e => e); }
  AddHost_Task() { return this.ClusterComputeResource.AddHost_Task.apply( this, arguments ).catch(e => e); }
  AddInternetScsiSendTargets() { return this.HostStorageSystem.AddInternetScsiSendTargets.apply( this, arguments ).catch(e => e); }
  AddInternetScsiStaticTargets() { return this.HostStorageSystem.AddInternetScsiStaticTargets.apply( this, arguments ).catch(e => e); }
  AddKey() { return this.CryptoManager.AddKey.apply( this, arguments ).catch(e => e); }
  AddKeys() { return this.CryptoManager.AddKeys.apply( this, arguments ).catch(e => e); }
  AddLicense() { return this.LicenseManager.AddLicense.apply( this, arguments ).catch(e => e); }
  AddMonitoredEntities() { return this.HealthUpdateManager.AddMonitoredEntities.apply( this, arguments ).catch(e => e); }
  AddNetworkResourcePool() { return this.DistributedVirtualSwitch.AddNetworkResourcePool.apply( this, arguments ).catch(e => e); }
  AddPortGroup() { return this.HostNetworkSystem.AddPortGroup.apply( this, arguments ).catch(e => e); }
  AddServiceConsoleVirtualNic() { return this.HostNetworkSystem.AddServiceConsoleVirtualNic.apply( this, arguments ).catch(e => e); }
  AddStandaloneHost_Task() { return this.Folder.AddStandaloneHost_Task.apply( this, arguments ).catch(e => e); }
  AddVirtualNic() { return this.HostNetworkSystem.AddVirtualNic.apply( this, arguments ).catch(e => e); }
  AddVirtualSwitch() { return this.HostNetworkSystem.AddVirtualSwitch.apply( this, arguments ).catch(e => e); }
  AllocateIpv4Address() { return this.IpPoolManager.AllocateIpv4Address.apply( this, arguments ).catch(e => e); }
  AllocateIpv6Address() { return this.IpPoolManager.AllocateIpv6Address.apply( this, arguments ).catch(e => e); }
  AnswerVM(connectionData: ConnectionData,
           managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
           questionId: string,
           answerChoice: string) { return this.VirtualMachine.AnswerVM.apply( this, arguments ).catch(e => e); }
  ApplyEntitiesConfig_Task() { return this.HostProfileManager.ApplyEntitiesConfig_Task.apply( this, arguments ).catch(e => e); }
  ApplyEvcModeVM_Task() { return this.VirtualMachine.ApplyEvcModeVM_Task.apply( this, arguments ).catch(e => e); }
  ApplyHostConfig_Task() { return this.HostProfileManager.ApplyHostConfig_Task.apply( this, arguments ).catch(e => e); }
  ApplyRecommendation() { return this.ClusterComputeResource.ApplyRecommendation.apply( this, arguments ).catch(e => e); }
  ApplyStorageDrsRecommendation_Task() { return this.StorageResourceManager.ApplyStorageDrsRecommendation_Task.apply( this, arguments ).catch(e => e); }
  ApplyStorageDrsRecommendationToPod_Task() { return this.StorageResourceManager.ApplyStorageDrsRecommendationToPod_Task.apply( this, arguments ).catch(e => e); }
  AreAlarmActionsEnabled() { return this.AlarmManager.AreAlarmActionsEnabled.apply( this, arguments ).catch(e => e); }
  AssignUserToGroup() { return this.HostLocalAccountManager.AssignUserToGroup.apply( this, arguments ).catch(e => e); }
  AssociateProfile() { return this.Profile.AssociateProfile.apply( this, arguments ).catch(e => e); }
  AttachDisk_Task() { return this.VirtualMachine.AttachDisk_Task.apply( this, arguments ).catch(e => e); }
  AttachScsiLun() { return this.HostStorageSystem.AttachScsiLun.apply( this, arguments ).catch(e => e); }
  AttachScsiLunEx_Task() { return this.HostStorageSystem.AttachScsiLunEx_Task.apply( this, arguments ).catch(e => e); }
  AttachTagToVStorageObject() { return this.VcenterVStorageObjectManager.AttachTagToVStorageObject.apply( this, arguments ).catch(e => e); }
  AttachVmfsExtent() { return this.HostStorageSystem.AttachVmfsExtent.apply( this, arguments ).catch(e => e); }
  AutoStartPowerOff() { return this.HostAutoStartManager.AutoStartPowerOff.apply( this, arguments ).catch(e => e); }
  AutoStartPowerOn() { return this.HostAutoStartManager.AutoStartPowerOn.apply( this, arguments ).catch(e => e); }
  BackupFirmwareConfiguration() { return this.HostFirmwareSystem.BackupFirmwareConfiguration.apply( this, arguments ).catch(e => e); }
  BindVnic() { return this.IscsiManager.BindVnic.apply( this, arguments ).catch(e => e); }
  BrowseDiagnosticLog() { return this.DiagnosticManager.BrowseDiagnosticLog.apply( this, arguments ).catch(e => e); }
  CancelRecommendation() { return this.ClusterComputeResource.CancelRecommendation.apply( this, arguments ).catch(e => e); }
  CancelRetrievePropertiesEx() { return this.PropertyCollector.CancelRetrievePropertiesEx.apply( this, arguments ).catch(e => e); }
  CancelStorageDrsRecommendation() { return this.StorageResourceManager.CancelStorageDrsRecommendation.apply( this, arguments ).catch(e => e); }
  CancelTask() { return this.Task.CancelTask.apply( this, arguments ).catch(e => e); }
  CancelWaitForUpdates() { return this.PropertyCollector.CancelWaitForUpdates.apply( this, arguments ).catch(e => e); }
  CanProvisionObjects() { return this.HostVsanInternalSystem.CanProvisionObjects.apply( this, arguments ).catch(e => e); }
  CertMgrRefreshCACertificatesAndCRLs_Task() { return this.CertificateManager.CertMgrRefreshCACertificatesAndCRLs_Task.apply( this, arguments ).catch(e => e); }
  CertMgrRefreshCertificates_Task() { return this.CertificateManager.CertMgrRefreshCertificates_Task.apply( this, arguments ).catch(e => e); }
  CertMgrRevokeCertificates_Task() { return this.CertificateManager.CertMgrRevokeCertificates_Task.apply( this, arguments ).catch(e => e); }
  ChangeAccessMode() { return this.HostAccessManager.ChangeAccessMode.apply( this, arguments ).catch(e => e); }
  ChangeFileAttributesInGuest() { return this.GuestFileManager.ChangeFileAttributesInGuest.apply( this, arguments ).catch(e => e); }
  ChangeKey_Task() { return this.CryptoManagerHost.ChangeKey_Task.apply( this, arguments ).catch(e => e); }
  ChangeLockdownMode() { return this.HostAccessManager.ChangeLockdownMode.apply( this, arguments ).catch(e => e); }
  ChangeNFSUserPassword() { return this.HostStorageSystem.ChangeNFSUserPassword.apply( this, arguments ).catch(e => e); }
  ChangeOwner() { return this.FileManager.ChangeOwner.apply( this, arguments ).catch(e => e); }
  CheckAddHostEvc_Task() { return this.ClusterEVCManager.CheckAddHostEvc_Task.apply( this, arguments ).catch(e => e); }
  CheckAnswerFileStatus_Task() { return this.HostProfileManager.CheckAnswerFileStatus_Task.apply( this, arguments ).catch(e => e); }
  CheckClone_Task() { return this.VirtualMachineProvisioningChecker.CheckClone_Task.apply( this, arguments ).catch(e => e); }
  CheckCompatibility_Task() { return this.VirtualMachineCompatibilityChecker.CheckCompatibility_Task.apply( this, arguments ).catch(e => e); }
  CheckCompliance_Task() { return this.ProfileComplianceManager.CheckCompliance_Task.apply( this, arguments ).catch(e => e); }
  CheckConfigureEvcMode_Task() { return this.ClusterEVCManager.CheckConfigureEvcMode_Task.apply( this, arguments ).catch(e => e); }
  CheckCustomizationResources() { return this.CustomizationSpecManager.CheckCustomizationResources.apply( this, arguments ).catch(e => e); }
  CheckCustomizationSpec() { return this.VirtualMachine.CheckCustomizationSpec.apply( this, arguments ).catch(e => e); }
  CheckForUpdates() { return this.PropertyCollector.CheckForUpdates.apply( this, arguments ).catch(e => e); }
  CheckHostPatch_Task() { return this.HostPatchManager.CheckHostPatch_Task.apply( this, arguments ).catch(e => e); }
  CheckInstantClone_Task() { return this.VirtualMachineProvisioningChecker.CheckInstantClone_Task.apply( this, arguments ).catch(e => e); }
  CheckLicenseFeature() { return this.LicenseManager.CheckLicenseFeature.apply( this, arguments ).catch(e => e); }
  CheckMigrate_Task() { return this.VirtualMachineProvisioningChecker.CheckMigrate_Task.apply( this, arguments ).catch(e => e); }
  CheckPowerOn_Task() { return this.VirtualMachineCompatibilityChecker.CheckPowerOn_Task.apply( this, arguments ).catch(e => e); }
  CheckProfileCompliance_Task() { return this.Profile.CheckProfileCompliance_Task.apply( this, arguments ).catch(e => e); }
  CheckRelocate_Task() { return this.VirtualMachineProvisioningChecker.CheckRelocate_Task.apply( this, arguments ).catch(e => e); }
  CheckVmConfig_Task() { return this.VirtualMachineCompatibilityChecker.CheckVmConfig_Task.apply( this, arguments ).catch(e => e); }
  ClearComplianceStatus() { return this.ProfileComplianceManager.ClearComplianceStatus.apply( this, arguments ).catch(e => e); }
  ClearNFSUser() { return this.HostStorageSystem.ClearNFSUser.apply( this, arguments ).catch(e => e); }
  ClearSystemEventLog() { return this.HostHealthStatusSystem.ClearSystemEventLog.apply( this, arguments ).catch(e => e); }
  ClearTriggeredAlarms() { return this.AlarmManager.ClearTriggeredAlarms.apply( this, arguments ).catch(e => e); }
  ClearVStorageObjectControlFlags() { return this.VcenterVStorageObjectManager.ClearVStorageObjectControlFlags.apply( this, arguments ).catch(e => e); }
  CloneSession() { return this.SessionManager.CloneSession.apply( this, arguments ).catch(e => e); }
  CloneVApp_Task() { return this.VirtualApp.CloneVApp_Task.apply( this, arguments ).catch(e => e); }
  CloneVM_Task(connectionData: ConnectionData,
               managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
               managedFolder: ManagedObjectReference & { $type: 'Folder' },
               name: string,
               spec: VirtualMachineCloneSpec,
               returnOnTaskFinish: boolean = true) { return this.VirtualMachine.CloneVM_Task.apply( this, arguments ).catch(e => e); }
  CloneVStorageObject_Task() { return this.VcenterVStorageObjectManager.CloneVStorageObject_Task.apply( this, arguments ).catch(e => e); }
  CloseInventoryViewFolder() { return this.InventoryView.CloseInventoryViewFolder.apply( this, arguments ).catch(e => e); }
  ClusterEnterMaintenanceMode() { return this.ClusterComputeResource.ClusterEnterMaintenanceMode.apply( this, arguments ).catch(e => e); }
  CompositeHostProfile_Task() { return this.HostProfileManager.CompositeHostProfile_Task.apply( this, arguments ).catch(e => e); }
  ComputeDiskPartitionInfo() { return this.HostStorageSystem.ComputeDiskPartitionInfo.apply( this, arguments ).catch(e => e); }
  ComputeDiskPartitionInfoForResize() { return this.HostStorageSystem.ComputeDiskPartitionInfoForResize.apply( this, arguments ).catch(e => e); }
  ConfigureCryptoKey() { return this.HostSystem.ConfigureCryptoKey.apply( this, arguments ).catch(e => e); }
  ConfigureDatastoreIORM_Task() { return this.StorageResourceManager.ConfigureDatastoreIORM_Task.apply( this, arguments ).catch(e => e); }
  ConfigureDatastorePrincipal() { return this.HostDatastoreSystem.ConfigureDatastorePrincipal.apply( this, arguments ).catch(e => e); }
  ConfigureEvcMode_Task() { return this.ClusterEVCManager.ConfigureEvcMode_Task.apply( this, arguments ).catch(e => e); }
  ConfigureHostCache_Task() { return this.HostCacheConfigurationManager.ConfigureHostCache_Task.apply( this, arguments ).catch(e => e); }
  ConfigureLicenseSource() { return this.LicenseManager.ConfigureLicenseSource.apply( this, arguments ).catch(e => e); }
  ConfigurePowerPolicy() { return this.HostPowerSystem.ConfigurePowerPolicy.apply( this, arguments ).catch(e => e); }
  ConfigureStorageDrsForPod_Task() { return this.StorageResourceManager.ConfigureStorageDrsForPod_Task.apply( this, arguments ).catch(e => e); }
  configureVcha_Task() { return this.FailoverClusterConfigurator.configureVcha_Task.apply( this, arguments ).catch(e => e); }
  ConfigureVFlashResourceEx_Task() { return this.HostVFlashManager.ConfigureVFlashResourceEx_Task.apply( this, arguments ).catch(e => e); }
  ConsolidateVMDisks_Task() { return this.VirtualMachine.ConsolidateVMDisks_Task.apply( this, arguments ).catch(e => e); }
  ContinueRetrievePropertiesEx() { return this.PropertyCollector.ContinueRetrievePropertiesEx.apply( this, arguments ).catch(e => e); }
  ConvertNamespacePathToUuidPath() { return this.DatastoreNamespaceManager.ConvertNamespacePathToUuidPath.apply( this, arguments ).catch(e => e); }
  CopyDatastoreFile_Task(connectionData: ConnectionData,
                         srcDatastoreName: string,
                         srcPath: string,
                         srcDatacenter: ManagedObjectReference & { $type: 'Datacenter' },
                         dstDatastoreName: string,
                         dstPath: string,
                         dstDatacenter: ManagedObjectReference & { $type: 'Datacenter' },
                         force: boolean = false,
                         returnOnTaskFinish: boolean = true) { return this.FileManager.CopyDatastoreFile_Task.apply( this, arguments ).catch(e => e); }
  CopyVirtualDisk_Task() { return this.VirtualDiskManager.CopyVirtualDisk_Task.apply( this, arguments ).catch(e => e); }
  CreateAlarm() { return this.AlarmManager.CreateAlarm.apply( this, arguments ).catch(e => e); }
  CreateChildVM_Task() { return this.ResourcePool.CreateChildVM_Task.apply( this, arguments ).catch(e => e); }
  CreateCluster() { return this.Folder.CreateCluster.apply( this, arguments ).catch(e => e); }
  CreateClusterEx() { return this.Folder.CreateClusterEx.apply( this, arguments ).catch(e => e); }
  CreateCollectorForEvents() { return this.EventManager.CreateCollectorForEvents.apply( this, arguments ).catch(e => e); }
  CreateCollectorForTasks(connectionData: ConnectionData,
                          filter: TaskFilterSpec) { return this.TaskManager.CreateCollectorForTasks.apply( this, arguments ).catch(e => e); }
  CreateContainerView() { return this.ViewManager.CreateContainerView.apply( this, arguments ).catch(e => e); }
  CreateCustomizationSpec() { return this.CustomizationSpecManager.CreateCustomizationSpec.apply( this, arguments ).catch(e => e); }
  CreateDatacenter() { return this.Folder.CreateDatacenter.apply( this, arguments ).catch(e => e); }
  CreateDefaultProfile() { return this.HostProfileManager.CreateDefaultProfile.apply( this, arguments ).catch(e => e); }
  CreateDescriptor() { return this.OvfManager.CreateDescriptor.apply( this, arguments ).catch(e => e); }
  CreateDiagnosticPartition() { return this.HostDiagnosticSystem.CreateDiagnosticPartition.apply( this, arguments ).catch(e => e); }
  CreateDirectory() { return this.DatastoreNamespaceManager.CreateDirectory.apply( this, arguments ).catch(e => e); }
  CreateDisk_Task() { return this.VcenterVStorageObjectManager.CreateDisk_Task.apply( this, arguments ).catch(e => e); }
  CreateDiskFromSnapshot_Task() { return this.VcenterVStorageObjectManager.CreateDiskFromSnapshot_Task.apply( this, arguments ).catch(e => e); }
  CreateDVPortgroup_Task() { return this.DistributedVirtualSwitch.CreateDVPortgroup_Task.apply( this, arguments ).catch(e => e); }
  CreateDVS_Task() { return this.Folder.CreateDVS_Task.apply( this, arguments ).catch(e => e); }
  CreateFilter(connectionData: ConnectionData,
               spec: PropertyFilterSpec,
               partialUpdates: boolean) { return this.PropertyCollector.CreateFilter.apply( this, arguments ).catch(e => e); }
  CreateFolder() { return this.Folder.CreateFolder.apply( this, arguments ).catch(e => e); }
  CreateGroup() { return this.HostLocalAccountManager.CreateGroup.apply( this, arguments ).catch(e => e); }
  CreateImportSpec() { return this.OvfManager.CreateImportSpec.apply( this, arguments ).catch(e => e); }
  CreateInventoryView() { return this.ViewManager.CreateInventoryView.apply( this, arguments ).catch(e => e); }
  CreateIpPool() { return this.IpPoolManager.CreateIpPool.apply( this, arguments ).catch(e => e); }
  CreateListView() { return this.ViewManager.CreateListView.apply( this, arguments ).catch(e => e); }
  CreateListViewFromView() { return this.ViewManager.CreateListViewFromView.apply( this, arguments ).catch(e => e); }
  CreateLocalDatastore() { return this.HostDatastoreSystem.CreateLocalDatastore.apply( this, arguments ).catch(e => e); }
  CreateNasDatastore(connectionData: ConnectionData,
                     managedDatstoreSystem: ManagedObjectReference & { $type: 'HostDatastoreSystem' },
                     spec: HostNasVolumeSpec) { return this.HostDatastoreSystem.CreateNasDatastore.apply( this, arguments ).catch(e => e); }
  CreateNvdimmNamespace_Task() { return this.HostNvdimmSystem.CreateNvdimmNamespace_Task.apply( this, arguments ).catch(e => e); }
  CreateObjectScheduledTask() { return this.ScheduledTaskManager.CreateObjectScheduledTask.apply( this, arguments ).catch(e => e); }
  createPassiveNode_Task() { return this.FailoverClusterConfigurator.createPassiveNode_Task.apply( this, arguments ).catch(e => e); }
  CreatePerfInterval() { return this.PerformanceManager.CreatePerfInterval.apply( this, arguments ).catch(e => e); }
  CreateProfile() { return this.ProfileManager.CreateProfile.apply( this, arguments ).catch(e => e); }
  CreatePropertyCollector() { return this.PropertyCollector.CreatePropertyCollector.apply( this, arguments ).catch(e => e); }
  CreateRegistryKeyInGuest() { return this.GuestWindowsRegistryManager.CreateRegistryKeyInGuest.apply( this, arguments ).catch(e => e); }
  CreateResourcePool() { return this.ResourcePool.CreateResourcePool.apply( this, arguments ).catch(e => e); }
  CreateScheduledTask() { return this.ScheduledTaskManager.CreateScheduledTask.apply( this, arguments ).catch(e => e); }
  CreateScreenshot_Task() { return this.VirtualMachine.CreateScreenshot_Task.apply( this, arguments ).catch(e => e); }
  CreateSecondaryVM_Task() { return this.VirtualMachine.CreateSecondaryVM_Task.apply( this, arguments ).catch(e => e); }
  CreateSecondaryVMEx_Task() { return this.VirtualMachine.CreateSecondaryVMEx_Task.apply( this, arguments ).catch(e => e); }
  CreateSnapshot_Task(connectionData: ConnectionData,
                      managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
                      name: string,
                      memory: boolean,
                      quiesce: boolean,
                      description?: string,
                      returnOnTaskFinish: boolean = true) { return this.VirtualMachine.CreateSnapshot_Task.apply( this, arguments ).catch(e => e); }
  CreateSnapshotEx_Task() { return this.VirtualMachine.CreateSnapshotEx_Task.apply( this, arguments ).catch(e => e); }
  CreateStoragePod() { return this.Folder.CreateStoragePod.apply( this, arguments ).catch(e => e); }
  CreateTask(connectionData: ConnectionData,
             managedTask: ManagedObjectReference & { $type: 'Task' },
             taskTypeId: string,
             initiatedBy: string = 'SysOS Administrator',
             cancelable: boolean = false,
             parentTaskKey?: string,
             activationId?: string) { return this.TaskManager.CreateTask.apply( this, arguments ).catch(e => e); }
  CreateTemporaryDirectoryInGuest() { return this.GuestFileManager.CreateTemporaryDirectoryInGuest.apply( this, arguments ).catch(e => e); }
  CreateTemporaryFileInGuest() { return this.GuestFileManager.CreateTemporaryFileInGuest.apply( this, arguments ).catch(e => e); }
  CreateUser() { return this.HostLocalAccountManager.CreateUser.apply( this, arguments ).catch(e => e); }
  CreateVApp() { return this.ResourcePool.CreateVApp.apply( this, arguments ).catch(e => e); }
  CreateVirtualDisk_Task() { return this.VirtualDiskManager.CreateVirtualDisk_Task.apply( this, arguments ).catch(e => e); }
  CreateVM_Task() { return this.Folder.CreateVM_Task.apply( this, arguments ).catch(e => e); }
  CreateVmfsDatastore() { return this.HostDatastoreSystem.CreateVmfsDatastore.apply( this, arguments ).catch(e => e); }
  CreateVvolDatastore() { return this.HostDatastoreSystem.CreateVvolDatastore.apply( this, arguments ).catch(e => e); }
  createWitnessNode_Task() { return this.FailoverClusterConfigurator.createWitnessNode_Task.apply( this, arguments ).catch(e => e); }
  CryptoManagerHostEnable() { return this.CryptoManagerHost.CryptoManagerHostEnable.apply( this, arguments ).catch(e => e); }
  CryptoManagerHostPrepare() { return this.CryptoManagerHost.CryptoManagerHostPrepare.apply( this, arguments ).catch(e => e); }
  CryptoUnlock_Task() { return this.VirtualMachine.CryptoUnlock_Task.apply( this, arguments ).catch(e => e); }
  CurrentTime() { return this.ServiceInstance.CurrentTime.apply( this, arguments ).catch(e => e); }
  CustomizationSpecItemToXml() { return this.CustomizationSpecManager.CustomizationSpecItemToXml.apply( this, arguments ).catch(e => e); }
  CustomizeVM_Task() { return this.VirtualMachine.CustomizeVM_Task.apply( this, arguments ).catch(e => e); }
  DatastoreEnterMaintenanceMode() { return this.Datastore.DatastoreEnterMaintenanceMode.apply( this, arguments ).catch(e => e); }
  DatastoreExitMaintenanceMode_Task() { return this.Datastore.DatastoreExitMaintenanceMode_Task.apply( this, arguments ).catch(e => e); }
  DecodeLicense() { return this.LicenseManager.DecodeLicense.apply( this, arguments ).catch(e => e); }
  DefragmentAllDisks() { return this.VirtualMachine.DefragmentAllDisks.apply( this, arguments ).catch(e => e); }
  DefragmentVirtualDisk_Task() { return this.VirtualDiskManager.DefragmentVirtualDisk_Task.apply( this, arguments ).catch(e => e); }
  DeleteCustomizationSpec() { return this.CustomizationSpecManager.DeleteCustomizationSpec.apply( this, arguments ).catch(e => e); }
  DeleteDatastoreFile_Task(connectionData: ConnectionData,
                           datastoreName: string,
                           path: string,
                           managedDatacenter: ManagedObjectReference & { $type: 'Datacenter' },
                           returnOnTaskFinish: boolean = true) { return this.FileManager.DeleteDatastoreFile_Task.apply( this, arguments ).catch(e => e); }
  DeleteDirectory() { return this.DatastoreNamespaceManager.DeleteDirectory.apply( this, arguments ).catch(e => e); }
  DeleteDirectoryInGuest() { return this.GuestFileManager.DeleteDirectoryInGuest.apply( this, arguments ).catch(e => e); }
  DeleteFile() { return this.HostDatastoreBrowser.DeleteFile.apply( this, arguments ).catch(e => e); }
  DeleteFileInGuest() { return this.GuestFileManager.DeleteFileInGuest.apply( this, arguments ).catch(e => e); }
  DeleteHostSpecification() { return this.HostSpecificationManager.DeleteHostSpecification.apply( this, arguments ).catch(e => e); }
  DeleteHostSubSpecification() { return this.HostSpecificationManager.DeleteHostSubSpecification.apply( this, arguments ).catch(e => e); }
  DeleteNvdimmBlockNamespaces_Task() { return this.HostNvdimmSystem.DeleteNvdimmBlockNamespaces_Task.apply( this, arguments ).catch(e => e); }
  DeleteNvdimmNamespace_Task() { return this.HostNvdimmSystem.DeleteNvdimmNamespace_Task.apply( this, arguments ).catch(e => e); }
  DeleteRegistryKeyInGuest() { return this.GuestWindowsRegistryManager.DeleteRegistryKeyInGuest.apply( this, arguments ).catch(e => e); }
  DeleteRegistryValueInGuest() { return this.GuestWindowsRegistryManager.DeleteRegistryValueInGuest.apply( this, arguments ).catch(e => e); }
  DeleteScsiLunState() { return this.HostStorageSystem.DeleteScsiLunState.apply( this, arguments ).catch(e => e); }
  DeleteSnapshot_Task() { return this.VcenterVStorageObjectManager.DeleteSnapshot_Task.apply( this, arguments ).catch(e => e); }
  DeleteVffsVolumeState() { return this.HostStorageSystem.DeleteVffsVolumeState.apply( this, arguments ).catch(e => e); }
  DeleteVirtualDisk_Task() { return this.VirtualDiskManager.DeleteVirtualDisk_Task.apply( this, arguments ).catch(e => e); }
  DeleteVmfsVolumeState() { return this.HostStorageSystem.DeleteVmfsVolumeState.apply( this, arguments ).catch(e => e); }
  DeleteVsanObjects() { return this.HostVsanInternalSystem.DeleteVsanObjects.apply( this, arguments ).catch(e => e); }
  DeleteVStorageObject_Task() { return this.VcenterVStorageObjectManager.DeleteVStorageObject_Task.apply( this, arguments ).catch(e => e); }
  deployVcha_Task() { return this.FailoverClusterConfigurator.deployVcha_Task.apply( this, arguments ).catch(e => e); }
  DeselectVnic() { return this.HostVMotionSystem.DeselectVnic.apply( this, arguments ).catch(e => e); }
  DeselectVnicForNicType() { return this.HostVirtualNicManager.DeselectVnicForNicType.apply( this, arguments ).catch(e => e); }
  Destroy_Task() { return this.ManagedEntity.Destroy_Task.apply( this, arguments ).catch(e => e); }
  DestroyChildren() { return this.ResourcePool.DestroyChildren.apply( this, arguments ).catch(e => e); }
  DestroyCollector() { return this.HistoryCollector.DestroyCollector.apply( this, arguments ).catch(e => e); }
  DestroyDatastore() { return this.Datastore.DestroyDatastore.apply( this, arguments ).catch(e => e); }
  DestroyIpPool() { return this.IpPoolManager.DestroyIpPool.apply( this, arguments ).catch(e => e); }
  DestroyNetwork() { return this.Network.DestroyNetwork.apply( this, arguments ).catch(e => e); }
  DestroyProfile() { return this.Profile.DestroyProfile.apply( this, arguments ).catch(e => e); }
  DestroyPropertyCollector() { return this.PropertyCollector.DestroyPropertyCollector.apply( this, arguments ).catch(e => e); }
  DestroyPropertyFilter() { return this.PropertyFilter.DestroyPropertyFilter.apply( this, arguments ).catch(e => e); }
  destroyVcha_Task() { return this.FailoverClusterConfigurator.destroyVcha_Task.apply( this, arguments ).catch(e => e); }
  DestroyVffs() { return this.HostStorageSystem.DestroyVffs.apply( this, arguments ).catch(e => e); }
  DestroyView() { return this.View.DestroyView.apply( this, arguments ).catch(e => e); }
  DetachDisk_Task() { return this.VirtualMachine.DetachDisk_Task.apply( this, arguments ).catch(e => e); }
  DetachScsiLun() { return this.HostStorageSystem.DetachScsiLun.apply( this, arguments ).catch(e => e); }
  DetachScsiLunEx_Task() { return this.HostStorageSystem.DetachScsiLunEx_Task.apply( this, arguments ).catch(e => e); }
  DetachTagFromVStorageObject() { return this.VcenterVStorageObjectManager.DetachTagFromVStorageObject.apply( this, arguments ).catch(e => e); }
  DisableEvcMode_Task() { return this.ClusterEVCManager.DisableEvcMode_Task.apply( this, arguments ).catch(e => e); }
  DisableFeature() { return this.LicenseManager.DisableFeature.apply( this, arguments ).catch(e => e); }
  DisableHyperThreading() { return this.HostCpuSchedulerSystem.DisableHyperThreading.apply( this, arguments ).catch(e => e); }
  DisableMultipathPath() { return this.HostStorageSystem.DisableMultipathPath.apply( this, arguments ).catch(e => e); }
  DisableRuleset() { return this.HostFirewallSystem.DisableRuleset.apply( this, arguments ).catch(e => e); }
  DisableSecondaryVM_Task() { return this.VirtualMachine.DisableSecondaryVM_Task.apply( this, arguments ).catch(e => e); }
  DisableSmartCardAuthentication() { return this.HostActiveDirectoryAuthentication.DisableSmartCardAuthentication.apply( this, arguments ).catch(e => e); }
  DisconnectHost_Task() { return this.HostSystem.DisconnectHost_Task.apply( this, arguments ).catch(e => e); }
  DiscoverFcoeHbas() { return this.HostStorageSystem.DiscoverFcoeHbas.apply( this, arguments ).catch(e => e); }
  DissociateProfile() { return this.Profile.DissociateProfile.apply( this, arguments ).catch(e => e); }
  DoesCustomizationSpecExist() { return this.CustomizationSpecManager.DoesCustomizationSpecExist.apply( this, arguments ).catch(e => e); }
  DuplicateCustomizationSpec() { return this.CustomizationSpecManager.DuplicateCustomizationSpec.apply( this, arguments ).catch(e => e); }
  DVPortgroupRollback_Task() { return this.DistributedVirtualPortgroup.DVPortgroupRollback_Task.apply( this, arguments ).catch(e => e); }
  DVSManagerExportEntity_Task() { return this.DistributedVirtualSwitchManager.DVSManagerExportEntity_Task.apply( this, arguments ).catch(e => e); }
  DVSManagerImportEntity_Task() { return this.DistributedVirtualSwitchManager.DVSManagerImportEntity_Task.apply( this, arguments ).catch(e => e); }
  DVSManagerLookupDvPortGroup() { return this.DistributedVirtualSwitchManager.DVSManagerLookupDvPortGroup.apply( this, arguments ).catch(e => e); }
  DvsReconfigureVmVnicNetworkResourcePool_Task() { return this.DistributedVirtualSwitch.DvsReconfigureVmVnicNetworkResourcePool_Task.apply( this, arguments ).catch(e => e); }
  DVSRollback_Task() { return this.DistributedVirtualSwitch.DVSRollback_Task.apply( this, arguments ).catch(e => e); }
  EagerZeroVirtualDisk_Task() { return this.VirtualDiskManager.EagerZeroVirtualDisk_Task.apply( this, arguments ).catch(e => e); }
  EnableAlarmActions() { return this.AlarmManager.EnableAlarmActions.apply( this, arguments ).catch(e => e); }
  EnableCrypto() { return this.HostSystem.EnableCrypto.apply( this, arguments ).catch(e => e); }
  EnableFeature() { return this.LicenseManager.EnableFeature.apply( this, arguments ).catch(e => e); }
  EnableHyperThreading() { return this.HostCpuSchedulerSystem.EnableHyperThreading.apply( this, arguments ).catch(e => e); }
  EnableMultipathPath() { return this.HostStorageSystem.EnableMultipathPath.apply( this, arguments ).catch(e => e); }
  EnableNetworkResourceManagement() { return this.DistributedVirtualSwitch.EnableNetworkResourceManagement.apply( this, arguments ).catch(e => e); }
  EnableRuleset() { return this.HostFirewallSystem.EnableRuleset.apply( this, arguments ).catch(e => e); }
  EnableSecondaryVM_Task() { return this.VirtualMachine.EnableSecondaryVM_Task.apply( this, arguments ).catch(e => e); }
  EnableSmartCardAuthentication() { return this.HostActiveDirectoryAuthentication.EnableSmartCardAuthentication.apply( this, arguments ).catch(e => e); }
  EnterLockdownMode() { return this.HostSystem.EnterLockdownMode.apply( this, arguments ).catch(e => e); }
  EnterMaintenanceMode_Task() { return this.HostSystem.EnterMaintenanceMode_Task.apply( this, arguments ).catch(e => e); }
  EstimateDatabaseSize() { return this.ResourcePlanningManager.EstimateDatabaseSize.apply( this, arguments ).catch(e => e); }
  EstimateStorageForConsolidateSnapshots_Task() { return this.VirtualMachine.EstimateStorageForConsolidateSnapshots_Task.apply( this, arguments ).catch(e => e); }
  EsxAgentHostManagerUpdateConfig() { return this.HostEsxAgentHostManager.EsxAgentHostManagerUpdateConfig.apply( this, arguments ).catch(e => e); }
  EvacuateVsanNode_Task() { return this.HostVsanSystem.EvacuateVsanNode_Task.apply( this, arguments ).catch(e => e); }
  EvcManager() { return this.ClusterComputeResource.EvcManager.apply( this, arguments ).catch(e => e); }
  ExecuteHostProfile() { return this.HostProfile.ExecuteHostProfile.apply( this, arguments ).catch(e => e); }
  ExecuteSimpleCommand() { return this.SimpleCommand.ExecuteSimpleCommand.apply( this, arguments ).catch(e => e); }
  ExitLockdownMode() { return this.HostSystem.ExitLockdownMode.apply( this, arguments ).catch(e => e); }
  ExitMaintenanceMode_Task() { return this.HostSystem.ExitMaintenanceMode_Task.apply( this, arguments ).catch(e => e); }
  ExpandVmfsDatastore() { return this.HostDatastoreSystem.ExpandVmfsDatastore.apply( this, arguments ).catch(e => e); }
  ExpandVmfsExtent() { return this.HostStorageSystem.ExpandVmfsExtent.apply( this, arguments ).catch(e => e); }
  ExportAnswerFile_Task() { return this.HostProfileManager.ExportAnswerFile_Task.apply( this, arguments ).catch(e => e); }
  ExportProfile() { return this.Profile.ExportProfile.apply( this, arguments ).catch(e => e); }
  ExportSnapshot() { return this.VirtualMachineSnapshot.ExportSnapshot.apply( this, arguments ).catch(e => e); }
  ExportVApp() { return this.VirtualApp.ExportVApp.apply( this, arguments ).catch(e => e); }
  ExportVm() { return this.VirtualMachine.ExportVm.apply( this, arguments ).catch(e => e); }
  ExtendDisk_Task() { return this.VcenterVStorageObjectManager.ExtendDisk_Task.apply( this, arguments ).catch(e => e); }
  ExtendVffs() { return this.HostStorageSystem.ExtendVffs.apply( this, arguments ).catch(e => e); }
  ExtendVirtualDisk_Task() { return this.VirtualDiskManager.ExtendVirtualDisk_Task.apply( this, arguments ).catch(e => e); }
  ExtendVmfsDatastore() { return this.HostDatastoreSystem.ExtendVmfsDatastore.apply( this, arguments ).catch(e => e); }
  ExtractOvfEnvironment() { return this.VirtualMachine.ExtractOvfEnvironment.apply( this, arguments ).catch(e => e); }
  FetchDVPortKeys() { return this.DistributedVirtualSwitch.FetchDVPortKeys.apply( this, arguments ).catch(e => e); }
  FetchDVPorts() { return this.DistributedVirtualSwitch.FetchDVPorts.apply( this, arguments ).catch(e => e); }
  fetchSoftwarePackages() { return this.HostImageConfigManager.fetchSoftwarePackages.apply( this, arguments ).catch(e => e); }
  FetchSystemEventLog() { return this.HostHealthStatusSystem.FetchSystemEventLog.apply( this, arguments ).catch(e => e); }
  FetchUserPrivilegeOnEntities() { return this.AuthorizationManager.FetchUserPrivilegeOnEntities.apply( this, arguments ).catch(e => e); }
  FindAllByDnsName() { return this.SearchIndex.FindAllByDnsName.apply( this, arguments ).catch(e => e); }
  FindAllByIp() { return this.SearchIndex.FindAllByIp.apply( this, arguments ).catch(e => e); }
  FindAllByUuid() { return this.SearchIndex.FindAllByUuid.apply( this, arguments ).catch(e => e); }
  FindAssociatedProfile() { return this.ProfileManager.FindAssociatedProfile.apply( this, arguments ).catch(e => e); }
  FindByDatastorePath() { return this.SearchIndex.FindByDatastorePath.apply( this, arguments ).catch(e => e); }
  FindByDnsName() { return this.SearchIndex.FindByDnsName.apply( this, arguments ).catch(e => e); }
  FindByInventoryPath() { return this.SearchIndex.FindByInventoryPath.apply( this, arguments ).catch(e => e); }
  FindByIp() { return this.SearchIndex.FindByIp.apply( this, arguments ).catch(e => e); }
  FindByUuid(connectionData: ConnectionData,
             uuid: string,
             vmSearch: boolean,
             instanceUuid?: boolean,
             managedDatacenter?: ManagedObjectReference & { $type: 'Datacenter' }) { return this.SearchIndex.FindByUuid.apply( this, arguments ).catch(e => e); }
  FindChild() { return this.SearchIndex.FindChild.apply( this, arguments ).catch(e => e); }
  FindExtension(connectionData: ConnectionData,
                extensionKey: string) { return this.ExtensionManager.FindExtension(connectionData, extensionKey); }
  FindRulesForVm() { return this.ClusterComputeResource.FindRulesForVm.apply( this, arguments ).catch(e => e); }
  FormatVffs() { return this.HostStorageSystem.FormatVffs.apply( this, arguments ).catch(e => e); }
  FormatVmfs() { return this.HostStorageSystem.FormatVmfs.apply( this, arguments ).catch(e => e); }
  GenerateCertificateSigningRequest() { return this.HostCertificateManager.GenerateCertificateSigningRequest.apply( this, arguments ).catch(e => e); }
  GenerateCertificateSigningRequestByDn() { return this.HostCertificateManager.GenerateCertificateSigningRequestByDn.apply( this, arguments ).catch(e => e); }
  GenerateClientCsr() { return this.CryptoManagerKmip.GenerateClientCsr.apply( this, arguments ).catch(e => e); }
  GenerateConfigTaskList() { return this.HostProfileManager.GenerateConfigTaskList.apply( this, arguments ).catch(e => e); }
  GenerateHostConfigTaskSpec_Task() { return this.HostProfileManager.GenerateHostConfigTaskSpec_Task.apply( this, arguments ).catch(e => e); }
  GenerateHostProfileTaskList_Task() { return this.HostProfileManager.GenerateHostProfileTaskList_Task.apply( this, arguments ).catch(e => e); }
  GenerateKey() { return this.CryptoManagerKmip.GenerateKey.apply( this, arguments ).catch(e => e); }
  GenerateLogBundles_Task() { return this.DiagnosticManager.GenerateLogBundles_Task.apply( this, arguments ).catch(e => e); }
  GenerateSelfSignedClientCert() { return this.CryptoManagerKmip.GenerateSelfSignedClientCert.apply( this, arguments ).catch(e => e); }
  GetAlarm() { return this.AlarmManager.GetAlarm.apply( this, arguments ).catch(e => e); }
  GetAlarmState() { return this.AlarmManager.GetAlarmState.apply( this, arguments ).catch(e => e); }
  getClusterMode() { return this.FailoverClusterManager.getClusterMode.apply( this, arguments ).catch(e => e); }
  GetCustomizationSpec() { return this.CustomizationSpecManager.GetCustomizationSpec.apply( this, arguments ).catch(e => e); }
  GetPublicKey() { return this.ExtensionManager.GetPublicKey.apply( this, arguments ).catch(e => e); }
  GetResourceUsage() { return this.ClusterComputeResource.GetResourceUsage.apply( this, arguments ).catch(e => e); }
  GetVchaClusterHealth() { return this.FailoverClusterManager.GetVchaClusterHealth.apply( this, arguments ).catch(e => e); }
  getVchaConfig() { return this.FailoverClusterConfigurator.getVchaConfig.apply( this, arguments ).catch(e => e); }
  GetVsanObjExtAttrs() { return this.HostVsanInternalSystem.GetVsanObjExtAttrs.apply( this, arguments ).catch(e => e); }
  HasMonitoredEntity() { return this.HealthUpdateManager.HasMonitoredEntity.apply( this, arguments ).catch(e => e); }
  HasPrivilegeOnEntities() { return this.AuthorizationManager.HasPrivilegeOnEntities.apply( this, arguments ).catch(e => e); }
  HasPrivilegeOnEntity() { return this.AuthorizationManager.HasPrivilegeOnEntity.apply( this, arguments ).catch(e => e); }
  HasProvider() { return this.HealthUpdateManager.HasProvider.apply( this, arguments ).catch(e => e); }
  HasUserPrivilegeOnEntities() { return this.AuthorizationManager.HasUserPrivilegeOnEntities.apply( this, arguments ).catch(e => e); }
  HostClearVStorageObjectControlFlags() { return this.HostVStorageObjectManager.HostClearVStorageObjectControlFlags.apply( this, arguments ).catch(e => e); }
  HostCloneVStorageObject_Task() { return this.HostVStorageObjectManager.HostCloneVStorageObject_Task.apply( this, arguments ).catch(e => e); }
  HostConfigureVFlashResource() { return this.HostVFlashManager.HostConfigureVFlashResource.apply( this, arguments ).catch(e => e); }
  HostConfigVFlashCache() { return this.HostVFlashManager.HostConfigVFlashCache.apply( this, arguments ).catch(e => e); }
  HostCreateDisk_Task() { return this.HostVStorageObjectManager.HostCreateDisk_Task.apply( this, arguments ).catch(e => e); }
  HostDeleteVStorageObject_Task() { return this.HostVStorageObjectManager.HostDeleteVStorageObject_Task.apply( this, arguments ).catch(e => e); }
  HostExtendDisk_Task() { return this.HostVStorageObjectManager.HostExtendDisk_Task.apply( this, arguments ).catch(e => e); }
  HostGetVFlashModuleDefaultConfig() { return this.HostVFlashManager.HostGetVFlashModuleDefaultConfig.apply( this, arguments ).catch(e => e); }
  HostImageConfigGetAcceptance() { return this.HostImageConfigManager.HostImageConfigGetAcceptance.apply( this, arguments ).catch(e => e); }
  HostImageConfigGetProfile() { return this.HostImageConfigManager.HostImageConfigGetProfile.apply( this, arguments ).catch(e => e); }
  HostInflateDisk_Task() { return this.HostVStorageObjectManager.HostInflateDisk_Task.apply( this, arguments ).catch(e => e); }
  HostListVStorageObject() { return this.HostVStorageObjectManager.HostListVStorageObject.apply( this, arguments ).catch(e => e); }
  HostProfileResetValidationState() { return this.HostProfile.HostProfileResetValidationState.apply( this, arguments ).catch(e => e); }
  HostReconcileDatastoreInventory_Task() { return this.HostVStorageObjectManager.HostReconcileDatastoreInventory_Task.apply( this, arguments ).catch(e => e); }
  HostRegisterDisk() { return this.HostVStorageObjectManager.HostRegisterDisk.apply( this, arguments ).catch(e => e); }
  HostRelocateVStorageObject_Task() { return this.HostVStorageObjectManager.HostRelocateVStorageObject_Task.apply( this, arguments ).catch(e => e); }
  HostRemoveVFlashResource() { return this.HostVFlashManager.HostRemoveVFlashResource.apply( this, arguments ).catch(e => e); }
  HostRenameVStorageObject() { return this.HostVStorageObjectManager.HostRenameVStorageObject.apply( this, arguments ).catch(e => e); }
  HostRetrieveVStorageInfrastructureObjectPolicy() { return this.HostVStorageObjectManager.HostRetrieveVStorageInfrastructureObjectPolicy.apply( this, arguments ).catch(e => e); }
  HostRetrieveVStorageObject() { return this.HostVStorageObjectManager.HostRetrieveVStorageObject.apply( this, arguments ).catch(e => e); }
  HostRetrieveVStorageObjectState() { return this.HostVStorageObjectManager.HostRetrieveVStorageObjectState.apply( this, arguments ).catch(e => e); }
  HostScheduleReconcileDatastoreInventory() { return this.HostVStorageObjectManager.HostScheduleReconcileDatastoreInventory.apply( this, arguments ).catch(e => e); }
  HostSetVStorageObjectControlFlags() { return this.HostVStorageObjectManager.HostSetVStorageObjectControlFlags.apply( this, arguments ).catch(e => e); }
  HostSpecGetUpdatedHosts() { return this.HostSpecificationManager.HostSpecGetUpdatedHosts.apply( this, arguments ).catch(e => e); }
  HostVStorageObjectCreateDiskFromSnapshot_Task() { return this.HostVStorageObjectManager.HostVStorageObjectCreateDiskFromSnapshot_Task.apply( this, arguments ).catch(e => e); }
  HostVStorageObjectCreateSnapshot_Task() { return this.HostVStorageObjectManager.HostVStorageObjectCreateSnapshot_Task.apply( this, arguments ).catch(e => e); }
  HostVStorageObjectDeleteSnapshot_Task() { return this.HostVStorageObjectManager.HostVStorageObjectDeleteSnapshot_Task.apply( this, arguments ).catch(e => e); }
  HostVStorageObjectRetrieveSnapshotInfo() { return this.HostVStorageObjectManager.HostVStorageObjectRetrieveSnapshotInfo.apply( this, arguments ).catch(e => e); }
  HostVStorageObjectRevert_Task() { return this.HostVStorageObjectManager.HostVStorageObjectRevert_Task.apply( this, arguments ).catch(e => e); }
  HttpNfcLeaseAbort() { return this.HttpNfcLease.HttpNfcLeaseAbort.apply( this, arguments ).catch(e => e); }
  HttpNfcLeaseComplete() { return this.HttpNfcLease.HttpNfcLeaseComplete.apply( this, arguments ).catch(e => e); }
  HttpNfcLeaseGetManifest() { return this.HttpNfcLease.HttpNfcLeaseGetManifest.apply( this, arguments ).catch(e => e); }
  HttpNfcLeaseProgress() { return this.HttpNfcLease.HttpNfcLeaseProgress.apply( this, arguments ).catch(e => e); }
  HttpNfcLeasePullFromUrls_Task() { return this.HttpNfcLease.HttpNfcLeasePullFromUrls_Task.apply( this, arguments ).catch(e => e); }
  HttpNfcLeaseSetManifestChecksumType() { return this.HttpNfcLease.HttpNfcLeaseSetManifestChecksumType.apply( this, arguments ).catch(e => e); }
  ImpersonateUser() { return this.SessionManager.ImpersonateUser.apply( this, arguments ).catch(e => e); }
  ImportCertificateForCAM_Task() { return this.HostActiveDirectoryAuthentication.ImportCertificateForCAM_Task.apply( this, arguments ).catch(e => e); }
  ImportUnmanagedSnapshot() { return this.VirtualDiskManager.ImportUnmanagedSnapshot.apply( this, arguments ).catch(e => e); }
  ImportVApp() { return this.ResourcePool.ImportVApp.apply( this, arguments ).catch(e => e); }
  InflateDisk_Task() { return this.VcenterVStorageObjectManager.InflateDisk_Task.apply( this, arguments ).catch(e => e); }
  InflateVirtualDisk_Task() { return this.VirtualDiskManager.InflateVirtualDisk_Task.apply( this, arguments ).catch(e => e); }
  InitializeDisks_Task() { return this.HostVsanSystem.InitializeDisks_Task.apply( this, arguments ).catch(e => e); }
  initiateFailover_Task() { return this.FailoverClusterManager.initiateFailover_Task.apply( this, arguments ).catch(e => e); }
  InitiateFileTransferFromGuest() { return this.GuestFileManager.InitiateFileTransferFromGuest.apply( this, arguments ).catch(e => e); }
  InitiateFileTransferToGuest() { return this.GuestFileManager.InitiateFileTransferToGuest.apply( this, arguments ).catch(e => e); }
  installDate() { return this.HostImageConfigManager.installDate.apply( this, arguments ).catch(e => e); }
  InstallHostPatch_Task() { return this.HostPatchManager.InstallHostPatch_Task.apply( this, arguments ).catch(e => e); }
  InstallHostPatchV2_Task() { return this.HostPatchManager.InstallHostPatchV2_Task.apply( this, arguments ).catch(e => e); }
  InstallIoFilter_Task() { return this.IoFilterManager.InstallIoFilter_Task.apply( this, arguments ).catch(e => e); }
  InstallServerCertificate() { return this.HostCertificateManager.InstallServerCertificate.apply( this, arguments ).catch(e => e); }
  InstallSmartCardTrustAnchor() { return this.HostActiveDirectoryAuthentication.InstallSmartCardTrustAnchor.apply( this, arguments ).catch(e => e); }
  InstantClone_Task() { return this.VirtualMachine.InstantClone_Task.apply( this, arguments ).catch(e => e); }
  IsSharedGraphicsActive() { return this.HostGraphicsManager.IsSharedGraphicsActive.apply( this, arguments ).catch(e => e); }
  JoinDomain_Task() { return this.HostActiveDirectoryAuthentication.JoinDomain_Task.apply( this, arguments ).catch(e => e); }
  JoinDomainWithCAM_Task() { return this.HostActiveDirectoryAuthentication.JoinDomainWithCAM_Task.apply( this, arguments ).catch(e => e); }
  LeaveCurrentDomain_Task() { return this.HostActiveDirectoryAuthentication.LeaveCurrentDomain_Task.apply( this, arguments ).catch(e => e); }
  ListCACertificateRevocationLists() { return this.HostCertificateManager.ListCACertificateRevocationLists.apply( this, arguments ).catch(e => e); }
  ListCACertificates() { return this.HostCertificateManager.ListCACertificates.apply( this, arguments ).catch(e => e); }
  ListFilesInGuest() { return this.GuestFileManager.ListFilesInGuest.apply( this, arguments ).catch(e => e); }
  ListGuestAliases() { return this.GuestAliasManager.ListGuestAliases.apply( this, arguments ).catch(e => e); }
  ListGuestMappedAliases() { return this.GuestAliasManager.ListGuestMappedAliases.apply( this, arguments ).catch(e => e); }
  ListKeys() { return this.CryptoManager.ListKeys.apply( this, arguments ).catch(e => e); }
  ListKmipServers() { return this.CryptoManagerKmip.ListKmipServers.apply( this, arguments ).catch(e => e); }
  ListProcessesInGuest() { return this.GuestProcessManager.ListProcessesInGuest.apply( this, arguments ).catch(e => e); }
  ListRegistryKeysInGuest() { return this.GuestWindowsRegistryManager.ListRegistryKeysInGuest.apply( this, arguments ).catch(e => e); }
  ListRegistryValuesInGuest() { return this.GuestWindowsRegistryManager.ListRegistryValuesInGuest.apply( this, arguments ).catch(e => e); }
  ListSmartCardTrustAnchors() { return this.HostActiveDirectoryAuthentication.ListSmartCardTrustAnchors.apply( this, arguments ).catch(e => e); }
  ListTagsAttachedToVStorageObject() { return this.VcenterVStorageObjectManager.ListTagsAttachedToVStorageObject.apply( this, arguments ).catch(e => e); }
  ListVStorageObject() { return this.VcenterVStorageObjectManager.ListVStorageObject.apply( this, arguments ).catch(e => e); }
  ListVStorageObjectsAttachedToTag() { return this.VcenterVStorageObjectManager.ListVStorageObjectsAttachedToTag.apply( this, arguments ).catch(e => e); }
  Login() { return this.SessionManager.Login.apply( this, arguments ).catch(e => e); }
  LoginBySSPI() { return this.SessionManager.LoginBySSPI.apply( this, arguments ).catch(e => e); }
  LoginByToken() { return this.SessionManager.LoginByToken.apply( this, arguments ).catch(e => e); }
  LoginExtensionByCertificate() { return this.SessionManager.LoginExtensionByCertificate.apply( this, arguments ).catch(e => e); }
  LoginExtensionBySubjectName() { return this.SessionManager.LoginExtensionBySubjectName.apply( this, arguments ).catch(e => e); }
  Logout() { return this.SessionManager.Logout.apply( this, arguments ).catch(e => e); }
  LogUserEvent() { return this.EventManager.LogUserEvent.apply( this, arguments ).catch(e => e); }
  LookupDvPortGroup() { return this.DistributedVirtualSwitch.LookupDvPortGroup.apply( this, arguments ).catch(e => e); }
  LookupVmOverheadMemory() { return this.OverheadMemoryManager.LookupVmOverheadMemory.apply( this, arguments ).catch(e => e); }
  MakeDirectory(connectionData: ConnectionData,
                datastoreName: string,
                path: string,
                managedDatacenter: ManagedObjectReference & { $type: 'Datacenter' },
                createParentDirectories: boolean = false) { return this.FileManager.MakeDirectory.apply( this, arguments ).catch(e => e); }
  MakeDirectoryInGuest() { return this.GuestFileManager.MakeDirectoryInGuest.apply( this, arguments ).catch(e => e); }
  MakePrimaryVM_Task() { return this.VirtualMachine.MakePrimaryVM_Task.apply( this, arguments ).catch(e => e); }
  MarkAsLocal_Task() { return this.HostStorageSystem.MarkAsLocal_Task.apply( this, arguments ).catch(e => e); }
  MarkAsNonLocal_Task() { return this.HostStorageSystem.MarkAsNonLocal_Task.apply( this, arguments ).catch(e => e); }
  MarkAsNonSsd_Task() { return this.HostStorageSystem.MarkAsNonSsd_Task.apply( this, arguments ).catch(e => e); }
  MarkAsSsd_Task() { return this.HostStorageSystem.MarkAsSsd_Task.apply( this, arguments ).catch(e => e); }
  MarkAsTemplate() { return this.VirtualMachine.MarkAsTemplate.apply( this, arguments ).catch(e => e); }
  MarkAsVirtualMachine() { return this.VirtualMachine.MarkAsVirtualMachine.apply( this, arguments ).catch(e => e); }
  MarkDefault() { return this.CryptoManagerKmip.MarkDefault.apply( this, arguments ).catch(e => e); }
  MarkForRemoval() { return this.HostStorageSystem.MarkForRemoval.apply( this, arguments ).catch(e => e); }
  MergeDvs_Task() { return this.DistributedVirtualSwitch.MergeDvs_Task.apply( this, arguments ).catch(e => e); }
  MergePermissions() { return this.AuthorizationManager.MergePermissions.apply( this, arguments ).catch(e => e); }
  MigrateVM_Task() { return this.VirtualMachine.MigrateVM_Task.apply( this, arguments ).catch(e => e); }
  ModifyListView() { return this.ListView.ModifyListView.apply( this, arguments ).catch(e => e); }
  MountToolsInstaller() { return this.VirtualMachine.MountToolsInstaller.apply( this, arguments ).catch(e => e); }
  MountVffsVolume() { return this.HostStorageSystem.MountVffsVolume.apply( this, arguments ).catch(e => e); }
  MountVmfsVolume() { return this.HostStorageSystem.MountVmfsVolume.apply( this, arguments ).catch(e => e); }
  MountVmfsVolumeEx_Task() { return this.HostStorageSystem.MountVmfsVolumeEx_Task.apply( this, arguments ).catch(e => e); }
  MoveDatastoreFile_Task(connectionData: ConnectionData,
                         srcDatastoreName: string,
                         srcPath: string,
                         srcDatacenter: ManagedObjectReference & { $type: 'Datacenter' },
                         dstDatastoreName: string,
                         dstPath: string,
                         dstDatacenter: ManagedObjectReference & { $type: 'Datacenter' },
                         force: boolean = false,
                         returnOnTaskFinish: boolean = true) { return this.FileManager.MoveDatastoreFile_Task.apply( this, arguments ).catch(e => e); }
  MoveDirectoryInGuest() { return this.GuestFileManager.MoveDirectoryInGuest.apply( this, arguments ).catch(e => e); }
  MoveDVPort_Task() { return this.DistributedVirtualSwitch.MoveDVPort_Task.apply( this, arguments ).catch(e => e); }
  MoveFileInGuest() { return this.GuestFileManager.MoveFileInGuest.apply( this, arguments ).catch(e => e); }
  MoveHostInto_Task() { return this.ClusterComputeResource.MoveHostInto_Task.apply( this, arguments ).catch(e => e); }
  MoveInto_Task() { return this.ClusterComputeResource.MoveInto_Task.apply( this, arguments ).catch(e => e); }
  MoveIntoFolder_Task() { return this.Folder.MoveIntoFolder_Task.apply( this, arguments ).catch(e => e); }
  MoveIntoResourcePool() { return this.ResourcePool.MoveIntoResourcePool.apply( this, arguments ).catch(e => e); }
  MoveVirtualDisk_Task() { return this.VirtualDiskManager.MoveVirtualDisk_Task.apply( this, arguments ).catch(e => e); }
  OpenInventoryViewFolder() { return this.InventoryView.OpenInventoryViewFolder.apply( this, arguments ).catch(e => e); }
  OverwriteCustomizationSpec() { return this.CustomizationSpecManager.OverwriteCustomizationSpec.apply( this, arguments ).catch(e => e); }
  ParseDescriptor() { return this.OvfManager.ParseDescriptor.apply( this, arguments ).catch(e => e); }
  PerformDvsProductSpecOperation_Task() { return this.DistributedVirtualSwitch.PerformDvsProductSpecOperation_Task.apply( this, arguments ).catch(e => e); }
  PerformVsanUpgrade_Task() { return this.VsanUpgradeSystem.PerformVsanUpgrade_Task.apply( this, arguments ).catch(e => e); }
  PerformVsanUpgradePreflightCheck() { return this.VsanUpgradeSystem.PerformVsanUpgradePreflightCheck.apply( this, arguments ).catch(e => e); }
  PlaceVm() { return this.ClusterComputeResource.PlaceVm.apply( this, arguments ).catch(e => e); }
  PostEvent() { return this.EventManager.PostEvent.apply( this, arguments ).catch(e => e); }
  PostHealthUpdates() { return this.HealthUpdateManager.PostHealthUpdates.apply( this, arguments ).catch(e => e); }
  PowerDownHostToStandBy_Task() { return this.HostSystem.PowerDownHostToStandBy_Task.apply( this, arguments ).catch(e => e); }
  PowerOffVApp_Task() { return this.VirtualApp.PowerOffVApp_Task.apply( this, arguments ).catch(e => e); }
  PowerOffVM_Task(connectionData: ConnectionData,
                  managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
                  returnOnTaskFinish: boolean = true) { return this.VirtualMachine.PowerOffVM_Task.apply( this, arguments ).catch(e => e); }
  PowerOnMultiVM_Task() { return this.Datacenter.PowerOnMultiVM_Task.apply( this, arguments ).catch(e => e); }
  PowerOnVApp_Task() { return this.VirtualApp.PowerOnVApp_Task.apply( this, arguments ).catch(e => e); }
  PowerOnVM_Task(connectionData: ConnectionData,
                 managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
                 managedHost?: ManagedObjectReference & { $type: 'HostSystem' },
                 returnOnTaskFinish: boolean = true) { return this.VirtualMachine.PowerOnVM_Task.apply( this, arguments ).catch(e => e); }
  PowerUpHostFromStandBy_Task() { return this.HostSystem.PowerUpHostFromStandBy_Task.apply( this, arguments ).catch(e => e); }
  PrepareCrypto() { return this.HostSystem.PrepareCrypto.apply( this, arguments ).catch(e => e); }
  prepareVcha_Task() { return this.FailoverClusterConfigurator.prepareVcha_Task.apply( this, arguments ).catch(e => e); }
  PromoteDisks_Task() { return this.VirtualMachine.PromoteDisks_Task.apply( this, arguments ).catch(e => e); }
  PutUsbScanCodes() { return this.VirtualMachine.PutUsbScanCodes.apply( this, arguments ).catch(e => e); }
  QueryAnswerFileStatus() { return this.HostProfileManager.QueryAnswerFileStatus.apply( this, arguments ).catch(e => e); }
  QueryAssignedLicenses() { return this.LicenseAssignmentManager.QueryAssignedLicenses.apply( this, arguments ).catch(e => e); }
  QueryAvailableDisksForVmfs() { return this.HostDatastoreSystem.QueryAvailableDisksForVmfs.apply( this, arguments ).catch(e => e); }
  QueryAvailableDvsSpec() { return this.DistributedVirtualSwitchManager.QueryAvailableDvsSpec.apply( this, arguments ).catch(e => e); }
  QueryAvailablePartition() { return this.HostDiagnosticSystem.QueryAvailablePartition.apply( this, arguments ).catch(e => e); }
  QueryAvailablePerfMetric(connectionData: ConnectionData,
                           managedObject: ManagedObjectReference,
                           beginTime?: DateTime,
                           endTime?: DateTime,
                           intervalId?: number) { return this.PerformanceManager.QueryAvailablePerfMetric.apply( this, arguments ).catch(e => e); }
  QueryAvailableSsds() { return this.HostStorageSystem.QueryAvailableSsds.apply( this, arguments ).catch(e => e); }
  QueryAvailableTimeZones() { return this.HostDateTimeSystem.QueryAvailableTimeZones.apply( this, arguments ).catch(e => e); }
  QueryBootDevices() { return this.HostBootDeviceSystem.QueryBootDevices.apply( this, arguments ).catch(e => e); }
  QueryBoundVnics() { return this.IscsiManager.QueryBoundVnics.apply( this, arguments ).catch(e => e); }
  QueryCandidateNics() { return this.IscsiManager.QueryCandidateNics.apply( this, arguments ).catch(e => e); }
  QueryChangedDiskAreas() { return this.VirtualMachine.QueryChangedDiskAreas.apply( this, arguments ).catch(e => e); }
  QueryCmmds() { return this.HostVsanInternalSystem.QueryCmmds.apply( this, arguments ).catch(e => e); }
  QueryCompatibleHostForExistingDvs() { return this.DistributedVirtualSwitchManager.QueryCompatibleHostForExistingDvs.apply( this, arguments ).catch(e => e); }
  QueryCompatibleHostForNewDvs() { return this.DistributedVirtualSwitchManager.QueryCompatibleHostForNewDvs.apply( this, arguments ).catch(e => e); }
  QueryComplianceStatus() { return this.ProfileComplianceManager.QueryComplianceStatus.apply( this, arguments ).catch(e => e); }
  QueryConfigOption() { return this.EnvironmentBrowser.QueryConfigOption.apply( this, arguments ).catch(e => e); }
  QueryConfigOptionDescriptor() { return this.EnvironmentBrowser.QueryConfigOptionDescriptor.apply( this, arguments ).catch(e => e); }
  QueryConfigOptionEx() { return this.EnvironmentBrowser.QueryConfigOptionEx.apply( this, arguments ).catch(e => e); }
  QueryConfigTarget() { return this.EnvironmentBrowser.QueryConfigTarget.apply( this, arguments ).catch(e => e); }
  QueryConfiguredModuleOptionString() { return this.HostKernelModuleSystem.QueryConfiguredModuleOptionString.apply( this, arguments ).catch(e => e); }
  QueryConnectionInfo() { return this.Datacenter.QueryConnectionInfo.apply( this, arguments ).catch(e => e); }
  QueryConnectionInfoViaSpec() { return this.Datacenter.QueryConnectionInfoViaSpec.apply( this, arguments ).catch(e => e); }
  queryDatacenterConfigOptionDescriptor() { return this.Datacenter.queryDatacenterConfigOptionDescriptor.apply( this, arguments ).catch(e => e); }
  QueryDatastorePerformanceSummary() { return this.StorageResourceManager.QueryDatastorePerformanceSummary.apply( this, arguments ).catch(e => e); }
  QueryDateTime() { return this.HostDateTimeSystem.QueryDateTime.apply( this, arguments ).catch(e => e); }
  QueryDescriptions() { return this.DiagnosticManager.QueryDescriptions.apply( this, arguments ).catch(e => e); }
  QueryDisksForVsan() { return this.HostVsanSystem.QueryDisksForVsan.apply( this, arguments ).catch(e => e); }
  QueryDisksUsingFilter() { return this.IoFilterManager.QueryDisksUsingFilter.apply( this, arguments ).catch(e => e); }
  QueryDvsByUuid() { return this.DistributedVirtualSwitchManager.QueryDvsByUuid.apply( this, arguments ).catch(e => e); }
  QueryDvsCheckCompatibility() { return this.DistributedVirtualSwitchManager.QueryDvsCheckCompatibility.apply( this, arguments ).catch(e => e); }
  QueryDvsCompatibleHostSpec() { return this.DistributedVirtualSwitchManager.QueryDvsCompatibleHostSpec.apply( this, arguments ).catch(e => e); }
  QueryDvsConfigTarget() { return this.DistributedVirtualSwitchManager.QueryDvsConfigTarget.apply( this, arguments ).catch(e => e); }
  QueryDvsFeatureCapability() { return this.DistributedVirtualSwitchManager.QueryDvsFeatureCapability.apply( this, arguments ).catch(e => e); }
  QueryEvents(connectionData: ConnectionData,
              filter: EventFilterSpec) { return this.EventManager.QueryEvents.apply( this, arguments ).catch(e => e); }
  QueryExpressionMetadata() { return this.ProfileComplianceManager.QueryExpressionMetadata.apply( this, arguments ).catch(e => e); }
  QueryExtensionIpAllocationUsage() { return this.ExtensionManager.QueryExtensionIpAllocationUsage.apply( this, arguments ).catch(e => e); }
  QueryFaultToleranceCompatibility() { return this.VirtualMachine.QueryFaultToleranceCompatibility.apply( this, arguments ).catch(e => e); }
  QueryFaultToleranceCompatibilityEx() { return this.VirtualMachine.QueryFaultToleranceCompatibilityEx.apply( this, arguments ).catch(e => e); }
  QueryFilterEntities() { return this.HealthUpdateManager.QueryFilterEntities.apply( this, arguments ).catch(e => e); }
  QueryFilterInfoIds() { return this.HealthUpdateManager.QueryFilterInfoIds.apply( this, arguments ).catch(e => e); }
  QueryFilterList() { return this.HealthUpdateManager.QueryFilterList.apply( this, arguments ).catch(e => e); }
  QueryFilterName() { return this.HealthUpdateManager.QueryFilterName.apply( this, arguments ).catch(e => e); }
  QueryFirmwareConfigUploadURL() { return this.HostFirmwareSystem.QueryFirmwareConfigUploadURL.apply( this, arguments ).catch(e => e); }
  QueryHealthUpdateInfos() { return this.HealthUpdateManager.QueryHealthUpdateInfos.apply( this, arguments ).catch(e => e); }
  QueryHealthUpdates() { return this.HealthUpdateManager.QueryHealthUpdates.apply( this, arguments ).catch(e => e); }
  QueryHostConnectionInfo() { return this.HostSystem.QueryHostConnectionInfo.apply( this, arguments ).catch(e => e); }
  QueryHostPatch_Task() { return this.HostPatchManager.QueryHostPatch_Task.apply( this, arguments ).catch(e => e); }
  QueryHostProfileMetadata() { return this.HostProfileManager.QueryHostProfileMetadata.apply( this, arguments ).catch(e => e); }
  QueryHostStatus() { return this.HostVsanSystem.QueryHostStatus.apply( this, arguments ).catch(e => e); }
  QueryIoFilterInfo() { return this.IoFilterManager.QueryIoFilterInfo.apply( this, arguments ).catch(e => e); }
  QueryIoFilterIssues() { return this.IoFilterManager.QueryIoFilterIssues.apply( this, arguments ).catch(e => e); }
  QueryIORMConfigOption() { return this.StorageResourceManager.QueryIORMConfigOption.apply( this, arguments ).catch(e => e); }
  QueryIPAllocations() { return this.IpPoolManager.QueryIPAllocations.apply( this, arguments ).catch(e => e); }
  QueryIpPools() { return this.IpPoolManager.QueryIpPools.apply( this, arguments ).catch(e => e); }
  QueryLicenseSourceAvailability() { return this.LicenseManager.QueryLicenseSourceAvailability.apply( this, arguments ).catch(e => e); }
  QueryLicenseUsage() { return this.LicenseManager.QueryLicenseUsage.apply( this, arguments ).catch(e => e); }
  QueryLockdownExceptions() { return this.HostAccessManager.QueryLockdownExceptions.apply( this, arguments ).catch(e => e); }
  QueryManagedBy() { return this.ExtensionManager.QueryManagedBy.apply( this, arguments ).catch(e => e); }
  QueryMemoryOverhead() { return this.HostSystem.QueryMemoryOverhead.apply( this, arguments ).catch(e => e); }
  QueryMemoryOverheadEx() { return this.HostSystem.QueryMemoryOverheadEx.apply( this, arguments ).catch(e => e); }
  QueryMigrationDependencies() { return this.IscsiManager.QueryMigrationDependencies.apply( this, arguments ).catch(e => e); }
  QueryModules() { return this.HostKernelModuleSystem.QueryModules.apply( this, arguments ).catch(e => e); }
  QueryMonitoredEntities() { return this.HealthUpdateManager.QueryMonitoredEntities.apply( this, arguments ).catch(e => e); }
  QueryNetConfig() { return this.HostVirtualNicManager.QueryNetConfig.apply( this, arguments ).catch(e => e); }
  QueryNetworkHint() { return this.HostNetworkSystem.QueryNetworkHint.apply( this, arguments ).catch(e => e); }
  QueryNFSUser() { return this.HostStorageSystem.QueryNFSUser.apply( this, arguments ).catch(e => e); }
  QueryObjectsOnPhysicalVsanDisk() { return this.HostVsanInternalSystem.QueryObjectsOnPhysicalVsanDisk.apply( this, arguments ).catch(e => e); }
  QueryOptions() { return this.OptionManager.QueryOptions.apply( this, arguments ).catch(e => e); }
  QueryPartitionCreateDesc() { return this.HostDiagnosticSystem.QueryPartitionCreateDesc.apply( this, arguments ).catch(e => e); }
  QueryPartitionCreateOptions() { return this.HostDiagnosticSystem.QueryPartitionCreateOptions.apply( this, arguments ).catch(e => e); }
  QueryPathSelectionPolicyOptions() { return this.HostStorageSystem.QueryPathSelectionPolicyOptions.apply( this, arguments ).catch(e => e); }
  QueryPerf(connectionData: ConnectionData,
            querySpec: PerfQuerySpec[]) { return this.PerformanceManager.QueryPerf.apply( this, arguments ).catch(e => e); }
  QueryPerfComposite() { return this.PerformanceManager.QueryPerfComposite.apply( this, arguments ).catch(e => e); }
  QueryPerfCounter(connectionData: ConnectionData,
                   counterId: number[]) { return this.PerformanceManager.QueryPerfCounter.apply( this, arguments ).catch(e => e); }
  QueryPerfCounterByLevel(connectionData: ConnectionData,
                          level: number) { return this.PerformanceManager.QueryPerfCounterByLevel.apply( this, arguments ).catch(e => e); }
  QueryPerfProviderSummary(connectionData: ConnectionData,
                           managedObject: ManagedObjectReference) { return this.PerformanceManager.QueryPerfProviderSummary.apply( this, arguments ).catch(e => e); }
  QueryPhysicalVsanDisks() { return this.HostVsanInternalSystem.QueryPhysicalVsanDisks.apply( this, arguments ).catch(e => e); }
  QueryPnicStatus() { return this.IscsiManager.QueryPnicStatus.apply( this, arguments ).catch(e => e); }
  QueryPolicyMetadata() { return this.ProfileManager.QueryPolicyMetadata.apply( this, arguments ).catch(e => e); }
  QueryProfileStructure() { return this.HostProfileManager.QueryProfileStructure.apply( this, arguments ).catch(e => e); }
  QueryProviderList() { return this.HealthUpdateManager.QueryProviderList.apply( this, arguments ).catch(e => e); }
  QueryProviderName() { return this.HealthUpdateManager.QueryProviderName.apply( this, arguments ).catch(e => e); }
  QueryResourceConfigOption() { return this.ResourcePool.QueryResourceConfigOption.apply( this, arguments ).catch(e => e); }
  QueryServiceList() { return this.ServiceManager.QueryServiceList.apply( this, arguments ).catch(e => e); }
  QueryStorageArrayTypePolicyOptions() { return this.HostStorageSystem.QueryStorageArrayTypePolicyOptions.apply( this, arguments ).catch(e => e); }
  QuerySupportedFeatures() { return this.LicenseManager.QuerySupportedFeatures.apply( this, arguments ).catch(e => e); }
  QuerySyncingVsanObjects() { return this.HostVsanInternalSystem.QuerySyncingVsanObjects.apply( this, arguments ).catch(e => e); }
  QuerySystemUsers() { return this.HostAccessManager.QuerySystemUsers.apply( this, arguments ).catch(e => e); }
  QueryTargetCapabilities() { return this.EnvironmentBrowser.QueryTargetCapabilities.apply( this, arguments ).catch(e => e); }
  QueryTpmAttestationReport() { return this.HostSystem.QueryTpmAttestationReport.apply( this, arguments ).catch(e => e); }
  QueryUnmonitoredHosts() { return this.HealthUpdateManager.QueryUnmonitoredHosts.apply( this, arguments ).catch(e => e); }
  QueryUnownedFiles() { return this.VirtualMachine.QueryUnownedFiles.apply( this, arguments ).catch(e => e); }
  QueryUnresolvedVmfsVolume() { return this.HostStorageSystem.QueryUnresolvedVmfsVolume.apply( this, arguments ).catch(e => e); }
  QueryUnresolvedVmfsVolumes() { return this.HostDatastoreSystem.QueryUnresolvedVmfsVolumes.apply( this, arguments ).catch(e => e); }
  QueryUsedVlanIdInDvs() { return this.DistributedVirtualSwitch.QueryUsedVlanIdInDvs.apply( this, arguments ).catch(e => e); }
  QueryVirtualDiskFragmentation() { return this.VirtualDiskManager.QueryVirtualDiskFragmentation.apply( this, arguments ).catch(e => e); }
  QueryVirtualDiskGeometry() { return this.VirtualDiskManager.QueryVirtualDiskGeometry.apply( this, arguments ).catch(e => e); }
  QueryVirtualDiskUuid() { return this.VirtualDiskManager.QueryVirtualDiskUuid.apply( this, arguments ).catch(e => e); }
  QueryVmfsConfigOption() { return this.HostStorageSystem.QueryVmfsConfigOption.apply( this, arguments ).catch(e => e); }
  QueryVmfsDatastoreCreateOptions() { return this.HostDatastoreSystem.QueryVmfsDatastoreCreateOptions.apply( this, arguments ).catch(e => e); }
  QueryVmfsDatastoreExpandOptions() { return this.HostDatastoreSystem.QueryVmfsDatastoreExpandOptions.apply( this, arguments ).catch(e => e); }
  QueryVmfsDatastoreExtendOptions() { return this.HostDatastoreSystem.QueryVmfsDatastoreExtendOptions.apply( this, arguments ).catch(e => e); }
  QueryVMotionCompatibility() { return this.ServiceInstance.QueryVMotionCompatibility.apply( this, arguments ).catch(e => e); }
  QueryVMotionCompatibilityEx_Task() { return this.VirtualMachineProvisioningChecker.QueryVMotionCompatibilityEx_Task.apply( this, arguments ).catch(e => e); }
  QueryVnicStatus() { return this.IscsiManager.QueryVnicStatus.apply( this, arguments ).catch(e => e); }
  QueryVsanObjects() { return this.HostVsanInternalSystem.QueryVsanObjects.apply( this, arguments ).catch(e => e); }
  QueryVsanObjectUuidsByFilter() { return this.HostVsanInternalSystem.QueryVsanObjectUuidsByFilter.apply( this, arguments ).catch(e => e); }
  QueryVsanStatistics() { return this.HostVsanInternalSystem.QueryVsanStatistics.apply( this, arguments ).catch(e => e); }
  QueryVsanUpgradeStatus() { return this.VsanUpgradeSystem.QueryVsanUpgradeStatus.apply( this, arguments ).catch(e => e); }
  ReadEnvironmentVariableInGuest() { return this.GuestProcessManager.ReadEnvironmentVariableInGuest.apply( this, arguments ).catch(e => e); }
  ReadNextEvents() { return this.EventHistoryCollector.ReadNextEvents.apply( this, arguments ).catch(e => e); }
  ReadNextTasks(connectionData: ConnectionData,
                managedTaskCollector: ManagedObjectReference & { $type: 'TaskHistoryCollector' },
                maxCount: number) { return this.TaskHistoryCollector.ReadNextTasks.apply( this, arguments ).catch(e => e); }
  ReadPreviousEvents() { return this.EventHistoryCollector.ReadPreviousEvents.apply( this, arguments ).catch(e => e); }
  ReadPreviousTasks(connectionData: ConnectionData,
                    managedTaskCollector: ManagedObjectReference & { $type: 'TaskHistoryCollector' },
                    maxCount: number) { return this.TaskHistoryCollector.ReadPreviousTasks.apply( this, arguments ).catch(e => e); }
  RebootGuest(connectionData: ConnectionData,
              managedVM: ManagedObjectReference & { $type: 'VirtualMachine' }) { return this.VirtualMachine.RebootGuest.apply( this, arguments ).catch(e => e); }
  RebootHost_Task() { return this.HostSystem.RebootHost_Task.apply( this, arguments ).catch(e => e); }
  RecommendDatastores() { return this.StorageResourceManager.RecommendDatastores.apply( this, arguments ).catch(e => e); }
  RecommendHostsForVm() { return this.ClusterComputeResource.RecommendHostsForVm.apply( this, arguments ).catch(e => e); }
  RecommissionVsanNode_Task() { return this.HostVsanSystem.RecommissionVsanNode_Task.apply( this, arguments ).catch(e => e); }
  ReconcileDatastoreInventory_Task() { return this.VcenterVStorageObjectManager.ReconcileDatastoreInventory_Task.apply( this, arguments ).catch(e => e); }
  ReconfigurationSatisfiable() { return this.HostVsanInternalSystem.ReconfigurationSatisfiable.apply( this, arguments ).catch(e => e); }
  ReconfigureAlarm() { return this.Alarm.ReconfigureAlarm.apply( this, arguments ).catch(e => e); }
  ReconfigureAutostart() { return this.HostAutoStartManager.ReconfigureAutostart.apply( this, arguments ).catch(e => e); }
  ReconfigureCluster_Task() { return this.ClusterComputeResource.ReconfigureCluster_Task.apply( this, arguments ).catch(e => e); }
  ReconfigureComputeResource_Task() { return this.ComputeResource.ReconfigureComputeResource_Task.apply( this, arguments ).catch(e => e); }
  ReconfigureDatacenter_Task() { return this.Datacenter.ReconfigureDatacenter_Task.apply( this, arguments ).catch(e => e); }
  ReconfigureDomObject() { return this.HostVsanInternalSystem.ReconfigureDomObject.apply( this, arguments ).catch(e => e); }
  ReconfigureDVPort_Task() { return this.DistributedVirtualSwitch.ReconfigureDVPort_Task.apply( this, arguments ).catch(e => e); }
  ReconfigureDVPortgroup_Task() { return this.DistributedVirtualPortgroup.ReconfigureDVPortgroup_Task.apply( this, arguments ).catch(e => e); }
  ReconfigureDvs_Task() { return this.DistributedVirtualSwitch.ReconfigureDvs_Task.apply( this, arguments ).catch(e => e); }
  ReconfigureHostForDAS_Task() { return this.HostSystem.ReconfigureHostForDAS_Task.apply( this, arguments ).catch(e => e); }
  ReconfigureScheduledTask() { return this.ScheduledTask.ReconfigureScheduledTask.apply( this, arguments ).catch(e => e); }
  ReconfigureServiceConsoleReservation() { return this.HostMemorySystem.ReconfigureServiceConsoleReservation.apply( this, arguments ).catch(e => e); }
  ReconfigureSnmpAgent() { return this.HostSnmpSystem.ReconfigureSnmpAgent.apply( this, arguments ).catch(e => e); }
  ReconfigureVirtualMachineReservation() { return this.HostMemorySystem.ReconfigureVirtualMachineReservation.apply( this, arguments ).catch(e => e); }
  ReconfigVM_Task(connectionData: ConnectionData,
                  managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
                  spec: VirtualMachineConfigSpec,
                  returnOnTaskFinish: boolean = true) { return this.VirtualMachine.ReconfigVM_Task.apply( this, arguments ).catch(e => e); }
  ReconnectHost_Task() { return this.HostSystem.ReconnectHost_Task.apply( this, arguments ).catch(e => e); }
  RectifyDvsHost_Task() { return this.DistributedVirtualSwitch.RectifyDvsHost_Task.apply( this, arguments ).catch(e => e); }
  RectifyDvsOnHost_Task() { return this.DistributedVirtualSwitchManager.RectifyDvsOnHost_Task.apply( this, arguments ).catch(e => e); }
  Refresh() { return this.HostPciPassthruSystem.Refresh.apply( this, arguments ).catch(e => e); }
  RefreshDatastore() { return this.Datastore.RefreshDatastore.apply( this, arguments ).catch(e => e); }
  RefreshDatastoreStorageInfo() { return this.Datastore.RefreshDatastoreStorageInfo.apply( this, arguments ).catch(e => e); }
  RefreshDateTimeSystem() { return this.HostDateTimeSystem.RefreshDateTimeSystem.apply( this, arguments ).catch(e => e); }
  RefreshDVPortState() { return this.DistributedVirtualSwitch.RefreshDVPortState.apply( this, arguments ).catch(e => e); }
  RefreshFirewall() { return this.HostFirewallSystem.RefreshFirewall.apply( this, arguments ).catch(e => e); }
  RefreshGraphicsManager() { return this.HostGraphicsManager.RefreshGraphicsManager.apply( this, arguments ).catch(e => e); }
  RefreshHealthStatusSystem() { return this.HostHealthStatusSystem.RefreshHealthStatusSystem.apply( this, arguments ).catch(e => e); }
  RefreshNetworkSystem() { return this.HostNetworkSystem.RefreshNetworkSystem.apply( this, arguments ).catch(e => e); }
  RefreshRecommendation() { return this.ClusterComputeResource.RefreshRecommendation.apply( this, arguments ).catch(e => e); }
  RefreshRuntime() { return this.ResourcePool.RefreshRuntime.apply( this, arguments ).catch(e => e); }
  RefreshServices() { return this.HostServiceSystem.RefreshServices.apply( this, arguments ).catch(e => e); }
  RefreshStorageDrsRecommendation() { return this.StorageResourceManager.RefreshStorageDrsRecommendation.apply( this, arguments ).catch(e => e); }
  RefreshStorageDrsRecommendationsForPod_Task() { return this.StorageResourceManager.RefreshStorageDrsRecommendationsForPod_Task.apply( this, arguments ).catch(e => e); }
  RefreshStorageInfo() { return this.VirtualMachine.RefreshStorageInfo.apply( this, arguments ).catch(e => e); }
  RefreshStorageSystem() { return this.HostStorageSystem.RefreshStorageSystem.apply( this, arguments ).catch(e => e); }
  RegisterChildVM_Task() { return this.ResourcePool.RegisterChildVM_Task.apply( this, arguments ).catch(e => e); }
  RegisterDisk() { return this.VcenterVStorageObjectManager.RegisterDisk.apply( this, arguments ).catch(e => e); }
  RegisterExtension(connectionData: ConnectionData,
                    extension: Extension) { return this.ExtensionManager.RegisterExtension.apply( this, arguments ).catch(e => e); }
  RegisterHealthUpdateProvider() { return this.HealthUpdateManager.RegisterHealthUpdateProvider.apply( this, arguments ).catch(e => e); }
  RegisterKmipServer() { return this.CryptoManagerKmip.RegisterKmipServer.apply( this, arguments ).catch(e => e); }
  RegisterVM_Task(connectionData: ConnectionData,
                  managedFolder: ManagedObjectReference & { $type: 'Folder' },
                  path: string,
                  name?: string,
                  asTemplate: boolean = false,
                  managedPool?: ManagedObjectReference & { $type: 'ResourcePool' },
                  managedHost?: ManagedObjectReference & { $type: 'HostSystem' },
                  returnOnTaskFinish: boolean = true) { return this.Folder.RegisterVM_Task.apply( this, arguments ).catch(e => e); }
  ReleaseCredentialsInGuest() { return this.GuestAuthManager.ReleaseCredentialsInGuest.apply( this, arguments ).catch(e => e); }
  ReleaseIpAllocation() { return this.IpPoolManager.ReleaseIpAllocation.apply( this, arguments ).catch(e => e); }
  ReleaseManagedSnapshot() { return this.VirtualDiskManager.ReleaseManagedSnapshot.apply( this, arguments ).catch(e => e); }
  Reload(connectionData: ConnectionData,
         managedObject: ManagedObjectReference) { return this.ManagedEntity.Reload.apply( this, arguments ).catch(e => e); }
  reloadVirtualMachineFromPath_Task() { return this.VirtualMachine.reloadVirtualMachineFromPath_Task.apply( this, arguments ).catch(e => e); }
  RelocateVM_Task() { return this.VirtualMachine.RelocateVM_Task.apply( this, arguments ).catch(e => e); }
  RelocateVStorageObject_Task() { return this.VcenterVStorageObjectManager.RelocateVStorageObject_Task.apply( this, arguments ).catch(e => e); }
  RemoveAlarm() { return this.Alarm.RemoveAlarm.apply( this, arguments ).catch(e => e); }
  RemoveAllSnapshots_Task() { return this.VirtualMachine.RemoveAllSnapshots_Task.apply( this, arguments ).catch(e => e); }
  RemoveAssignedLicense() { return this.LicenseAssignmentManager.RemoveAssignedLicense.apply( this, arguments ).catch(e => e); }
  RemoveAuthorizationRole() { return this.AuthorizationManager.RemoveAuthorizationRole.apply( this, arguments ).catch(e => e); }
  RemoveCustomFieldDef() { return this.CustomFieldsManager.RemoveCustomFieldDef.apply( this, arguments ).catch(e => e); }
  RemoveDatastore(connectionData: ConnectionData,
                  managedDatastoreSystem: ManagedObjectReference & { $type: 'HostDatastoreSystem' },
                  managedDatastore: ManagedObjectReference & { $type: 'Datastore' }) { return this.HostDatastoreSystem.RemoveDatastore.apply( this, arguments ).catch(e => e); }
  RemoveDatastoreEx_Task() { return this.HostDatastoreSystem.RemoveDatastoreEx_Task.apply( this, arguments ).catch(e => e); }
  RemoveDisk_Task() { return this.HostVsanSystem.RemoveDisk_Task.apply( this, arguments ).catch(e => e); }
  RemoveDiskMapping_Task() { return this.HostVsanSystem.RemoveDiskMapping_Task.apply( this, arguments ).catch(e => e); }
  RemoveEntityPermission() { return this.AuthorizationManager.RemoveEntityPermission.apply( this, arguments ).catch(e => e); }
  RemoveFilter() { return this.HealthUpdateManager.RemoveFilter.apply( this, arguments ).catch(e => e); }
  RemoveFilterEntities() { return this.HealthUpdateManager.RemoveFilterEntities.apply( this, arguments ).catch(e => e); }
  RemoveGroup() { return this.HostLocalAccountManager.RemoveGroup.apply( this, arguments ).catch(e => e); }
  RemoveGuestAlias() { return this.GuestAliasManager.RemoveGuestAlias.apply( this, arguments ).catch(e => e); }
  RemoveGuestAliasByCert() { return this.GuestAliasManager.RemoveGuestAliasByCert.apply( this, arguments ).catch(e => e); }
  RemoveInternetScsiSendTargets() { return this.HostStorageSystem.RemoveInternetScsiSendTargets.apply( this, arguments ).catch(e => e); }
  RemoveInternetScsiStaticTargets() { return this.HostStorageSystem.RemoveInternetScsiStaticTargets.apply( this, arguments ).catch(e => e); }
  RemoveKey() { return this.CryptoManager.RemoveKey.apply( this, arguments ).catch(e => e); }
  RemoveKeys() { return this.CryptoManager.RemoveKeys.apply( this, arguments ).catch(e => e); }
  RemoveKmipServer() { return this.CryptoManagerKmip.RemoveKmipServer.apply( this, arguments ).catch(e => e); }
  RemoveLicense() { return this.LicenseManager.RemoveLicense.apply( this, arguments ).catch(e => e); }
  RemoveLicenseLabel() { return this.LicenseManager.RemoveLicenseLabel.apply( this, arguments ).catch(e => e); }
  RemoveMonitoredEntities() { return this.HealthUpdateManager.RemoveMonitoredEntities.apply( this, arguments ).catch(e => e); }
  RemoveNetworkResourcePool() { return this.DistributedVirtualSwitch.RemoveNetworkResourcePool.apply( this, arguments ).catch(e => e); }
  RemovePerfInterval() { return this.PerformanceManager.RemovePerfInterval.apply( this, arguments ).catch(e => e); }
  RemovePortGroup() { return this.HostNetworkSystem.RemovePortGroup.apply( this, arguments ).catch(e => e); }
  RemoveScheduledTask() { return this.ScheduledTask.RemoveScheduledTask.apply( this, arguments ).catch(e => e); }
  RemoveServiceConsoleVirtualNic() { return this.HostNetworkSystem.RemoveServiceConsoleVirtualNic.apply( this, arguments ).catch(e => e); }
  RemoveSmartCardTrustAnchor() { return this.HostActiveDirectoryAuthentication.RemoveSmartCardTrustAnchor.apply( this, arguments ).catch(e => e); }
  RemoveSmartCardTrustAnchorByFingerprint() { return this.HostActiveDirectoryAuthentication.RemoveSmartCardTrustAnchorByFingerprint.apply( this, arguments ).catch(e => e); }
  RemoveSnapshot_Task(connectionData: ConnectionData,
                      managedVirtualMachineSnapshot: ManagedObjectReference & { $type: 'VirtualMachineSnapshot' },
                      removeChildren: boolean,
                      consolidate: boolean = true,
                      returnOnTaskFinish: boolean = true) { return this.VirtualMachineSnapshot.RemoveSnapshot_Task.apply( this, arguments ).catch(e => e); }
  RemoveUser() { return this.HostLocalAccountManager.RemoveUser.apply( this, arguments ).catch(e => e); }
  RemoveVirtualNic() { return this.HostNetworkSystem.RemoveVirtualNic.apply( this, arguments ).catch(e => e); }
  RemoveVirtualSwitch() { return this.HostNetworkSystem.RemoveVirtualSwitch.apply( this, arguments ).catch(e => e); }
  Rename_Task() { return this.ManagedEntity.Rename_Task.apply( this, arguments ).catch(e => e); }
  RenameCustomFieldDef() { return this.CustomFieldsManager.RenameCustomFieldDef.apply( this, arguments ).catch(e => e); }
  RenameCustomizationSpec() { return this.CustomizationSpecManager.RenameCustomizationSpec.apply( this, arguments ).catch(e => e); }
  RenameDatastore() { return this.Datastore.RenameDatastore.apply( this, arguments ).catch(e => e); }
  RenameSnapshot() { return this.VirtualMachineSnapshot.RenameSnapshot.apply( this, arguments ).catch(e => e); }
  RenameVStorageObject() { return this.VcenterVStorageObjectManager.RenameVStorageObject.apply( this, arguments ).catch(e => e); }
  ReplaceCACertificatesAndCRLs() { return this.HostCertificateManager.ReplaceCACertificatesAndCRLs.apply( this, arguments ).catch(e => e); }
  ReplaceSmartCardTrustAnchors() { return this.HostActiveDirectoryAuthentication.ReplaceSmartCardTrustAnchors.apply( this, arguments ).catch(e => e); }
  RescanAllHba() { return this.HostStorageSystem.RescanAllHba.apply( this, arguments ).catch(e => e); }
  RescanHba() { return this.HostStorageSystem.RescanHba.apply( this, arguments ).catch(e => e); }
  RescanVffs() { return this.HostStorageSystem.RescanVffs.apply( this, arguments ).catch(e => e); }
  RescanVmfs() { return this.HostStorageSystem.RescanVmfs.apply( this, arguments ).catch(e => e); }
  ResetCollector() { return this.HistoryCollector.ResetCollector.apply( this, arguments ).catch(e => e); }
  ResetCounterLevelMapping() { return this.PerformanceManager.ResetCounterLevelMapping.apply( this, arguments ).catch(e => e); }
  ResetEntityPermissions() { return this.AuthorizationManager.ResetEntityPermissions.apply( this, arguments ).catch(e => e); }
  ResetFirmwareToFactoryDefaults() { return this.HostFirmwareSystem.ResetFirmwareToFactoryDefaults.apply( this, arguments ).catch(e => e); }
  ResetGuestInformation() { return this.VirtualMachine.ResetGuestInformation.apply( this, arguments ).catch(e => e); }
  ResetListView() { return this.ListView.ResetListView.apply( this, arguments ).catch(e => e); }
  ResetListViewFromView() { return this.ListView.ResetListViewFromView.apply( this, arguments ).catch(e => e); }
  ResetSystemHealthInfo() { return this.HostHealthStatusSystem.ResetSystemHealthInfo.apply( this, arguments ).catch(e => e); }
  ResetVM_Task(connectionData: ConnectionData,
               managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
               returnOnTaskFinish: boolean = true) { return this.VirtualMachine.ResetVM_Task.apply( this, arguments ).catch(e => e); }
  ResignatureUnresolvedVmfsVolume_Task() { return this.HostDatastoreSystem.ResignatureUnresolvedVmfsVolume_Task.apply( this, arguments ).catch(e => e); }
  ResolveInstallationErrorsOnCluster_Task() { return this.IoFilterManager.ResolveInstallationErrorsOnCluster_Task.apply( this, arguments ).catch(e => e); }
  ResolveInstallationErrorsOnHost_Task() { return this.IoFilterManager.ResolveInstallationErrorsOnHost_Task.apply( this, arguments ).catch(e => e); }
  ResolveMultipleUnresolvedVmfsVolumes() { return this.HostStorageSystem.ResolveMultipleUnresolvedVmfsVolumes.apply( this, arguments ).catch(e => e); }
  ResolveMultipleUnresolvedVmfsVolumesEx_Task() { return this.HostStorageSystem.ResolveMultipleUnresolvedVmfsVolumesEx_Task.apply( this, arguments ).catch(e => e); }
  RestartService() { return this.HostServiceSystem.RestartService.apply( this, arguments ).catch(e => e); }
  RestartServiceConsoleVirtualNic() { return this.HostNetworkSystem.RestartServiceConsoleVirtualNic.apply( this, arguments ).catch(e => e); }
  RestoreFirmwareConfiguration() { return this.HostFirmwareSystem.RestoreFirmwareConfiguration.apply( this, arguments ).catch(e => e); }
  RetrieveAllPermissions() { return this.AuthorizationManager.RetrieveAllPermissions.apply( this, arguments ).catch(e => e); }
  RetrieveAnswerFile() { return this.HostProfileManager.RetrieveAnswerFile.apply( this, arguments ).catch(e => e); }
  RetrieveAnswerFileForProfile() { return this.HostProfileManager.RetrieveAnswerFileForProfile.apply( this, arguments ).catch(e => e); }
  RetrieveArgumentDescription() { return this.EventManager.RetrieveArgumentDescription.apply( this, arguments ).catch(e => e); }
  RetrieveClientCert() { return this.CryptoManagerKmip.RetrieveClientCert.apply( this, arguments ).catch(e => e); }
  RetrieveClientCsr() { return this.CryptoManagerKmip.RetrieveClientCsr.apply( this, arguments ).catch(e => e); }
  RetrieveDasAdvancedRuntimeInfo() { return this.ClusterComputeResource.RetrieveDasAdvancedRuntimeInfo.apply( this, arguments ).catch(e => e); }
  RetrieveDescription() { return this.Profile.RetrieveDescription.apply( this, arguments ).catch(e => e); }
  RetrieveDiskPartitionInfo() { return this.HostStorageSystem.RetrieveDiskPartitionInfo.apply( this, arguments ).catch(e => e); }
  RetrieveEntityPermissions() { return this.AuthorizationManager.RetrieveEntityPermissions.apply( this, arguments ).catch(e => e); }
  RetrieveEntityScheduledTask() { return this.ScheduledTaskManager.RetrieveEntityScheduledTask.apply( this, arguments ).catch(e => e); }
  RetrieveHardwareUptime() { return this.HostSystem.RetrieveHardwareUptime.apply( this, arguments ).catch(e => e); }
  RetrieveHostAccessControlEntries() { return this.HostAccessManager.RetrieveHostAccessControlEntries.apply( this, arguments ).catch(e => e); }
  RetrieveHostCustomizations() { return this.HostProfileManager.RetrieveHostCustomizations.apply( this, arguments ).catch(e => e); }
  RetrieveHostCustomizationsForProfile() { return this.HostProfileManager.RetrieveHostCustomizationsForProfile.apply( this, arguments ).catch(e => e); }
  RetrieveHostSpecification() { return this.HostSpecificationManager.RetrieveHostSpecification.apply( this, arguments ).catch(e => e); }
  RetrieveKmipServerCert() { return this.CryptoManagerKmip.RetrieveKmipServerCert.apply( this, arguments ).catch(e => e); }
  RetrieveKmipServersStatus_Task() { return this.CryptoManagerKmip.RetrieveKmipServersStatus_Task.apply( this, arguments ).catch(e => e); }
  RetrieveObjectScheduledTask() { return this.ScheduledTaskManager.RetrieveObjectScheduledTask.apply( this, arguments ).catch(e => e); }
  RetrieveProductComponents() { return this.ServiceInstance.RetrieveProductComponents.apply( this, arguments ).catch(e => e); }
  RetrieveProperties(connectionData: ConnectionData,
                     specSet: PropertyFilterSpec[]) { return this.PropertyCollector.RetrieveProperties.apply( this, arguments ).catch(e => e); }
  RetrievePropertiesEx() { return this.PropertyCollector.RetrievePropertiesEx.apply( this, arguments ).catch(e => e); }
  RetrieveRolePermissions() { return this.AuthorizationManager.RetrieveRolePermissions.apply( this, arguments ).catch(e => e); }
  RetrieveSelfSignedClientCert() { return this.CryptoManagerKmip.RetrieveSelfSignedClientCert.apply( this, arguments ).catch(e => e); }
  RetrieveServiceContent() { return this.ServiceInstance.RetrieveServiceContent.apply( this, arguments ).catch(e => e); }
  RetrieveSnapshotInfo() { return this.VcenterVStorageObjectManager.RetrieveSnapshotInfo.apply( this, arguments ).catch(e => e); }
  RetrieveUserGroups() { return this.UserDirectory.RetrieveUserGroups.apply( this, arguments ).catch(e => e); }
  RetrieveVStorageInfrastructureObjectPolicy() { return this.VcenterVStorageObjectManager.RetrieveVStorageInfrastructureObjectPolicy.apply( this, arguments ).catch(e => e); }
  RetrieveVStorageObject() { return this.VcenterVStorageObjectManager.RetrieveVStorageObject.apply( this, arguments ).catch(e => e); }
  RetrieveVStorageObjectAssociations() { return this.VcenterVStorageObjectManager.RetrieveVStorageObjectAssociations.apply( this, arguments ).catch(e => e); }
  RetrieveVStorageObjectState() { return this.VcenterVStorageObjectManager.RetrieveVStorageObjectState.apply( this, arguments ).catch(e => e); }
  RevertToCurrentSnapshot_Task() { return this.VirtualMachine.RevertToCurrentSnapshot_Task.apply( this, arguments ).catch(e => e); }
  RevertToSnapshot_Task(connectionData: ConnectionData,
                        managedVMSnapshot: ManagedObjectReference & { $type: 'VirtualMachineSnapshot' },
                        managedHost?: ManagedObjectReference & { $type: 'HostSystem' },
                        suppressPowerOn: boolean = false,
                        returnOnTaskFinish: boolean = true) { return this.VirtualMachineSnapshot.RevertToSnapshot_Task.apply( this, arguments ).catch(e => e); }
  RevertVStorageObject_Task() { return this.VcenterVStorageObjectManager.RevertVStorageObject_Task.apply( this, arguments ).catch(e => e); }
  RewindCollector() { return this.HistoryCollector.RewindCollector.apply( this, arguments ).catch(e => e); }
  RunScheduledTask() { return this.ScheduledTask.RunScheduledTask.apply( this, arguments ).catch(e => e); }
  RunVsanPhysicalDiskDiagnostics() { return this.HostVsanInternalSystem.RunVsanPhysicalDiskDiagnostics.apply( this, arguments ).catch(e => e); }
  ScanHostPatch_Task() { return this.HostPatchManager.ScanHostPatch_Task.apply( this, arguments ).catch(e => e); }
  ScanHostPatchV2_Task() { return this.HostPatchManager.ScanHostPatchV2_Task.apply( this, arguments ).catch(e => e); }
  ScheduleReconcileDatastoreInventory() { return this.VcenterVStorageObjectManager.ScheduleReconcileDatastoreInventory.apply( this, arguments ).catch(e => e); }
  SearchDatastore_Task(connectionData: ConnectionData,
                       managedDatastoreBrowser: ManagedObjectReference & { $type: 'HostDatastoreBrowser' },
                       datastoreName: string,
                       path: string,
                       searchSpec?: HostDatastoreBrowserSearchSpec,
                       returnOnTaskFinish: boolean = true) { return this.HostDatastoreBrowser.SearchDatastore_Task.apply( this, arguments ).catch(e => e); }
  SearchDatastoreSubFolders_Task() { return this.HostDatastoreBrowser.SearchDatastoreSubFolders_Task.apply( this, arguments ).catch(e => e); }
  SelectActivePartition() { return this.HostDiagnosticSystem.SelectActivePartition.apply( this, arguments ).catch(e => e); }
  SelectVnic() { return this.HostVMotionSystem.SelectVnic.apply( this, arguments ).catch(e => e); }
  SelectVnicForNicType() { return this.HostVirtualNicManager.SelectVnicForNicType.apply( this, arguments ).catch(e => e); }
  SendNMI() { return this.VirtualMachine.SendNMI.apply( this, arguments ).catch(e => e); }
  SendTestNotification() { return this.HostSnmpSystem.SendTestNotification.apply( this, arguments ).catch(e => e); }
  SessionIsActive() { return this.SessionManager.SessionIsActive.apply( this, arguments ).catch(e => e); }
  setClusterMode_Task() { return this.FailoverClusterManager.setClusterMode_Task.apply( this, arguments ).catch(e => e); }
  SetCollectorPageSize() { return this.HistoryCollector.SetCollectorPageSize.apply( this, arguments ).catch(e => e); }
  setCustomValue() { return this.ExtensibleManagedObject.setCustomValue.apply( this, arguments ).catch(e => e); }
  SetDisplayTopology() { return this.VirtualMachine.SetDisplayTopology.apply( this, arguments ).catch(e => e); }
  SetEntityPermissions() { return this.AuthorizationManager.SetEntityPermissions.apply( this, arguments ).catch(e => e); }
  SetExtensionCertificate() { return this.ExtensionManager.SetExtensionCertificate.apply( this, arguments ).catch(e => e); }
  SetField() { return this.CustomFieldsManager.SetField.apply( this, arguments ).catch(e => e); }
  SetLicenseEdition() { return this.LicenseManager.SetLicenseEdition.apply( this, arguments ).catch(e => e); }
  SetLocale() { return this.SessionManager.SetLocale.apply( this, arguments ).catch(e => e); }
  SetMultipathLunPolicy() { return this.HostStorageSystem.SetMultipathLunPolicy.apply( this, arguments ).catch(e => e); }
  SetNFSUser() { return this.HostStorageSystem.SetNFSUser.apply( this, arguments ).catch(e => e); }
  SetPublicKey() { return this.ExtensionManager.SetPublicKey.apply( this, arguments ).catch(e => e); }
  SetRegistryValueInGuest() { return this.GuestWindowsRegistryManager.SetRegistryValueInGuest.apply( this, arguments ).catch(e => e); }
  SetScreenResolution() { return this.VirtualMachine.SetScreenResolution.apply( this, arguments ).catch(e => e); }
  SetTaskDescription() { return this.Task.SetTaskDescription.apply( this, arguments ).catch(e => e); }
  SetTaskState(connectionData: ConnectionData,
               managedTask: ManagedObjectReference & { $type: 'Task' },
               state: TaskInfoState,
               result?: any,
               fault?: MethodFault) { return this.Task.SetTaskState.apply( this, arguments ).catch(e => e); }
  SetVirtualDiskUuid() { return this.VirtualDiskManager.SetVirtualDiskUuid.apply( this, arguments ).catch(e => e); }
  SetVStorageObjectControlFlags() { return this.VcenterVStorageObjectManager.SetVStorageObjectControlFlags.apply( this, arguments ).catch(e => e); }
  ShrinkVirtualDisk_Task() { return this.VirtualDiskManager.ShrinkVirtualDisk_Task.apply( this, arguments ).catch(e => e); }
  ShutdownGuest(connectionData: ConnectionData,
                managedVM: ManagedObjectReference & { $type: 'VirtualMachine' }) { return this.VirtualMachine.ShutdownGuest.apply( this, arguments ).catch(e => e); }
  ShutdownHost_Task() { return this.HostSystem.ShutdownHost_Task.apply( this, arguments ).catch(e => e); }
  StageHostPatch_Task() { return this.HostPatchManager.StageHostPatch_Task.apply( this, arguments ).catch(e => e); }
  StampAllRulesWithUuid_Task() { return this.ClusterComputeResource.StampAllRulesWithUuid_Task.apply( this, arguments ).catch(e => e); }
  StandbyGuest() { return this.VirtualMachine.StandbyGuest.apply( this, arguments ).catch(e => e); }
  StartProgramInGuest() { return this.GuestProcessManager.StartProgramInGuest.apply( this, arguments ).catch(e => e); }
  StartRecording_Task() { return this.VirtualMachine.StartRecording_Task.apply( this, arguments ).catch(e => e); }
  StartReplaying_Task() { return this.VirtualMachine.StartReplaying_Task.apply( this, arguments ).catch(e => e); }
  StartService() { return this.HostServiceSystem.StartService.apply( this, arguments ).catch(e => e); }
  StopRecording_Task() { return this.VirtualMachine.StopRecording_Task.apply( this, arguments ).catch(e => e); }
  StopReplaying_Task() { return this.VirtualMachine.StopReplaying_Task.apply( this, arguments ).catch(e => e); }
  StopService() { return this.HostServiceSystem.StopService.apply( this, arguments ).catch(e => e); }
  SuspendVApp_Task() { return this.VirtualApp.SuspendVApp_Task.apply( this, arguments ).catch(e => e); }
  SuspendVM_Task(connectionData: ConnectionData,
                 managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
                 returnOnTaskFinish: boolean = true) { return this.VirtualMachine.SuspendVM_Task.apply( this, arguments ).catch(e => e); }
  TerminateFaultTolerantVM_Task() { return this.VirtualMachine.TerminateFaultTolerantVM_Task.apply( this, arguments ).catch(e => e); }
  TerminateProcessInGuest() { return this.GuestProcessManager.TerminateProcessInGuest.apply( this, arguments ).catch(e => e); }
  TerminateSession() { return this.SessionManager.TerminateSession.apply( this, arguments ).catch(e => e); }
  TerminateVM() { return this.VirtualMachine.TerminateVM.apply( this, arguments ).catch(e => e); }
  TurnDiskLocatorLedOff_Task() { return this.HostStorageSystem.TurnDiskLocatorLedOff_Task.apply( this, arguments ).catch(e => e); }
  TurnDiskLocatorLedOn_Task() { return this.HostStorageSystem.TurnDiskLocatorLedOn_Task.apply( this, arguments ).catch(e => e); }
  TurnOffFaultToleranceForVM_Task() { return this.VirtualMachine.TurnOffFaultToleranceForVM_Task.apply( this, arguments ).catch(e => e); }
  UnassignUserFromGroup() { return this.HostLocalAccountManager.UnassignUserFromGroup.apply( this, arguments ).catch(e => e); }
  UnbindVnic() { return this.IscsiManager.UnbindVnic.apply( this, arguments ).catch(e => e); }
  UninstallHostPatch_Task() { return this.HostPatchManager.UninstallHostPatch_Task.apply( this, arguments ).catch(e => e); }
  UninstallIoFilter_Task() { return this.IoFilterManager.UninstallIoFilter_Task.apply( this, arguments ).catch(e => e); }
  UninstallService() { return this.HostServiceSystem.UninstallService.apply( this, arguments ).catch(e => e); }
  UnmapVmfsVolumeEx_Task() { return this.HostStorageSystem.UnmapVmfsVolumeEx_Task.apply( this, arguments ).catch(e => e); }
  UnmountDiskMapping_Task() { return this.HostVsanSystem.UnmountDiskMapping_Task.apply( this, arguments ).catch(e => e); }
  UnmountForceMountedVmfsVolume() { return this.HostStorageSystem.UnmountForceMountedVmfsVolume.apply( this, arguments ).catch(e => e); }
  UnmountToolsInstaller() { return this.VirtualMachine.UnmountToolsInstaller.apply( this, arguments ).catch(e => e); }
  UnmountVffsVolume() { return this.HostStorageSystem.UnmountVffsVolume.apply( this, arguments ).catch(e => e); }
  UnmountVmfsVolume() { return this.HostStorageSystem.UnmountVmfsVolume.apply( this, arguments ).catch(e => e); }
  UnmountVmfsVolumeEx_Task() { return this.HostStorageSystem.UnmountVmfsVolumeEx_Task.apply( this, arguments ).catch(e => e); }
  UnregisterAndDestroy_Task() { return this.Folder.UnregisterAndDestroy_Task.apply( this, arguments ).catch(e => e); }
  UnregisterExtension() { return this.ExtensionManager.UnregisterExtension.apply( this, arguments ).catch(e => e); }
  UnregisterHealthUpdateProvider() { return this.HealthUpdateManager.UnregisterHealthUpdateProvider.apply( this, arguments ).catch(e => e); }
  unregisterVApp_Task() { return this.VirtualApp.unregisterVApp_Task.apply( this, arguments ).catch(e => e); }
  UnregisterVM(connectionData: ConnectionData,
               managedVM: ManagedObjectReference & { $type: 'VirtualMachine' }) { return this.VirtualMachine.UnregisterVM.apply( this, arguments ).catch(e => e); }
  UpdateAnswerFile_Task() { return this.HostProfileManager.UpdateAnswerFile_Task.apply( this, arguments ).catch(e => e); }
  UpdateAssignedLicense() { return this.LicenseAssignmentManager.UpdateAssignedLicense.apply( this, arguments ).catch(e => e); }
  UpdateAuthorizationRole() { return this.AuthorizationManager.UpdateAuthorizationRole.apply( this, arguments ).catch(e => e); }
  UpdateBootDevice() { return this.HostBootDeviceSystem.UpdateBootDevice.apply( this, arguments ).catch(e => e); }
  UpdateChildResourceConfiguration() { return this.ResourcePool.UpdateChildResourceConfiguration.apply( this, arguments ).catch(e => e); }
  UpdateClusterProfile() { return this.ClusterProfile.UpdateClusterProfile.apply( this, arguments ).catch(e => e); }
  UpdateConfig() { return this.ResourcePool.UpdateConfig.apply( this, arguments ).catch(e => e); }
  UpdateConsoleIpRouteConfig() { return this.HostNetworkSystem.UpdateConsoleIpRouteConfig.apply( this, arguments ).catch(e => e); }
  UpdateCounterLevelMapping() { return this.PerformanceManager.UpdateCounterLevelMapping.apply( this, arguments ).catch(e => e); }
  UpdateDateTime() { return this.HostDateTimeSystem.UpdateDateTime.apply( this, arguments ).catch(e => e); }
  UpdateDateTimeConfig() { return this.HostDateTimeSystem.UpdateDateTimeConfig.apply( this, arguments ).catch(e => e); }
  UpdateDefaultPolicy() { return this.HostFirewallSystem.UpdateDefaultPolicy.apply( this, arguments ).catch(e => e); }
  UpdateDiskPartitions() { return this.HostStorageSystem.UpdateDiskPartitions.apply( this, arguments ).catch(e => e); }
  UpdateDnsConfig() { return this.HostNetworkSystem.UpdateDnsConfig.apply( this, arguments ).catch(e => e); }
  UpdateDvsCapability() { return this.DistributedVirtualSwitch.UpdateDvsCapability.apply( this, arguments ).catch(e => e); }
  UpdateDVSHealthCheckConfig_Task() { return this.DistributedVirtualSwitch.UpdateDVSHealthCheckConfig_Task.apply( this, arguments ).catch(e => e); }
  UpdateDVSLacpGroupConfig_Task() { return this.VmwareDistributedVirtualSwitch.UpdateDVSLacpGroupConfig_Task.apply( this, arguments ).catch(e => e); }
  UpdateExtension() { return this.ExtensionManager.UpdateExtension.apply( this, arguments ).catch(e => e); }
  UpdateFlags() { return this.HostSystem.UpdateFlags.apply( this, arguments ).catch(e => e); }
  UpdateGraphicsConfig() { return this.HostGraphicsManager.UpdateGraphicsConfig.apply( this, arguments ).catch(e => e); }
  UpdateHostCustomizations_Task() { return this.HostProfileManager.UpdateHostCustomizations_Task.apply( this, arguments ).catch(e => e); }
  UpdateHostImageAcceptanceLevel() { return this.HostImageConfigManager.UpdateHostImageAcceptanceLevel.apply( this, arguments ).catch(e => e); }
  UpdateHostProfile() { return this.HostProfile.UpdateHostProfile.apply( this, arguments ).catch(e => e); }
  UpdateHostSpecification() { return this.HostSpecificationManager.UpdateHostSpecification.apply( this, arguments ).catch(e => e); }
  UpdateHostSubSpecification() { return this.HostSpecificationManager.UpdateHostSubSpecification.apply( this, arguments ).catch(e => e); }
  UpdateInternetScsiAdvancedOptions() { return this.HostStorageSystem.UpdateInternetScsiAdvancedOptions.apply( this, arguments ).catch(e => e); }
  UpdateInternetScsiAlias() { return this.HostStorageSystem.UpdateInternetScsiAlias.apply( this, arguments ).catch(e => e); }
  UpdateInternetScsiAuthenticationProperties() { return this.HostStorageSystem.UpdateInternetScsiAuthenticationProperties.apply( this, arguments ).catch(e => e); }
  UpdateInternetScsiDigestProperties() { return this.HostStorageSystem.UpdateInternetScsiDigestProperties.apply( this, arguments ).catch(e => e); }
  UpdateInternetScsiDiscoveryProperties() { return this.HostStorageSystem.UpdateInternetScsiDiscoveryProperties.apply( this, arguments ).catch(e => e); }
  UpdateInternetScsiIPProperties() { return this.HostStorageSystem.UpdateInternetScsiIPProperties.apply( this, arguments ).catch(e => e); }
  UpdateInternetScsiName() { return this.HostStorageSystem.UpdateInternetScsiName.apply( this, arguments ).catch(e => e); }
  UpdateIpConfig() { return this.HostVMotionSystem.UpdateIpConfig.apply( this, arguments ).catch(e => e); }
  UpdateIpmi() { return this.HostSystem.UpdateIpmi.apply( this, arguments ).catch(e => e); }
  UpdateIpPool() { return this.IpPoolManager.UpdateIpPool.apply( this, arguments ).catch(e => e); }
  UpdateIpRouteConfig() { return this.HostNetworkSystem.UpdateIpRouteConfig.apply( this, arguments ).catch(e => e); }
  UpdateIpRouteTableConfig() { return this.HostNetworkSystem.UpdateIpRouteTableConfig.apply( this, arguments ).catch(e => e); }
  UpdateKmipServer() { return this.CryptoManagerKmip.UpdateKmipServer.apply( this, arguments ).catch(e => e); }
  UpdateKmsSignedCsrClientCert() { return this.CryptoManagerKmip.UpdateKmsSignedCsrClientCert.apply( this, arguments ).catch(e => e); }
  UpdateLicense() { return this.LicenseManager.UpdateLicense.apply( this, arguments ).catch(e => e); }
  UpdateLicenseLabel() { return this.LicenseManager.UpdateLicenseLabel.apply( this, arguments ).catch(e => e); }
  UpdateLinkedChildren() { return this.VirtualApp.UpdateLinkedChildren.apply( this, arguments ).catch(e => e); }
  UpdateLocalSwapDatastore() { return this.HostDatastoreSystem.UpdateLocalSwapDatastore.apply( this, arguments ).catch(e => e); }
  UpdateLockdownExceptions() { return this.HostAccessManager.UpdateLockdownExceptions.apply( this, arguments ).catch(e => e); }
  UpdateModuleOptionString() { return this.HostKernelModuleSystem.UpdateModuleOptionString.apply( this, arguments ).catch(e => e); }
  UpdateNetworkConfig() { return this.HostNetworkSystem.UpdateNetworkConfig.apply( this, arguments ).catch(e => e); }
  UpdateNetworkResourcePool() { return this.DistributedVirtualSwitch.UpdateNetworkResourcePool.apply( this, arguments ).catch(e => e); }
  UpdateOptions() { return this.OptionManager.UpdateOptions.apply( this, arguments ).catch(e => e); }
  UpdatePassthruConfig() { return this.HostPciPassthruSystem.UpdatePassthruConfig.apply( this, arguments ).catch(e => e); }
  UpdatePerfInterval() { return this.PerformanceManager.UpdatePerfInterval.apply( this, arguments ).catch(e => e); }
  UpdatePhysicalNicLinkSpeed() { return this.HostNetworkSystem.UpdatePhysicalNicLinkSpeed.apply( this, arguments ).catch(e => e); }
  UpdatePortGroup() { return this.HostNetworkSystem.UpdatePortGroup.apply( this, arguments ).catch(e => e); }
  UpdateProgress(connectionData: ConnectionData,
                 managedTask: ManagedObjectReference & { $type: 'Task' },
                 percentDone: number) { return this.Task.UpdateProgress.apply( this, arguments ).catch(e => e); }
  UpdateReferenceHost() { return this.HostProfile.UpdateReferenceHost.apply( this, arguments ).catch(e => e); }
  UpdateRuleset(connectionData: ConnectionData,
                managedFirewallSystem: ManagedObjectReference & { $type: 'HostFirewallSystem' },
                id: string,
                spec: HostFirewallRulesetRulesetSpec) { return this.HostFirewallSystem.UpdateRuleset.apply( this, arguments ).catch(e => e); }
  UpdateScsiLunDisplayName() { return this.HostStorageSystem.UpdateScsiLunDisplayName.apply( this, arguments ).catch(e => e); }
  UpdateSelfSignedClientCert() { return this.CryptoManagerKmip.UpdateSelfSignedClientCert.apply( this, arguments ).catch(e => e); }
  UpdateServiceConsoleVirtualNic() { return this.HostNetworkSystem.UpdateServiceConsoleVirtualNic.apply( this, arguments ).catch(e => e); }
  UpdateServiceMessage() { return this.SessionManager.UpdateServiceMessage.apply( this, arguments ).catch(e => e); }
  UpdateServicePolicy() { return this.HostServiceSystem.UpdateServicePolicy.apply( this, arguments ).catch(e => e); }
  UpdateSoftwareInternetScsiEnabled() { return this.HostStorageSystem.UpdateSoftwareInternetScsiEnabled.apply( this, arguments ).catch(e => e); }
  UpdateSystemResources() { return this.HostSystem.UpdateSystemResources.apply( this, arguments ).catch(e => e); }
  UpdateSystemSwapConfiguration() { return this.HostSystem.UpdateSystemSwapConfiguration.apply( this, arguments ).catch(e => e); }
  UpdateSystemUsers() { return this.HostAccessManager.UpdateSystemUsers.apply( this, arguments ).catch(e => e); }
  UpdateUser() { return this.HostLocalAccountManager.UpdateUser.apply( this, arguments ).catch(e => e); }
  UpdateVAppConfig() { return this.VirtualApp.UpdateVAppConfig.apply( this, arguments ).catch(e => e); }
  UpdateVirtualMachineFiles_Task() { return this.Datastore.UpdateVirtualMachineFiles_Task.apply( this, arguments ).catch(e => e); }
  UpdateVirtualNic() { return this.HostNetworkSystem.UpdateVirtualNic.apply( this, arguments ).catch(e => e); }
  UpdateVirtualSwitch() { return this.HostNetworkSystem.UpdateVirtualSwitch.apply( this, arguments ).catch(e => e); }
  UpdateVmfsUnmapBandwidth() { return this.HostStorageSystem.UpdateVmfsUnmapBandwidth.apply( this, arguments ).catch(e => e); }
  UpdateVmfsUnmapPriority() { return this.HostStorageSystem.UpdateVmfsUnmapPriority.apply( this, arguments ).catch(e => e); }
  UpdateVsan_Task() { return this.HostVsanSystem.UpdateVsan_Task.apply( this, arguments ).catch(e => e); }
  UpdateVStorageInfrastructureObjectPolicy_Task() { return this.VcenterVStorageObjectManager.UpdateVStorageInfrastructureObjectPolicy_Task.apply( this, arguments ).catch(e => e); }
  UpdateVStorageObjectPolicy_Task() { return this.VcenterVStorageObjectManager.UpdateVStorageObjectPolicy_Task.apply( this, arguments ).catch(e => e); }
  UpdateVVolVirtualMachineFiles_Task() { return this.Datastore.UpdateVVolVirtualMachineFiles_Task.apply( this, arguments ).catch(e => e); }
  UpgradeIoFilter_Task() { return this.IoFilterManager.UpgradeIoFilter_Task.apply( this, arguments ).catch(e => e); }
  UpgradeTools_Task() { return this.VirtualMachine.UpgradeTools_Task.apply( this, arguments ).catch(e => e); }
  UpgradeVM_Task() { return this.VirtualMachine.UpgradeVM_Task.apply( this, arguments ).catch(e => e); }
  UpgradeVmfs() { return this.HostStorageSystem.UpgradeVmfs.apply( this, arguments ).catch(e => e); }
  UpgradeVmLayout() { return this.HostStorageSystem.UpgradeVmLayout.apply( this, arguments ).catch(e => e); }
  UpgradeVsanObjects() { return this.HostVsanInternalSystem.UpgradeVsanObjects.apply( this, arguments ).catch(e => e); }
  UploadClientCert() { return this.CryptoManagerKmip.UploadClientCert.apply( this, arguments ).catch(e => e); }
  UploadKmipServerCert() { return this.CryptoManagerKmip.UploadKmipServerCert.apply( this, arguments ).catch(e => e); }
  ValidateCredentialsInGuest() { return this.GuestAuthManager.ValidateCredentialsInGuest.apply( this, arguments ).catch(e => e); }
  ValidateHost() { return this.OvfManager.ValidateHost.apply( this, arguments ).catch(e => e); }
  ValidateHostProfileComposition_Task() { return this.HostProfileManager.ValidateHostProfileComposition_Task.apply( this, arguments ).catch(e => e); }
  ValidateMigration() { return this.ServiceInstance.ValidateMigration.apply( this, arguments ).catch(e => e); }
  ValidateStoragePodConfig() { return this.StorageResourceManager.ValidateStoragePodConfig.apply( this, arguments ).catch(e => e); }
  VStorageObjectCreateSnapshot_Task() { return this.VcenterVStorageObjectManager.VStorageObjectCreateSnapshot_Task.apply( this, arguments ).catch(e => e); }
  WaitForUpdates() { return this.PropertyCollector.WaitForUpdates.apply( this, arguments ).catch(e => e); }
  WaitForUpdatesEx(connectionData: ConnectionData,
                   options?: WaitOptions,
                   version?: string) { return this.PropertyCollector.WaitForUpdatesEx.apply( this, arguments ).catch(e => e); }
  XmlToCustomizationSpecItem() { return this.CustomizationSpecManager.XmlToCustomizationSpecItem.apply( this, arguments ).catch(e => e); }
  ZeroFillVirtualDisk_Task() { return this.VirtualDiskManager.ZeroFillVirtualDisk_Task.apply( this, arguments ).catch(e => e); }

  /**
   * BASIC
   */
  getClientVersion(connectionData: ConnectionData): Promise<any> {
    return this.http.post('/api/vmware/getClientVersion', {
      host: connectionData.host,
      port: connectionData.port,
    }).pipe(map((res: any) => {
        return this.SysosLibVmwareHelper.validResponse(res.data.ConfigRoot.clientConnection[0]);
      },
      error => {
        this.logger.error('[VMWare] -> getClientVersion -> Error while doing the call -> ', error);
      })).toPromise();
  }

  connectvCenter(connectionData: ConnectionData): Promise<any> {
    return this.http.post('/api/vmware/connect', {
      host: connectionData.host,
      port: connectionData.port,
      credential: connectionData.credential
    }).pipe(map((data: any) => {
        return this.SysosLibVmwareHelper.validResponse(data.data);
      },
      error => {
        this.logger.error('[VMWare] -> connectvCenter -> Error while doing the call -> ', error);
      })).toPromise();
  }

  connectvCenterSoap(connectionData: ConnectionData): Promise<any> {
    return this.http.post('/api/vmware/connectSoap', {
      host: connectionData.host,
      port: connectionData.port,
      credential: connectionData.credential
    }).pipe(map((data: any) => {
        return this.SysosLibVmwareHelper.validResponse(data.data);
      },
      error => {
        this.logger.error('[VMWare] -> connectvCenterSoap -> Error while doing the call -> ', error);
      })).toPromise();
  }

  /**
   * CUSTOM FUNCTIONS
   */

  /**
   * Host
   */
  getComputeResource(connectionData: ConnectionData, computeResource: string): Promise<any> {

    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'ComputeResource',
        all: true
      }],
      objectSet: [{
        obj: {
          $type: 'ComputeResource',
          _value: computeResource
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getClusterComputeResource(connectionData: ConnectionData, clusterComputeResource: string): Promise<any> {

    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'ClusterComputeResource',
        all: true
      }],
      objectSet: [{
        obj: {
          $type: 'ClusterComputeResource',
          _value: clusterComputeResource
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getResourcePool(connectionData: ConnectionData, resourcePool: string): Promise<any> {

    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'ResourcePool',
        all: true
      }],
      objectSet: [{
        obj: {
          $type: 'ResourcePool',
          _value: resourcePool
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(RetrievePropertiesResponse.data.returnval[0]));
    });

  }

  getHosts(connectionData: ConnectionData, datacenterFolder: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostSystem',
        all: true
      }],
      objectSet: [{
        obj: {
          $type: 'Folder',
          _value: datacenterFolder
        },
        skip: false,
        selectSet: [
          ({
            name: 'folderTraversalSpec',
            type: 'Folder',
            path: 'childEntity',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              },
              {
                name: 'datacenterHostTraversalSpec'
              },
              {
                name: 'datacenterVmTraversalSpec'
              },
              {
                name: 'datacenterDatastoreTraversalSpec'
              },
              {
                name: 'datacenterNetworkTraversalSpec'
              },
              {
                name: 'computeResourceRpTraversalSpec'
              },
              {
                name: 'computeResourceHostTraversalSpec'
              },
              {
                name: 'hostVmTraversalSpec'
              },
              {
                name: 'resourcePoolVmTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'datacenterDatastoreTraversalSpec',
            type: 'Datacenter',
            path: 'datastoreFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'datacenterNetworkTraversalSpec',
            type: 'Datacenter',
            path: 'networkFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'datacenterVmTraversalSpec',
            type: 'Datacenter',
            path: 'vmFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'datacenterHostTraversalSpec',
            type: 'Datacenter',
            path: 'hostFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'computeResourceHostTraversalSpec',
            type: 'ComputeResource',
            path: 'host',
            skip: false
          } as TraversalSpec),
          ({
            name: 'computeResourceRpTraversalSpec',
            type: 'ComputeResource',
            path: 'resourcePool',
            skip: false,
            selectSet: [
              {
                name: 'resourcePoolTraversalSpec'
              },
              {
                name: 'resourcePoolVmTraversalSpec'
              }
            ]
          }as TraversalSpec),
          ({
            name: 'resourcePoolTraversalSpec',
            type: 'ResourcePool',
            path: 'resourcePool',
            skip: false,
            selectSet: [
              {
                name: 'resourcePoolTraversalSpec'
              },
              {
                name: 'resourcePoolVmTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'hostVmTraversalSpec',
            type: 'HostSystem',
            path: 'vm',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'resourcePoolVmTraversalSpec',
            type: 'ResourcePool',
            path: 'vm',
            skip: false
          }as TraversalSpec)
        ]
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getHost(connectionData: ConnectionData, esxiHost: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostSystem',
        all: true
      }],
      objectSet: [{
        obj: {
          $type: 'HostSystem',
          _value: esxiHost
        },
        skip: false,
        selectSet: [
          ({
            name: 'folderTraversalSpec',
            type: 'Folder',
            path: 'childEntity',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              },
              {
                name: 'datacenterHostTraversalSpec'
              },
              {
                name: 'datacenterVmTraversalSpec'
              },
              {
                name: 'datacenterDatastoreTraversalSpec'
              },
              {
                name: 'datacenterNetworkTraversalSpec'
              },
              {
                name: 'computeResourceRpTraversalSpec'
              },
              {
                name: 'computeResourceHostTraversalSpec'
              },
              {
                name: 'hostVmTraversalSpec'
              },
              {
                name: 'resourcePoolVmTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'datacenterDatastoreTraversalSpec',
            type: 'Datacenter',
            path: 'datastoreFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'datacenterNetworkTraversalSpec',
            type: 'Datacenter',
            path: 'networkFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'datacenterVmTraversalSpec',
            type: 'Datacenter',
            path: 'vmFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'datacenterHostTraversalSpec',
            type: 'Datacenter',
            path: 'hostFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'computeResourceHostTraversalSpec',
            type: 'ComputeResource',
            path: 'host',
            skip: false
          } as TraversalSpec),
          ({
            name: 'computeResourceRpTraversalSpec',
            type: 'ComputeResource',
            path: 'resourcePool',
            skip: false,
            selectSet: [
              {
                name: 'resourcePoolTraversalSpec'
              },
              {
                name: 'resourcePoolVmTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'resourcePoolTraversalSpec',
            type: 'ResourcePool',
            path: 'resourcePool',
            skip: false,
            selectSet: [
              {
                name: 'resourcePoolTraversalSpec'
              },
              {
                name: 'resourcePoolVmTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'hostVmTraversalSpec',
            type: 'HostSystem',
            path: 'vm',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          } as TraversalSpec),
          ({
            name: 'resourcePoolVmTraversalSpec',
            type: 'ResourcePool',
            path: 'vm',
            skip: false
          } as TraversalSpec)
        ]
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(RetrievePropertiesResponse.data.returnval[0]));
    });
  }

  getHostStorageSystem(connectionData: ConnectionData, esxiHost: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostSystem',
        all: false,
        pathSet: [
          'configManager.storageSystem'
        ]
      }],
      objectSet: [{
        obj: {
          $type: 'HostSystem',
          _value: esxiHost
        }
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(RetrievePropertiesResponse.data.returnval[0].propSet[0].val[0]._);
    });

  }

  getHostFirewallSystem(connectionData: ConnectionData, esxiHost: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostSystem',
        all: false,
        pathSet: [
          'configManager.firewallSystem'
        ]
      }],
      objectSet: [{
        obj: {
          $type: 'HostSystem',
          _value: esxiHost
        }
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(RetrievePropertiesResponse.data.returnval[0].propSet[0].val[0]._);
    });
  }

  getHostFirewallRules(connectionData: ConnectionData, esxiHost: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostSystem',
        all: false,
        pathSet: [
          'config.firewall'
        ]
      }],
      objectSet: [{
        obj: {
          $type: 'HostSystem',
          _value: esxiHost
        }
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(RetrievePropertiesResponse.data.returnval[0].propSet[0].val[0]));
    });

  }

  getHostStorageSystemData(connectionData: ConnectionData, storageSystem: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostStorageSystem',
        all: false,
        pathSet: [
          'storageDeviceInfo',
          'fileSystemVolumeInfo'
        ]
      }],
      objectSet: [{
        obj: {
          $type: 'HostStorageSystem',
          _value: storageSystem
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getHostConnectionState(connectionData: ConnectionData, esxiHost: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostSystem',
        all: false,
        pathSet: [
          'runtime.connectionState'
        ]
      }],
      objectSet: [{
        obj: {
          $type: 'HostSystem',
          _value: esxiHost
        }
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(RetrievePropertiesResponse.data.returnval[0].propSet[0].val[0]._);
    });

  }

  getHostConfigManagerNetworkSystem(connectionData: ConnectionData, esxiHost: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostSystem',
        all: false,
        pathSet: [
          'configManager.networkSystem'
        ]
      }],
      objectSet: [{
        obj: {
          $type: 'HostSystem',
          _value: esxiHost
        }
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(RetrievePropertiesResponse.data.returnval[0].propSet[0].val[0]._);
    });

  }

  getHostConfigManagerDatastoreSystem(connectionData: ConnectionData, esxiHost: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostSystem',
        all: false,
        pathSet: [
          'configManager.datastoreSystem'
        ]
      }],
      objectSet: [{
        obj: {
          $type: 'HostSystem',
          _value: esxiHost
        }
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(RetrievePropertiesResponse.data.returnval[0].propSet[0].val[0]._);
    });

  }

  getHostNetworkInfoVnic(connectionData: ConnectionData, networkSystem: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostNetworkSystem',
        all: false,
        pathSet: [
          'networkInfo.vnic'
        ]
      }],
      objectSet: [{
        obj: {
          $type: 'HostNetworkSystem',
          _value: networkSystem
        }
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getHostNetworkInfoConsoleVnic(connectionData: ConnectionData, networkSystem: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostNetworkSystem',
        all: false,
        pathSet: [
          'networkInfo.consoleVnic'
        ]
      }],
      objectSet: [{
        obj: {
          $type: 'HostNetworkSystem',
          _value: networkSystem
        }
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  /**
   * Datastore
   */
  getDatastores(connectionData: ConnectionData, datacenterFolder: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'Datastore',
        all: true
      }],
      objectSet: [{
        obj: {
          $type: 'Folder',
          _value: datacenterFolder
        },
        skip: true,
        selectSet: [
          ({
            '$xsi:type': 'TraversalSpec',
            type: 'Folder',
            path: 'childEntity',
            skip: true,
            selectSet: [
              ({
                type: 'Datacenter',
                path: 'datastore',
                skip: false
              } as TraversalSpec)
            ]
          } as TraversalSpec)
        ]
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getDatastoreProps(connectionData: ConnectionData, datastore: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'Datastore',
        all: true
      }],
      objectSet: [{
        obj: {
          $type: 'Datastore',
          _value: datastore
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(RetrievePropertiesResponse.data.returnval[0]));
    });

  }

  getDatastoresWithVMsData(connectionData: ConnectionData, datacenterFolder: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [
        {
          type: 'Datastore',
          all: false,
          pathSet: ['info', 'host', 'vm']
        },
        {
          type: 'VirtualMachine',
          all: false,
          pathSet: ['config', 'layout', 'runtime']
        }
      ],
      objectSet: [{
        obj: {
          $type: 'Folder',
          _value: datacenterFolder
        },
        skip: true,
        selectSet: [
          ({
            name: 'visitFolders',
            type: 'Folder',
            path: 'childEntity',
            skip: true,
            selectSet: [
              {
                name: 'visitFolders'
              },
              {
                type: 'Datacenter',
                path: 'datastore',
                skip: false,
                selectSet: [
                  {
                    type: 'Datacenter',
                    path: 'vm',
                    skip: false
                  }
                ]
              },
              {
                type: 'Datastore',
                path: 'vm',
                skip: false
              }
            ]
          } as TraversalSpec)
        ]
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getVMFileDataFromDatastore(connectionData: ConnectionData, datastore: string, datastoreName: string, path: string, vmxFile: string): Promise<any> {
    return this.SearchDatastore_Task(
      connectionData,
      {$type: 'HostDatastoreBrowser', _value: datastore},
      datastoreName,
      path,
      {
        details: {
          fileType: true,
          fileSize: true,
          modification: true,
          fileOwner: false
        },
        matchPattern: [vmxFile]
      },
      true
    ).then((SearchDatastoreTaskResponse) => {
      return this.SysosLibVmwareHelper.validResponse(SearchDatastoreTaskResponse);
    });
  }

  getFilesDataFromDatastore(connectionData: ConnectionData, datastore: string, datastoreName: string, path: string): Promise<any> {
    return this.SearchDatastore_Task(
      connectionData,
      {$type: 'HostDatastoreBrowser', _value: datastore},
      datastoreName,
      path,
      {
        details: {
          fileType: true,
          fileSize: true,
          modification: true,
          fileOwner: false
        }
      },
      true
    ).then((SearchDatastoreTaskResponse) => {
      return this.SysosLibVmwareHelper.validResponse(SearchDatastoreTaskResponse);
    });
  }

  /**
   * VM
   */
  getVMs(connectionData: ConnectionData, datacenterFolder: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [
        {
          type: 'VirtualMachine',
          all: true
        }
      ],
      objectSet: [{
        obj: {
          $type: 'Folder',
          _value: datacenterFolder
        },
        skip: true,
        selectSet: [
          ({
            name: 'visitFolders',
            type: 'Folder',
            path: 'childEntity',
            skip: true,
            selectSet: [
              {
                name: 'visitFolders'
              },
              {
                type: 'Datacenter',
                path: 'datastore',
                skip: false,
                selectSet: [
                  {
                    type: 'Datacenter',
                    path: 'vm',
                    skip: false
                  }
                ]
              },
              {
                type: 'Datastore',
                path: 'vm',
                skip: false
              }
            ]
          } as TraversalSpec)
        ]
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getVM(connectionData: ConnectionData, vm: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'VirtualMachine',
        all: true
      }],
      objectSet: [{
        obj: {
          $type: 'VirtualMachine',
          _value: vm
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(RetrievePropertiesResponse.data.returnval[0]));
    });

  }

  getVMPath(connectionData: ConnectionData, vm: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'VirtualMachine',
        all: false,
        pathSet: ['config.files.vmPathName']
      }],
      objectSet: [{
        obj: {
          $type: 'VirtualMachine',
          _value: vm
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(RetrievePropertiesResponse.data.returnval[0]));
    });

  }

  getVMRuntime(connectionData: ConnectionData, vm: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'VirtualMachine',
        all: false,
        pathSet: ['runtime']
      }],
      objectSet: [{
        obj: {
          $type: 'VirtualMachine',
          _value: vm
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(RetrievePropertiesResponse.data.returnval[0]));
    });

  }

  getVMSnapshots(connectionData: ConnectionData, vm: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [
        {
          type: 'VirtualMachine',
          all: false,
          pathSet: ['snapshot']
        }
      ],
      objectSet: [{
        obj: {
          $type: 'VirtualMachine',
          _value: vm
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  searchIndexVM(connectionData: ConnectionData, vmUuid: string): Promise<any> {
    return this.FindByUuid(connectionData, vmUuid, true, false).then((FindByUuidResponse) => {
      const res = [];

      FindByUuidResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  queryVMEvents(connectionData: ConnectionData, vm: string): Promise<any> {
    return this.QueryEvents(connectionData, {
      entity: {
        entity: {
          $type: 'VirtualMachine',
          _value: vm
        },
        recursion: 'all'
      }
    }).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  /**
   * Other
   */
  registerSysOSExtension(connectionData: ConnectionData): Promise<any> {
    return this.RegisterExtension(connectionData, {
      description: {
        label: 'SysOS Management',
        summary: 'SysOS management extension for VMware vSphere'
      },
      key: 'com.sysos.management',
      company: 'SysOS',
      version: '1.0',
      subjectName: 'SysOS Management',
      client: [{
        version: '1.0',
        description: {
          label: 'SysOS Management',
          summary: 'SysOS management extension for VMware vSphere'
        },
        company: 'SysOS',
        type: 'com.vmware.vim.viClientScripts',
        url: 'https://github.com/infnada/SysOS'
      }],
      taskList: [
        {
          taskID: 'com.sysos.management.backup'
        }
      ],
      resourceList: [
        {
          locale: 'en',
          module: 'task',
          data: [
            {
              key: 'com.sysos.management.backup.label',
              value: 'SysOS Create Backup'
            }
          ]
        },
        {
          locale: 'en_US',
          module: 'task',
          data: [
            {
              key: 'com.sysos.management.backup.label',
              value: 'SysOS Create Backup'
            }
          ]
        }
      ],
      lastHeartbeatTime: new Date().toISOString()
    }).then((RegisterExtensionResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(RegisterExtensionResponse.data.returnval[0]));
    });

  }

  createAllBasicDataFilter(connectionData: ConnectionData): Promise<any> {
    return this.CreateFilter(connectionData, {
      propSet: [
        {
          type: 'ManagedEntity',
          all: false,
          pathSet: ['name', 'parent']
        },
        {
          type: 'Folder',
          all: false,
          pathSet: ['name', 'parent', 'childType']
        },
        {
          type: 'Network',
          all: true
        },
        {
          type: 'VmwareDistributedVirtualSwitch',
          all: true
        },
        {
          type: 'DistributedVirtualSwitch',
          all: true
        },
        {
          type: 'DistributedVirtualPortgroup',
          all: true
        },
        {
          type: 'VirtualMachine',
          all: false,
          pathSet: ['name', 'parent', 'guest', 'runtime.powerState', 'runtime.connectionState', 'runtime.faultToleranceState',
            'config.uuid', 'summary.quickStats.guestMemoryUsage', 'summary.config.memorySizeMB', 'summary.quickStats.overallCpuUsage', 'summary.runtime.maxCpuUsage',
            'summary.config.vmPathName', 'summary.config.template', 'datastore', 'layout', 'config.files.logDirectory',
            'config.hardware.device', 'resourcePool', 'runtime.host', 'config.version', 'config.changeTrackingEnabled', 'config.ftInfo',
            'config.hardware.numCPU', 'config.hardware.memoryMB', 'config.files.snapshotDirectory', 'config.extraConfig', 'storage.perDatastoreUsage',
            'snapshot', 'layoutEx', 'config.guestId', 'config.annotation', 'customValue', 'parentVApp', 'runtime.consolidationNeeded',
            'config.flags.faultToleranceType', 'config.forkConfigInfo', 'config.files.vmPathName'
          ]
        },
        {
          type: 'Datacenter',
          all: false,
          pathSet: ['datastore', 'vmFolder']
        },
        {
          type: 'HostSystem',
          all: false,
          pathSet: ['vm', 'datastore', 'hardware.cpuInfo.numCpuPackages', 'hardware.cpuFeature', 'hardware.cpuInfo.hz', 'hardware.systemInfo.uuid',
            'config.product.productLineId', 'summary.config.product.fullName', 'summary.config.product.version', 'summary.config.product.apiVersion',
            'configManager.storageSystem', 'hardware.cpuInfo.numCpuCores', 'hardware.cpuInfo.numCpuThreads', 'runtime', 'config.vsanHostConfig.clusterInfo'
          ]
        },
        /*{
          type: 'HostStorageSystem',
          all: false,
          pathSet: ['storageDeviceInfo', 'fileSystemVolumeInfo']
        },*/
        {
          type: 'Datastore',
          all: false,
          pathSet: ['info', 'host', 'summary.accessible', 'summary.capacity', 'summary.freeSpace', 'summary.multipleHostAccess', 'vm', 'capability', 'summary.type']
        },
        {
          type: 'ResourcePool',
          all: false,
          pathSet: ['vm', 'name', 'parent', 'resourcePool']
        },
        {
          type: 'ClusterComputeResource',
          all: false,
          pathSet: ['configuration.drsConfig', 'summary', 'configurationEx.spbmEnabled']
        },
        {
          type: 'ComputeResource',
          all: false,
          pathSet: ['summary', 'configurationEx.spbmEnabled']
        },
        {
          type: 'VirtualApp',
          all: false,
          pathSet: ['vm', 'name', 'parent', 'parentFolder', 'resourcePool']
        },
        {
          type: 'StoragePod',
          all: false,
          pathSet: ['name', 'parent', 'summary.capacity', 'summary.freeSpace', 'podStorageDrsEntry.storageDrsConfig.podConfig.enabled',
            'podStorageDrsEntry.storageDrsConfig.podConfig.defaultVmBehavior'
          ]
        }
      ],
      objectSet: [
        {
          obj: {
            $type: 'Folder',
            _value: 'group-d1'
          },
          skip: false,
          selectSet: [
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'resourcepool',
              type: 'ResourcePool',
              path: 'resourcePool',
              skip: false,
              selectSet: [
                {
                  name: 'resourcepool'
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'ResourcePool',
                  path: 'vm',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'runtime.host',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ClusterComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'datastore',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'Datastore',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'datastore',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'Datastore',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'VirtualApp',
                  path: 'vm',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'runtime.host',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ClusterComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'datastore',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'Datastore',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'datastore',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'Datastore',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: 'vm_to_respool'
                    }
                  ]
                },
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'ComputeResource',
              path: 'resourcePool',
              skip: false,
              selectSet: [
                {
                  name: 'resourcepool'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'folder_to_parent',
              type: 'Folder',
              path: 'parent',
              skip: false,
              selectSet: [
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'Datacenter',
                  path: 'parent',
                  skip: false,
                  selectSet: [
                    {
                      name: 'folder_to_parent'
                    }
                  ]
                },
                {
                  name: 'folder_to_parent'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'Datacenter',
              path: 'parent',
              skip: false,
              selectSet: [
                {
                  name: 'folder_to_parent'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'Datastore',
              path: 'parent',
              skip: false,
              selectSet: [
                {
                  name: 'folder_to_parent'
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'StoragePod',
                  path: 'childEntity',
                  skip: false
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'StoragePod',
                  path: 'childEntity',
                  skip: false,
                  selectSet: [
                    {
                      name: 'folder_to_parent'
                    }
                  ]
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'folder_to_content',
              type: 'Folder',
              path: 'childEntity',
              skip: false,
              selectSet: [
                {
                  name: 'folder_to_content',
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'ClusterComputeResource',
                  path: 'host',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'HostSystem',
                      path: 'vm',
                      skip: false
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'HostSystem',
                      path: 'datastore',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'Datastore',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'ComputeResource',
                  path: 'host',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'HostSystem',
                      path: 'vm',
                      skip: false
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'HostSystem',
                      path: 'datastore',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'Datastore',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'HostSystem',
                      path: 'configManager.storageSystem',
                      skip: false
                    }
                  ]
                },
                {
                  name: 'folder_to_parent'
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'ComputeResource',
                  path: 'resourcePool',
                  skip: false,
                  selectSet: [
                    {
                      name: 'resourcepool'
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'Datacenter',
                  path: 'hostFolder',
                  skip: false,
                  selectSet: [
                    {
                      name: 'folder_to_content'
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'Datacenter',
                  path: 'networkFolder',
                  skip: false,
                  selectSet: [
                    {
                      name: 'folder_to_content'
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'Datacenter',
                  path: 'vmFolder',
                  skip: false,
                  selectSet: [
                    {
                      name: 'folder_to_content'
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'VirtualApp',
                  path: 'resourcePool',
                  skip: false,
                  selectSet: [
                    {
                      name: 'resourcepool'
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'ResourcePool',
                      path: 'vm',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'VirtualMachine',
                          path: 'runtime.host',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'HostSystem',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'ClusterComputeResource',
                                  path: 'parent',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'ComputeResource',
                                  path: 'parent',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'HostSystem',
                              path: 'datastore',
                              skip: false,
                              selectSet: [
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'Datastore',
                                  path: 'parent',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    },
                                    {
                                      '$xsi:type': 'TraversalSpec',
                                      type: 'StoragePod',
                                      path: 'childEntity',
                                      skip: false,
                                    },
                                    {
                                      '$xsi:type': 'TraversalSpec',
                                      type: 'StoragePod',
                                      path: 'childEntity',
                                      skip: false,
                                      selectSet: [
                                        {
                                          name: 'folder_to_parent'
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'VirtualMachine',
                          path: 'datastore',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'Datastore',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualApp',
                      path: 'vm',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'VirtualMachine',
                          path: 'runtime.host',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'HostSystem',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'ClusterComputeResource',
                                  path: 'parent',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'ComputeResource',
                                  path: 'parent',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'HostSystem',
                              path: 'datastore',
                              skip: false,
                              selectSet: [
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'Datastore',
                                  path: 'parent',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    },
                                    {
                                      '$xsi:type': 'TraversalSpec',
                                      type: 'StoragePod',
                                      path: 'childEntity',
                                      skip: false,
                                    },
                                    {
                                      '$xsi:type': 'TraversalSpec',
                                      type: 'StoragePod',
                                      path: 'childEntity',
                                      skip: false,
                                      selectSet: [
                                        {
                                          name: 'folder_to_parent'
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'VirtualMachine',
                          path: 'datastore',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'Datastore',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          name: 'vm_to_respool'
                        }
                      ]
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'VirtualApp',
                  path: 'vm',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'runtime.host',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ClusterComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'datastore',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'Datastore',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'datastore',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'Datastore',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: 'vm_to_respool'
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'Datacenter',
                  path: 'datastoreFolder',
                  skip: false,
                  selectSet: [
                    {
                      name: 'folder_to_content'
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'VirtualMachine',
                  path: 'runtime.host',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'HostSystem',
                      path: 'parent',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'ClusterComputeResource',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            }
                          ]
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'ComputeResource',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'HostSystem',
                      path: 'datastore',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'Datastore',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'vm_to_respool'
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'Datastore',
                  path: 'vm',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'runtime.host',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ClusterComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'datastore',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'Datastore',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: 'vm_to_respool'
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'StoragePod',
                  path: 'childEntity',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'Datastore',
                      path: 'vm',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'VirtualMachine',
                          path: 'runtime.host',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'HostSystem',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'ClusterComputeResource',
                                  path: 'parent',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'ComputeResource',
                                  path: 'parent',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'HostSystem',
                              path: 'datastore',
                              skip: false,
                              selectSet: [
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'Datastore',
                                  path: 'parent',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    },
                                    {
                                      '$xsi:type': 'TraversalSpec',
                                      type: 'StoragePod',
                                      path: 'childEntity',
                                      skip: false,
                                    },
                                    {
                                      '$xsi:type': 'TraversalSpec',
                                      type: 'StoragePod',
                                      path: 'childEntity',
                                      skip: false,
                                      selectSet: [
                                        {
                                          name: 'folder_to_parent'
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          name: 'vm_to_respool'
                        }
                      ]
                    }
                  ]
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'Datacenter',
              path: 'hostFolder',
              skip: false,
              selectSet: [
                {
                  name: 'folder_to_content'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'ClusterComputeResource',
              path: 'host',
              skip: false,
              selectSet: [
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'HostSystem',
                  path: 'vm',
                  skip: false
                },
                ({
                  '$xsi:type': 'TraversalSpec',
                  type: 'HostSystem',
                  path: 'datastore',
                  skip: false,
                  selectSet: [
                    ({
                      '$xsi:type': 'TraversalSpec',
                      type: 'Datastore',
                      path: 'parent',
                      skip: false,
                      selectSet: [
                        {
                          name: 'folder_to_parent'
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'StoragePod',
                          path: 'childEntity',
                          skip: false,
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'StoragePod',
                          path: 'childEntity',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            }
                          ]
                        }
                      ]
                    } as TraversalSpec)
                  ]
                } as TraversalSpec)
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'ComputeResource',
              path: 'host',
              skip: false,
              selectSet: [
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'HostSystem',
                  path: 'vm',
                  skip: false
                },
                ({
                  '$xsi:type': 'TraversalSpec',
                  type: 'HostSystem',
                  path: 'datastore',
                  skip: false,
                  selectSet: [
                    ({
                      '$xsi:type': 'TraversalSpec',
                      type: 'Datastore',
                      path: 'parent',
                      skip: false,
                      selectSet: [
                        {
                          name: 'folder_to_parent'
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'StoragePod',
                          path: 'childEntity',
                          skip: false,
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'StoragePod',
                          path: 'childEntity',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            }
                          ]
                        }
                      ]
                    } as TraversalSpec)
                  ]
                } as TraversalSpec),
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'HostSystem',
                  path: 'configManager.storageSystem',
                  skip: false
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'VirtualMachine',
              path: 'runtime.host',
              skip: false,
              selectSet: [
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'HostSystem',
                  path: 'parent',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'ClusterComputeResource',
                      path: 'parent',
                      skip: false,
                      selectSet: [
                        {
                          name: 'folder_to_parent'
                        }
                      ]
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'ComputeResource',
                      path: 'parent',
                      skip: false,
                      selectSet: [
                        {
                          name: 'folder_to_parent'
                        }
                      ]
                    }
                  ]
                },
                ({
                  '$xsi:type': 'TraversalSpec',
                  type: 'HostSystem',
                  path: 'datastore',
                  skip: false,
                  selectSet: [
                    ({
                      '$xsi:type': 'TraversalSpec',
                      type: 'Datastore',
                      path: 'parent',
                      skip: false,
                      selectSet: [
                        {
                          name: 'folder_to_parent'
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'StoragePod',
                          path: 'childEntity',
                          skip: false
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'StoragePod',
                          path: 'childEntity',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            }
                          ]
                        }
                      ]
                    } as TraversalSpec)
                  ]
                } as TraversalSpec)
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'VirtualMachine',
              path: 'datastore',
              skip: false,
              selectSet: [
                ({
                  '$xsi:type': 'TraversalSpec',
                  type: 'Datastore',
                  path: 'parent',
                  skip: false,
                  selectSet: [
                    {
                      name: 'folder_to_parent'
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'StoragePod',
                      path: 'childEntity',
                      skip: false
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'StoragePod',
                      path: 'childEntity',
                      skip: false,
                      selectSet: [
                        {
                          name: 'folder_to_parent'
                        }
                      ]
                    }
                  ]
                } as TraversalSpec)
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              name: 'vm_to_respool',
              type: 'VirtualMachine',
              path: 'resourcePool',
              skip: false,
              selectSet: [
                ({
                  '$xsi:type': 'TraversalSpec',
                  name: 'respool_parent',
                  type: 'ResourcePool',
                  path: 'parent',
                  skip: false,
                  selectSet: [
                    {
                      name: 'respool_parent'
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'ComputeResource',
                      path: 'parent',
                      skip: false,
                      selectSet: [
                        {
                          name: 'folder_to_parent'
                        }
                      ]
                    }
                  ]
                } as TraversalSpec)
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'VirtualMachine',
              path: 'parent',
              skip: false,
              selectSet: [
                {
                  name: 'folder_to_parent'
                }
              ]
            } as TraversalSpec),
            ({
              '$xsi:type': 'TraversalSpec',
              type: 'VirtualApp',
              path: 'resourcePool',
              skip: false,
              selectSet: [
                {
                  name: 'resourcepool'
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'ResourcePool',
                  path: 'vm',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'runtime.host',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ClusterComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'datastore',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'Datastore',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'datastore',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'Datastore',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  '$xsi:type': 'TraversalSpec',
                  type: 'VirtualApp',
                  path: 'vm',
                  skip: false,
                  selectSet: [
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'runtime.host',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ClusterComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'ComputeResource',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'HostSystem',
                          path: 'datastore',
                          skip: false,
                          selectSet: [
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'Datastore',
                              path: 'parent',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                },
                                {
                                  '$xsi:type': 'TraversalSpec',
                                  type: 'StoragePod',
                                  path: 'childEntity',
                                  skip: false,
                                  selectSet: [
                                    {
                                      name: 'folder_to_parent'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      '$xsi:type': 'TraversalSpec',
                      type: 'VirtualMachine',
                      path: 'datastore',
                      skip: false,
                      selectSet: [
                        {
                          '$xsi:type': 'TraversalSpec',
                          type: 'Datastore',
                          path: 'parent',
                          skip: false,
                          selectSet: [
                            {
                              name: 'folder_to_parent'
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                            },
                            {
                              '$xsi:type': 'TraversalSpec',
                              type: 'StoragePod',
                              path: 'childEntity',
                              skip: false,
                              selectSet: [
                                {
                                  name: 'folder_to_parent'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      name: 'vm_to_respool'
                    }
                  ]
                }
              ]
            } as TraversalSpec)
          ]
        }
      ]
    }, false).then((CreateFilterResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(CreateFilterResponse.data.returnval[0]._));
    });

  }


  /**
   * Ticket
   */
  acquireNFCTicket(connectionData: ConnectionData, esxiHost, datastore): Promise<any> {
    const xml = `<?xml version='1.0' encoding='UTF-8'?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV='http://schemas.xmlsoap.org/soap/envelope/'
                   xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:vim='urn:internalvim25'>
  <SOAP-ENV:Body>
    <vim:NfcFileManagement xsi:type='vim:NfcFileManagementRequestType'>
      <vim:_this xsi:type='vim:ManagedObjectReference' type='NfcService'>nfcService</vim:_this>
      <vim:ds xsi:type='vim:ManagedObjectReference' type='Datastore'>${datastore}</vim:ds>
      <vim:hostForAccess xsi:type='vim:ManagedObjectReference' type='HostSystem'>${esxiHost}</vim:hostForAccess>
    </vim:NfcFileManagement>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.NfcFileManagementResponse[0].returnval[0]);
    })).toPromise();
  }

  /**
   * Datastore Upload
   */
  uploadFileToDatastore(url, path, credential) {
    return this.http.post('/api/vmware/upload_to_datastore', {
      url,
      path,
      credential
    }).pipe(map((data: any) => {
        return data;
      },
      error => {
        this.logger.error('[VMWare] -> uploadFileToDatastore -> Error while doing the call -> ', error);
      }));
  }
}
