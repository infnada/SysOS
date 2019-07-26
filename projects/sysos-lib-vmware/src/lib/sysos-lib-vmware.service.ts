import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {NGXLogger} from 'ngx-logger';

import {SysosLibVmwareHelperService} from "./sysos-lib-vmware-helper.service";
import {SysosLibVmwareAlarmService} from "./managed-object-types/sysos-lib-vmware-alarm.service";
import {SysosLibVmwareAlarmManagerService} from "./managed-object-types/sysos-lib-vmware-alarm-manager.service";
import {SysosLibVmwareAuthorizationManagerService} from "./managed-object-types/sysos-lib-vmware-authorization-manager.service";
import {SysosLibVmwareCertificateManagerService} from "./managed-object-types/sysos-lib-vmware-certificate-manager.service";
import {SysosLibVmwareClusterComputeResourceService} from "./managed-object-types/sysos-lib-vmware-cluster-compute-resource.service";
import {SysosLibVmwareClusterEVCManagerService} from "./managed-object-types/sysos-lib-vmware-cluster-evc-manager.service";
import {SysosLibVmwareClusterProfileService} from "./managed-object-types/sysos-lib-vmware-cluster-profile.service";
import {SysosLibVmwareClusterProfileManagerService} from "./managed-object-types/sysos-lib-vmware-cluster-profile-manager.service";
import {SysosLibVmwareComputeResourceService} from "./managed-object-types/sysos-lib-vmware-compute-resource.service";
import {SysosLibVmwareContainerViewService} from "./managed-object-types/sysos-lib-vmware-container-view.service";
import {SysosLibVmwareCryptoManagerService} from "./managed-object-types/sysos-lib-vmware-crypto-manager.service";
import {SysosLibVmwareCryptoManagerHostService} from "./managed-object-types/sysos-lib-vmware-crypto-manager-host.service";
import {SysosLibVmwareCryptoManagerHostKMSService} from "./managed-object-types/sysos-lib-vmware-crypto-manager-host-kms.service";
import {SysosLibVmwareCryptoManagerKmipService} from "./managed-object-types/sysos-lib-vmware-crypto-manager-kmip.service";
import {SysosLibVmwareCustomFieldsManagerService} from "./managed-object-types/sysos-lib-vmware-custom-fields-manager.service";
import {SysosLibVmwareCustomizationSpecManagerService} from "./managed-object-types/sysos-lib-vmware-customization-spec-manager.service";
import {SysosLibVmwareDatacenterService} from "./managed-object-types/sysos-lib-vmware-datacenter.service";
import {SysosLibVmwareDatastoreService} from "./managed-object-types/sysos-lib-vmware-datastore.service";
import {SysosLibVmwareDatastoreNamespaceManagerService} from "./managed-object-types/sysos-lib-vmware-datastore-namespace-manager.service";
import {SysosLibVmwareDiagnosticManagerService} from "./managed-object-types/sysos-lib-vmware-diagnostic-manager.service";
import {SysosLibVmwareDistributedVirtualPortgroupService} from "./managed-object-types/sysos-lib-vmware-distributed-virtual-portgroup.service";
import {SysosLibVmwareDistributedVirtualSwitchService} from "./managed-object-types/sysos-lib-vmware-distributed-virtual-switch.service";
import {SysosLibVmwareDistributedVirtualSwitchManagerService} from "./managed-object-types/sysos-lib-vmware-distributed-virtual-switch-manager.service";
import {SysosLibVmwareEnvironmentBrowserService} from "./managed-object-types/sysos-lib-vmware-environment-browser.service";
import {SysosLibVmwareEventHistoryCollectorService} from "./managed-object-types/sysos-lib-vmware-event-history-collector.service";
import {SysosLibVmwareEventManagerService} from "./managed-object-types/sysos-lib-vmware-event-manager.service";
import {SysosLibVmwareExtensibleManagedObjectService} from "./managed-object-types/sysos-lib-vmware-extensible-managed-object.service";
import {SysosLibVmwareExtensionManagerService} from "./managed-object-types/sysos-lib-vmware-extension-manager.service";
import {SysosLibVmwareFailoverClusterConfiguratorService} from "./managed-object-types/sysos-lib-vmware-failover-cluster-configurator.service";
import {SysosLibVmwareFailoverClusterManagerService} from "./managed-object-types/sysos-lib-vmware-failover-cluster-manager.service";
import {SysosLibVmwareFileManagerService} from "./managed-object-types/sysos-lib-vmware-file-manager.service";
import {SysosLibVmwareFolderService} from "./managed-object-types/sysos-lib-vmware-folder.service";
import {SysosLibVmwareGuestAliasManagerService} from "./managed-object-types/sysos-lib-vmware-guest-alias-manager.service";
import {SysosLibVmwareGuestAuthManagerService} from "./managed-object-types/sysos-lib-vmware-guest-auth-manager.service";
import {SysosLibVmwareGuestFileManagerService} from "./managed-object-types/sysos-lib-vmware-guest-file-manager.service";
import {SysosLibVmwareGuestOperationsManagerService} from "./managed-object-types/sysos-lib-vmware-guest-operations-manager.service";
import {SysosLibVmwareGuestProcessManagerService} from "./managed-object-types/sysos-lib-vmware-guest-process-manager.service";
import {SysosLibVmwareGuestWindowsRegistryManagerService} from "./managed-object-types/sysos-lib-vmware-guest-windows-registry-manager.service";
import {SysosLibVmwareHealthUpdateManagerService} from "./managed-object-types/sysos-lib-vmware-health-update-manager.service";
import {SysosLibVmwareHistoryCollectorService} from "./managed-object-types/sysos-lib-vmware-history-collector.service";
import {SysosLibVmwareHostAccessManagerService} from "./managed-object-types/sysos-lib-vmware-host-access-manager.service";
import {SysosLibVmwareHostActiveDirectoryAuthenticationService} from "./managed-object-types/sysos-lib-vmware-host-active-directory-authentication.service";
import {SysosLibVmwareHostAuthenticationManagerService} from "./managed-object-types/sysos-lib-vmware-host-authentication-manager.service";
import {SysosLibVmwareHostAuthenticationStoreService} from "./managed-object-types/sysos-lib-vmware-host-authentication-store.service";
import {SysosLibVmwareHostAutoStartManagerService} from "./managed-object-types/sysos-lib-vmware-host-auto-start-manager.service";
import {SysosLibVmwareHostBootDeviceSystemService} from "./managed-object-types/sysos-lib-vmware-host-boot-device-system.service";
import {SysosLibVmwareHostCacheConfigurationManagerService} from "./managed-object-types/sysos-lib-vmware-host-cache-configuration-manager.service";
import {SysosLibVmwareHostCertificateManagerService} from "./managed-object-types/sysos-lib-vmware-host-certificate-manager.service";
import {SysosLibVmwareHostCpuSchedulerSystemService} from "./managed-object-types/sysos-lib-vmware-host-cpu-scheduler-system.service";
import {SysosLibVmwareHostDatastoreBrowserService} from "./managed-object-types/sysos-lib-vmware-host-datastore-browser.service";
import {SysosLibVmwareHostDatastoreSystemService} from "./managed-object-types/sysos-lib-vmware-host-datastore-system.service";
import {SysosLibVmwareHostDateTimeSystemService} from "./managed-object-types/sysos-lib-vmware-host-date-time-system.service";
import {SysosLibVmwareHostDiagnosticSystemService} from "./managed-object-types/sysos-lib-vmware-host-diagnostic-system.service";
import {SysosLibVmwareHostDirectoryStoreService} from "./managed-object-types/sysos-lib-vmware-host-directory-store.service";
import {SysosLibVmwareHostEsxAgentHostManagerService} from "./managed-object-types/sysos-lib-vmware-host-esx-agent-host-manager.service";
import {SysosLibVmwareHostFirewallSystemService} from "./managed-object-types/sysos-lib-vmware-host-firewall-system.service";
import {SysosLibVmwareHostFirmwareSystemService} from "./managed-object-types/sysos-lib-vmware-host-firmware-system.service";
import {SysosLibVmwareHostGraphicsManagerService} from "./managed-object-types/sysos-lib-vmware-host-graphics-manager.service";
import {SysosLibVmwareHostHealthStatusSystemService} from "./managed-object-types/sysos-lib-vmware-host-health-status-system.service";
import {SysosLibVmwareHostImageConfigManagerService} from "./managed-object-types/sysos-lib-vmware-host-image-config-manager.service";
import {SysosLibVmwareHostKernelModuleSystemService} from "./managed-object-types/sysos-lib-vmware-host-kernel-module-system.service";
import {SysosLibVmwareHostLocalAccountManagerService} from "./managed-object-types/sysos-lib-vmware-host-local-account-manager.service";
import {SysosLibVmwareHostLocalAuthenticationService} from "./managed-object-types/sysos-lib-vmware-host-local-authentication.service";
import {SysosLibVmwareHostMemorySystemService} from "./managed-object-types/sysos-lib-vmware-host-memory-system.service";
import {SysosLibVmwareHostNetworkSystemService} from "./managed-object-types/sysos-lib-vmware-host-network-system.service";
import {SysosLibVmwareHostNvdimmSystemService} from "./managed-object-types/sysos-lib-vmware-host-nvdimm-system.service";
import {SysosLibVmwareHostPatchManagerService} from "./managed-object-types/sysos-lib-vmware-host-patch-manager.service";
import {SysosLibVmwareHostPciPassthruSystemService} from "./managed-object-types/sysos-lib-vmware-host-pci-passthru-system.service";
import {SysosLibVmwareHostPowerSystemService} from "./managed-object-types/sysos-lib-vmware-host-power-system.service";
import {SysosLibVmwareHostProfileService} from "./managed-object-types/sysos-lib-vmware-host-profile.service";
import {SysosLibVmwareHostProfileManagerService} from "./managed-object-types/sysos-lib-vmware-host-profile-manager.service";
import {SysosLibVmwareHostServiceSystemService} from "./managed-object-types/sysos-lib-vmware-host-service-system.service";
import {SysosLibVmwareHostSnmpSystemService} from "./managed-object-types/sysos-lib-vmware-host-snmp-system.service";
import {SysosLibVmwareHostSpecificationManagerService} from "./managed-object-types/sysos-lib-vmware-host-specification-manager.service";
import {SysosLibVmwareHostStorageSystemService} from "./managed-object-types/sysos-lib-vmware-host-storage-system.service";
import {SysosLibVmwareHostSystemService} from "./managed-object-types/sysos-lib-vmware-host-system.service";
import {SysosLibVmwareHostVflashManagerService} from "./managed-object-types/sysos-lib-vmware-host-vflash-manager.service";
import {SysosLibVmwareHostVirtualNicManagerService} from "./managed-object-types/sysos-lib-vmware-host-virtual-nic-manager.service";
import {SysosLibVmwareHostVmotionSystemService} from "./managed-object-types/sysos-lib-vmware-host-vmotion-system.service";
import {SysosLibVmwareHostVsanInternalSystemService} from "./managed-object-types/sysos-lib-vmware-host-vsan-internal-system.service";
import {SysosLibVmwareHostVsanSystemService} from "./managed-object-types/sysos-lib-vmware-host-vsan-system.service";
import {SysosLibVmwareHostVstorageObjectManagerService} from "./managed-object-types/sysos-lib-vmware-host-vstorage-object-manager.service";
import {SysosLibVmwareHttpNfcLeaseService} from "./managed-object-types/sysos-lib-vmware-http-nfc-lease.service";
import {SysosLibVmwareIoFilterManagerService} from "./managed-object-types/sysos-lib-vmware-io-filter-manager.service";
import {SysosLibVmwareIpPoolManagerService} from "./managed-object-types/sysos-lib-vmware-ip-pool-manager.service";
import {SysosLibVmwareIscsiManagerService} from "./managed-object-types/sysos-lib-vmware-iscsi-manager.service";
import {SysosLibVmwareLicenseAssignmentManagerService} from "./managed-object-types/sysos-lib-vmware-license-assignment-manager.service";
import {SysosLibVmwareLicenseManagerService} from "./managed-object-types/sysos-lib-vmware-license-manager.service";
import {SysosLibVmwareListViewService} from "./managed-object-types/sysos-lib-vmware-list-view.service";
import {SysosLibVmwareLocalizationManagerService} from "./managed-object-types/sysos-lib-vmware-localization-manager.service";
import {SysosLibVmwareManagedEntityService} from "./managed-object-types/sysos-lib-vmware-managed-entity.service";
import {SysosLibVmwareManagedObjectViewService} from "./managed-object-types/sysos-lib-vmware-managed-object-view.service";
import {SysosLibVmwareMessageBusProxyService} from "./managed-object-types/sysos-lib-vmware-message-bus-proxy.service";
import {SysosLibVmwareNetworkService} from "./managed-object-types/sysos-lib-vmware-network.service";
import {SysosLibVmwareOpaqueNetworkService} from "./managed-object-types/sysos-lib-vmware-opaque-network.service";
import {SysosLibVmwareOptionManagerService} from "./managed-object-types/sysos-lib-vmware-option-manager.service";
import {SysosLibVmwareOverheadMemoryManagerService} from "./managed-object-types/sysos-lib-vmware-overhead-memory-manager.service";
import {SysosLibVmwareOvfManagerService} from "./managed-object-types/sysos-lib-vmware-ovf-manager.service";
import {SysosLibVmwarePerformanceManagerService} from "./managed-object-types/sysos-lib-vmware-performance-manager.service";
import {SysosLibVmwareProfileService} from "./managed-object-types/sysos-lib-vmware-profile.service";
import {SysosLibVmwareProfileComplianceManagerService} from "./managed-object-types/sysos-lib-vmware-profile-compliance-manager.service";
import {SysosLibVmwareProfileManagerService} from "./managed-object-types/sysos-lib-vmware-profile-manager.service";
import {SysosLibVmwarePropertyCollectorService} from "./managed-object-types/sysos-lib-vmware-property-collector.service";
import {SysosLibVmwarePropertyFilterService} from "./managed-object-types/sysos-lib-vmware-property-filter.service";
import {SysosLibVmwareResourcePlanningManagerService} from "./managed-object-types/sysos-lib-vmware-resource-planning-manager.service";
import {SysosLibVmwareResourcePoolService} from "./managed-object-types/sysos-lib-vmware-resource-pool.service";
import {SysosLibVmwareScheduledTaskService} from "./managed-object-types/sysos-lib-vmware-scheduled-task.service";
import {SysosLibVmwareScheduledTaskManagerService} from "./managed-object-types/sysos-lib-vmware-scheduled-task-manager.service";
import {SysosLibVmwareSearchIndexService} from "./managed-object-types/sysos-lib-vmware-search-index.service";
import {SysosLibVmwareServiceInstanceService} from "./managed-object-types/sysos-lib-vmware-service-instance.service";
import {SysosLibVmwareServiceManagerService} from "./managed-object-types/sysos-lib-vmware-service-manager.service";
import {SysosLibVmwareSessionManagerService} from "./managed-object-types/sysos-lib-vmware-session-manager.service";
import {SysosLibVmwareSimpleCommandService} from "./managed-object-types/sysos-lib-vmware-simple-command.service";
import {SysosLibVmwareStoragePodService} from "./managed-object-types/sysos-lib-vmware-storage-pod.service";
import {SysosLibVmwareStorageResourceManagerService} from "./managed-object-types/sysos-lib-vmware-storage-resource-manager.service";
import {SysosLibVmwareTaskService} from "./managed-object-types/sysos-lib-vmware-task.service";
import {SysosLibVmwareTaskHistoryCollectorService} from "./managed-object-types/sysos-lib-vmware-task-history-collector.service";
import {SysosLibVmwareTaskManagerService} from "./managed-object-types/sysos-lib-vmware-task-manager.service";
import {SysosLibVmwareUserDirectoryService} from "./managed-object-types/sysos-lib-vmware-user-directory.service";
import {SysosLibVmwareVcenterVstorageObjectManagerService} from "./managed-object-types/sysos-lib-vmware-vcenter-vstorage-object-manager.service";
import {SysosLibVmwareViewService} from "./managed-object-types/sysos-lib-vmware-view.service";
import {SysosLibVmwareViewManagerService} from "./managed-object-types/sysos-lib-vmware-view-manager.service";
import {SysosLibVmwareVirtualAppService} from "./managed-object-types/sysos-lib-vmware-virtual-app.service";
import {SysosLibVmwareVirtualDiskManagerService} from "./managed-object-types/sysos-lib-vmware-virtual-disk-manager.service";
import {SysosLibVmwareVirtualizationManagerService} from "./managed-object-types/sysos-lib-vmware-virtualization-manager.service";
import {SysosLibVmwareVirtualMachineService} from "./managed-object-types/sysos-lib-vmware-virtual-machine.service";
import {SysosLibVmwareVirtualMachineCompatibilityCheckerService} from "./managed-object-types/sysos-lib-vmware-virtual-machine-compatibility-checker.service";
import {SysosLibVmwareVirtualMachineProvisioningCheckerService} from "./managed-object-types/sysos-lib-vmware-virtual-machine-provisioning-checker.service";
import {SysosLibVmwareVirtualMachineSnapshotService} from "./managed-object-types/sysos-lib-vmware-virtual-machine-snapshot.service";
import {SysosLibVmwareVmwareDistributedVirtualSwitchService} from "./managed-object-types/sysos-lib-vmware-vmware-distributed-virtual-switch.service";
import {SysosLibVmwareVsanUpgradeSystemService} from "./managed-object-types/sysos-lib-vmware-vsan-upgrade-system.service";
import {SysosLibVmwareVstorageObjectManagerBaseService} from "./managed-object-types/sysos-lib-vmware-vstorage-object-manager-base.service";
import {connectionData} from "./types/connection-data";
import {ManagedObjectReference} from "./types/managed-object-reference";
import {VirtualMachineCloneSpec} from "./types/virtual-machine-clone-spec";
import {HostNasVolumeSpec} from "./types/host-nas-volume-spec";
import {EventFilterSpec} from "./types/event-filter-spec";
import {PerfQuerySpec} from "./types/perf-query-spec";
import {Extension} from "./types/extension";
import {PropertyFilterSpec} from "./types/property-filter-spec";
import {HostDatastoreBrowserSearchSpec} from "./types/host-datastore-browser-search-spec";
import {TaskInfoState} from "./types/task-info-state";
import {MethodFault} from "./types/method-fault";
import {HostFirewallRulesetRulesetSpec} from "./types/host-firewall-ruleset-ruleset-spec";
import {WaitOptions} from "./types/wait-options";
import {TraversalSpec} from "./types/traversal-spec";


@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareService {

  constructor(private http: HttpClient,
              private logger: NGXLogger,
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

  AbdicateDomOwnership() { return this.HostVsanInternalSystem.AbdicateDomOwnership.apply( this, arguments ); }
  AcknowledgeAlarm() { return this.AlarmManager.AcknowledgeAlarm.apply( this, arguments ); }
  AcquireCimServicesTicket() { return this.HostSystem.AcquireCimServicesTicket.apply( this, arguments ); }
  AcquireCloneTicket() { return this.SessionManager.AcquireCloneTicket.apply( this, arguments ); }
  AcquireCredentialsInGuest() { return this.GuestAuthManager.AcquireCredentialsInGuest.apply( this, arguments ); }
  AcquireGenericServiceTicket() { return this.SessionManager.AcquireGenericServiceTicket.apply( this, arguments ); }
  AcquireLocalTicket() { return this.SessionManager.AcquireLocalTicket.apply( this, arguments ); }
  AcquireMksTicket() { return this.VirtualMachine.AcquireMksTicket.apply( this, arguments ); }
  AcquireTicket(connectionData: connectionData,
                managedVM: ManagedObjectReference & { type: 'VirtualMachine' },
                ticketType: string) { return this.VirtualMachine.AcquireTicket.apply( this, arguments ); }
  AddAuthorizationRole() { return this.AuthorizationManager.AddAuthorizationRole.apply( this, arguments ); }
  AddCustomFieldDef() { return this.CustomFieldsManager.AddCustomFieldDef.apply( this, arguments ); }
  AddDisks_Task() { return this.HostVsanSystem.AddDisks_Task.apply( this, arguments ); }
  AddDVPortgroup_Task() { return this.DistributedVirtualSwitch.AddDVPortgroup_Task.apply( this, arguments ); }
  AddFilter() { return this.HealthUpdateManager.AddFilter.apply( this, arguments ); }
  AddFilterEntities() { return this.HealthUpdateManager.AddFilterEntities.apply( this, arguments ); }
  AddGuestAlias() { return this.GuestAliasManager.AddGuestAlias.apply( this, arguments ); }
  AddHost_Task() { return this.ClusterComputeResource.AddHost_Task.apply( this, arguments ); }
  AddInternetScsiSendTargets() { return this.HostStorageSystem.AddInternetScsiSendTargets.apply( this, arguments ); }
  AddInternetScsiStaticTargets() { return this.HostStorageSystem.AddInternetScsiStaticTargets.apply( this, arguments ); }
  AddKey() { return this.CryptoManager.AddKey.apply( this, arguments ); }
  AddKeys() { return this.CryptoManager.AddKeys.apply( this, arguments ); }
  AddLicense() { return this.LicenseManager.AddLicense.apply( this, arguments ); }
  AddMonitoredEntities() { return this.HealthUpdateManager.AddMonitoredEntities.apply( this, arguments ); }
  AddNetworkResourcePool() { return this.DistributedVirtualSwitch.AddNetworkResourcePool.apply( this, arguments ); }
  AddPortGroup() { return this.HostNetworkSystem.AddPortGroup.apply( this, arguments ); }
  AddServiceConsoleVirtualNic() { return this.HostNetworkSystem.AddServiceConsoleVirtualNic.apply( this, arguments ); }
  AddStandaloneHost_Task() { return this.Folder.AddStandaloneHost_Task.apply( this, arguments ); }
  AddVirtualNic() { return this.HostNetworkSystem.AddVirtualNic.apply( this, arguments ); }
  AddVirtualSwitch() { return this.HostNetworkSystem.AddVirtualSwitch.apply( this, arguments ); }
  AllocateIpv4Address() { return this.IpPoolManager.AllocateIpv4Address.apply( this, arguments ); }
  AllocateIpv6Address() { return this.IpPoolManager.AllocateIpv6Address.apply( this, arguments ); }
  AnswerVM(connectionData: connectionData,
           managedVM: ManagedObjectReference & { type: 'VirtualMachine' },
           questionId: string,
           answerChoice: string) { return this.VirtualMachine.AnswerVM.apply( this, arguments ); }
  ApplyEntitiesConfig_Task() { return this.HostProfileManager.ApplyEntitiesConfig_Task.apply( this, arguments ); }
  ApplyEvcModeVM_Task() { return this.VirtualMachine.ApplyEvcModeVM_Task.apply( this, arguments ); }
  ApplyHostConfig_Task() { return this.HostProfileManager.ApplyHostConfig_Task.apply( this, arguments ); }
  ApplyRecommendation() { return this.ClusterComputeResource.ApplyRecommendation.apply( this, arguments ); }
  ApplyStorageDrsRecommendation_Task() { return this.StorageResourceManager.ApplyStorageDrsRecommendation_Task.apply( this, arguments ); }
  ApplyStorageDrsRecommendationToPod_Task() { return this.StorageResourceManager.ApplyStorageDrsRecommendationToPod_Task.apply( this, arguments ); }
  AreAlarmActionsEnabled() { return this.AlarmManager.AreAlarmActionsEnabled.apply( this, arguments ); }
  AssignUserToGroup() { return this.HostLocalAccountManager.AssignUserToGroup.apply( this, arguments ); }
  AssociateProfile() { return this.Profile.AssociateProfile.apply( this, arguments ); }
  AttachDisk_Task() { return this.VirtualMachine.AttachDisk_Task.apply( this, arguments ); }
  AttachScsiLun() { return this.HostStorageSystem.AttachScsiLun.apply( this, arguments ); }
  AttachScsiLunEx_Task() { return this.HostStorageSystem.AttachScsiLunEx_Task.apply( this, arguments ); }
  AttachTagToVStorageObject() { return this.VcenterVStorageObjectManager.AttachTagToVStorageObject.apply( this, arguments ); }
  AttachVmfsExtent() { return this.HostStorageSystem.AttachVmfsExtent.apply( this, arguments ); }
  AutoStartPowerOff() { return this.HostAutoStartManager.AutoStartPowerOff.apply( this, arguments ); }
  AutoStartPowerOn() { return this.HostAutoStartManager.AutoStartPowerOn.apply( this, arguments ); }
  BackupFirmwareConfiguration() { return this.HostFirmwareSystem.BackupFirmwareConfiguration.apply( this, arguments ); }
  BindVnic() { return this.IscsiManager.BindVnic.apply( this, arguments ); }
  BrowseDiagnosticLog() { return this.DiagnosticManager.BrowseDiagnosticLog.apply( this, arguments ); }
  CancelRecommendation() { return this.ClusterComputeResource.CancelRecommendation.apply( this, arguments ); }
  CancelRetrievePropertiesEx() { return this.PropertyCollector.CancelRetrievePropertiesEx.apply( this, arguments ); }
  CancelStorageDrsRecommendation() { return this.StorageResourceManager.CancelStorageDrsRecommendation.apply( this, arguments ); }
  CancelTask() { return this.Task.CancelTask.apply( this, arguments ); }
  CancelWaitForUpdates() { return this.PropertyCollector.CancelWaitForUpdates.apply( this, arguments ); }
  CanProvisionObjects() { return this.HostVsanInternalSystem.CanProvisionObjects.apply( this, arguments ); }
  CertMgrRefreshCACertificatesAndCRLs_Task() { return this.CertificateManager.CertMgrRefreshCACertificatesAndCRLs_Task.apply( this, arguments ); }
  CertMgrRefreshCertificates_Task() { return this.CertificateManager.CertMgrRefreshCertificates_Task.apply( this, arguments ); }
  CertMgrRevokeCertificates_Task() { return this.CertificateManager.CertMgrRevokeCertificates_Task.apply( this, arguments ); }
  ChangeAccessMode() { return this.HostAccessManager.ChangeAccessMode.apply( this, arguments ); }
  ChangeFileAttributesInGuest() { return this.GuestFileManager.ChangeFileAttributesInGuest.apply( this, arguments ); }
  ChangeKey_Task() { return this.CryptoManagerHost.ChangeKey_Task.apply( this, arguments ); }
  ChangeLockdownMode() { return this.HostAccessManager.ChangeLockdownMode.apply( this, arguments ); }
  ChangeNFSUserPassword() { return this.HostStorageSystem.ChangeNFSUserPassword.apply( this, arguments ); }
  ChangeOwner() { return this.FileManager.ChangeOwner.apply( this, arguments ); }
  CheckAddHostEvc_Task() { return this.ClusterEVCManager.CheckAddHostEvc_Task.apply( this, arguments ); }
  CheckAnswerFileStatus_Task() { return this.HostProfileManager.CheckAnswerFileStatus_Task.apply( this, arguments ); }
  CheckClone_Task() { return this.VirtualMachineProvisioningChecker.CheckClone_Task.apply( this, arguments ); }
  CheckCompatibility_Task() { return this.VirtualMachineCompatibilityChecker.CheckCompatibility_Task.apply( this, arguments ); }
  CheckCompliance_Task() { return this.ProfileComplianceManager.CheckCompliance_Task.apply( this, arguments ); }
  CheckConfigureEvcMode_Task() { return this.ClusterEVCManager.CheckConfigureEvcMode_Task.apply( this, arguments ); }
  CheckCustomizationResources() { return this.CustomizationSpecManager.CheckCustomizationResources.apply( this, arguments ); }
  CheckCustomizationSpec() { return this.VirtualMachine.CheckCustomizationSpec.apply( this, arguments ); }
  CheckForUpdates() { return this.PropertyCollector.CheckForUpdates.apply( this, arguments ); }
  CheckHostPatch_Task() { return this.HostPatchManager.CheckHostPatch_Task.apply( this, arguments ); }
  CheckInstantClone_Task() { return this.VirtualMachineProvisioningChecker.CheckInstantClone_Task.apply( this, arguments ); }
  CheckLicenseFeature() { return this.LicenseManager.CheckLicenseFeature.apply( this, arguments ); }
  CheckMigrate_Task() { return this.VirtualMachineProvisioningChecker.CheckMigrate_Task.apply( this, arguments ); }
  CheckPowerOn_Task() { return this.VirtualMachineCompatibilityChecker.CheckPowerOn_Task.apply( this, arguments ); }
  CheckProfileCompliance_Task() { return this.Profile.CheckProfileCompliance_Task.apply( this, arguments ); }
  CheckRelocate_Task() { return this.VirtualMachineProvisioningChecker.CheckRelocate_Task.apply( this, arguments ); }
  CheckVmConfig_Task() { return this.VirtualMachineCompatibilityChecker.CheckVmConfig_Task.apply( this, arguments ); }
  ClearComplianceStatus() { return this.ProfileComplianceManager.ClearComplianceStatus.apply( this, arguments ); }
  ClearNFSUser() { return this.HostStorageSystem.ClearNFSUser.apply( this, arguments ); }
  ClearSystemEventLog() { return this.HostHealthStatusSystem.ClearSystemEventLog.apply( this, arguments ); }
  ClearTriggeredAlarms() { return this.AlarmManager.ClearTriggeredAlarms.apply( this, arguments ); }
  ClearVStorageObjectControlFlags() { return this.VcenterVStorageObjectManager.ClearVStorageObjectControlFlags.apply( this, arguments ); }
  CloneSession() { return this.SessionManager.CloneSession.apply( this, arguments ); }
  CloneVApp_Task() { return this.VirtualApp.CloneVApp_Task.apply( this, arguments ); }
  CloneVM_Task(connectionData: connectionData,
               managedVM: ManagedObjectReference & { type: 'VirtualMachine' },
               managedFolder: ManagedObjectReference & { type: 'Folder' },
               name: string,
               spec: VirtualMachineCloneSpec,
               returnOnTaskFinish: boolean = true) { return this.VirtualMachine.CloneVM_Task.apply( this, arguments ); }
  CloneVStorageObject_Task() { return this.VcenterVStorageObjectManager.CloneVStorageObject_Task.apply( this, arguments ); }
  CloseInventoryViewFolder() { return this.InventoryView.CloseInventoryViewFolder.apply( this, arguments ); }
  ClusterEnterMaintenanceMode() { return this.ClusterComputeResource.ClusterEnterMaintenanceMode.apply( this, arguments ); }
  CompositeHostProfile_Task() { return this.HostProfileManager.CompositeHostProfile_Task.apply( this, arguments ); }
  ComputeDiskPartitionInfo() { return this.HostStorageSystem.ComputeDiskPartitionInfo.apply( this, arguments ); }
  ComputeDiskPartitionInfoForResize() { return this.HostStorageSystem.ComputeDiskPartitionInfoForResize.apply( this, arguments ); }
  ConfigureCryptoKey() { return this.HostSystem.ConfigureCryptoKey.apply( this, arguments ); }
  ConfigureDatastoreIORM_Task() { return this.StorageResourceManager.ConfigureDatastoreIORM_Task.apply( this, arguments ); }
  ConfigureDatastorePrincipal() { return this.HostDatastoreSystem.ConfigureDatastorePrincipal.apply( this, arguments ); }
  ConfigureEvcMode_Task() { return this.ClusterEVCManager.ConfigureEvcMode_Task.apply( this, arguments ); }
  ConfigureHostCache_Task() { return this.HostCacheConfigurationManager.ConfigureHostCache_Task.apply( this, arguments ); }
  ConfigureLicenseSource() { return this.LicenseManager.ConfigureLicenseSource.apply( this, arguments ); }
  ConfigurePowerPolicy() { return this.HostPowerSystem.ConfigurePowerPolicy.apply( this, arguments ); }
  ConfigureStorageDrsForPod_Task() { return this.StorageResourceManager.ConfigureStorageDrsForPod_Task.apply( this, arguments ); }
  configureVcha_Task() { return this.FailoverClusterConfigurator.configureVcha_Task.apply( this, arguments ); }
  ConfigureVFlashResourceEx_Task() { return this.HostVFlashManager.ConfigureVFlashResourceEx_Task.apply( this, arguments ); }
  ConsolidateVMDisks_Task() { return this.VirtualMachine.ConsolidateVMDisks_Task.apply( this, arguments ); }
  ContinueRetrievePropertiesEx() { return this.PropertyCollector.ContinueRetrievePropertiesEx.apply( this, arguments ); }
  ConvertNamespacePathToUuidPath() { return this.DatastoreNamespaceManager.ConvertNamespacePathToUuidPath.apply( this, arguments ); }
  CopyDatastoreFile_Task(connectionData: connectionData,
                         srcDatastoreName: string,
                         srcPath: string,
                         srcDatacenter: ManagedObjectReference & { type: 'Datacenter' },
                         dstDatastoreName: string,
                         dstPath: string,
                         dstDatacenter: ManagedObjectReference & { type: 'Datacenter' },
                         force: boolean = false,
                         returnOnTaskFinish: boolean = true) { return this.FileManager.CopyDatastoreFile_Task.apply( this, arguments ); }
  CopyVirtualDisk_Task() { return this.VirtualDiskManager.CopyVirtualDisk_Task.apply( this, arguments ); }
  CreateAlarm() { return this.AlarmManager.CreateAlarm.apply( this, arguments ); }
  CreateChildVM_Task() { return this.ResourcePool.CreateChildVM_Task.apply( this, arguments ); }
  CreateCluster() { return this.Folder.CreateCluster.apply( this, arguments ); }
  CreateClusterEx() { return this.Folder.CreateClusterEx.apply( this, arguments ); }
  CreateCollectorForEvents() { return this.EventManager.CreateCollectorForEvents.apply( this, arguments ); }
  CreateCollectorForTasks() { return this.TaskManager.CreateCollectorForTasks.apply( this, arguments ); }
  CreateContainerView() { return this.ViewManager.CreateContainerView.apply( this, arguments ); }
  CreateCustomizationSpec() { return this.CustomizationSpecManager.CreateCustomizationSpec.apply( this, arguments ); }
  CreateDatacenter() { return this.Folder.CreateDatacenter.apply( this, arguments ); }
  CreateDefaultProfile() { return this.HostProfileManager.CreateDefaultProfile.apply( this, arguments ); }
  CreateDescriptor() { return this.OvfManager.CreateDescriptor.apply( this, arguments ); }
  CreateDiagnosticPartition() { return this.HostDiagnosticSystem.CreateDiagnosticPartition.apply( this, arguments ); }
  CreateDirectory() { return this.DatastoreNamespaceManager.CreateDirectory.apply( this, arguments ); }
  CreateDisk_Task() { return this.VcenterVStorageObjectManager.CreateDisk_Task.apply( this, arguments ); }
  CreateDiskFromSnapshot_Task() { return this.VcenterVStorageObjectManager.CreateDiskFromSnapshot_Task.apply( this, arguments ); }
  CreateDVPortgroup_Task() { return this.DistributedVirtualSwitch.CreateDVPortgroup_Task.apply( this, arguments ); }
  CreateDVS_Task() { return this.Folder.CreateDVS_Task.apply( this, arguments ); }
  CreateFilter() { return this.PropertyCollector.CreateFilter.apply( this, arguments ); }
  CreateFolder() { return this.Folder.CreateFolder.apply( this, arguments ); }
  CreateGroup() { return this.HostLocalAccountManager.CreateGroup.apply( this, arguments ); }
  CreateImportSpec() { return this.OvfManager.CreateImportSpec.apply( this, arguments ); }
  CreateInventoryView() { return this.ViewManager.CreateInventoryView.apply( this, arguments ); }
  CreateIpPool() { return this.IpPoolManager.CreateIpPool.apply( this, arguments ); }
  CreateListView() { return this.ViewManager.CreateListView.apply( this, arguments ); }
  CreateListViewFromView() { return this.ViewManager.CreateListViewFromView.apply( this, arguments ); }
  CreateLocalDatastore() { return this.HostDatastoreSystem.CreateLocalDatastore.apply( this, arguments ); }
  CreateNasDatastore(connectionData: connectionData,
                     managedDatstoreSystem: ManagedObjectReference & { type: 'HostDatastoreSystem' },
                     spec: HostNasVolumeSpec) { return this.HostDatastoreSystem.CreateNasDatastore.apply( this, arguments ); }
  CreateNvdimmNamespace_Task() { return this.HostNvdimmSystem.CreateNvdimmNamespace_Task.apply( this, arguments ); }
  CreateObjectScheduledTask() { return this.ScheduledTaskManager.CreateObjectScheduledTask.apply( this, arguments ); }
  createPassiveNode_Task() { return this.FailoverClusterConfigurator.createPassiveNode_Task.apply( this, arguments ); }
  CreatePerfInterval() { return this.PerformanceManager.CreatePerfInterval.apply( this, arguments ); }
  CreateProfile() { return this.ProfileManager.CreateProfile.apply( this, arguments ); }
  CreatePropertyCollector() { return this.PropertyCollector.CreatePropertyCollector.apply( this, arguments ); }
  CreateRegistryKeyInGuest() { return this.GuestWindowsRegistryManager.CreateRegistryKeyInGuest.apply( this, arguments ); }
  CreateResourcePool() { return this.ResourcePool.CreateResourcePool.apply( this, arguments ); }
  CreateScheduledTask() { return this.ScheduledTaskManager.CreateScheduledTask.apply( this, arguments ); }
  CreateScreenshot_Task() { return this.VirtualMachine.CreateScreenshot_Task.apply( this, arguments ); }
  CreateSecondaryVM_Task() { return this.VirtualMachine.CreateSecondaryVM_Task.apply( this, arguments ); }
  CreateSecondaryVMEx_Task() { return this.VirtualMachine.CreateSecondaryVMEx_Task.apply( this, arguments ); }
  CreateSnapshot_Task(connectionData: connectionData,
                      managedVM: ManagedObjectReference & { type: 'VirtualMachine' },
                      name: string,
                      memory: boolean,
                      quiesce: boolean,
                      description?: string,
                      returnOnTaskFinish: boolean = true) { return this.VirtualMachine.CreateSnapshot_Task.apply( this, arguments ); }
  CreateSnapshotEx_Task() { return this.VirtualMachine.CreateSnapshotEx_Task.apply( this, arguments ); }
  CreateStoragePod() { return this.Folder.CreateStoragePod.apply( this, arguments ); }
  CreateTask(connectionData: connectionData,
             managedTask: ManagedObjectReference & { type: 'Task' },
             taskTypeId: string,
             initiatedBy: string = 'SysOS Administrator',
             cancelable: boolean = false,
             parentTaskKey?: string,
             activationId?: string) { return this.TaskManager.CreateTask.apply( this, arguments ); }
  CreateTemporaryDirectoryInGuest() { return this.GuestFileManager.CreateTemporaryDirectoryInGuest.apply( this, arguments ); }
  CreateTemporaryFileInGuest() { return this.GuestFileManager.CreateTemporaryFileInGuest.apply( this, arguments ); }
  CreateUser() { return this.HostLocalAccountManager.CreateUser.apply( this, arguments ); }
  CreateVApp() { return this.ResourcePool.CreateVApp.apply( this, arguments ); }
  CreateVirtualDisk_Task() { return this.VirtualDiskManager.CreateVirtualDisk_Task.apply( this, arguments ); }
  CreateVM_Task() { return this.Folder.CreateVM_Task.apply( this, arguments ); }
  CreateVmfsDatastore() { return this.HostDatastoreSystem.CreateVmfsDatastore.apply( this, arguments ); }
  CreateVvolDatastore() { return this.HostDatastoreSystem.CreateVvolDatastore.apply( this, arguments ); }
  createWitnessNode_Task() { return this.FailoverClusterConfigurator.createWitnessNode_Task.apply( this, arguments ); }
  CryptoManagerHostEnable() { return this.CryptoManagerHost.CryptoManagerHostEnable.apply( this, arguments ); }
  CryptoManagerHostPrepare() { return this.CryptoManagerHost.CryptoManagerHostPrepare.apply( this, arguments ); }
  CryptoUnlock_Task() { return this.VirtualMachine.CryptoUnlock_Task.apply( this, arguments ); }
  CurrentTime() { return this.ServiceInstance.CurrentTime.apply( this, arguments ); }
  CustomizationSpecItemToXml() { return this.CustomizationSpecManager.CustomizationSpecItemToXml.apply( this, arguments ); }
  CustomizeVM_Task() { return this.VirtualMachine.CustomizeVM_Task.apply( this, arguments ); }
  DatastoreEnterMaintenanceMode() { return this.Datastore.DatastoreEnterMaintenanceMode.apply( this, arguments ); }
  DatastoreExitMaintenanceMode_Task() { return this.Datastore.DatastoreExitMaintenanceMode_Task.apply( this, arguments ); }
  DecodeLicense() { return this.LicenseManager.DecodeLicense.apply( this, arguments ); }
  DefragmentAllDisks() { return this.VirtualMachine.DefragmentAllDisks.apply( this, arguments ); }
  DefragmentVirtualDisk_Task() { return this.VirtualDiskManager.DefragmentVirtualDisk_Task.apply( this, arguments ); }
  DeleteCustomizationSpec() { return this.CustomizationSpecManager.DeleteCustomizationSpec.apply( this, arguments ); }
  DeleteDatastoreFile_Task(connectionData: connectionData,
                           datastoreName: string,
                           path: string,
                           managedDatacenter: ManagedObjectReference & { type: 'Datacenter' },
                           returnOnTaskFinish: boolean = true) { return this.FileManager.DeleteDatastoreFile_Task.apply( this, arguments ); }
  DeleteDirectory() { return this.DatastoreNamespaceManager.DeleteDirectory.apply( this, arguments ); }
  DeleteDirectoryInGuest() { return this.GuestFileManager.DeleteDirectoryInGuest.apply( this, arguments ); }
  DeleteFile() { return this.HostDatastoreBrowser.DeleteFile.apply( this, arguments ); }
  DeleteFileInGuest() { return this.GuestFileManager.DeleteFileInGuest.apply( this, arguments ); }
  DeleteHostSpecification() { return this.HostSpecificationManager.DeleteHostSpecification.apply( this, arguments ); }
  DeleteHostSubSpecification() { return this.HostSpecificationManager.DeleteHostSubSpecification.apply( this, arguments ); }
  DeleteNvdimmBlockNamespaces_Task() { return this.HostNvdimmSystem.DeleteNvdimmBlockNamespaces_Task.apply( this, arguments ); }
  DeleteNvdimmNamespace_Task() { return this.HostNvdimmSystem.DeleteNvdimmNamespace_Task.apply( this, arguments ); }
  DeleteRegistryKeyInGuest() { return this.GuestWindowsRegistryManager.DeleteRegistryKeyInGuest.apply( this, arguments ); }
  DeleteRegistryValueInGuest() { return this.GuestWindowsRegistryManager.DeleteRegistryValueInGuest.apply( this, arguments ); }
  DeleteScsiLunState() { return this.HostStorageSystem.DeleteScsiLunState.apply( this, arguments ); }
  DeleteSnapshot_Task() { return this.VcenterVStorageObjectManager.DeleteSnapshot_Task.apply( this, arguments ); }
  DeleteVffsVolumeState() { return this.HostStorageSystem.DeleteVffsVolumeState.apply( this, arguments ); }
  DeleteVirtualDisk_Task() { return this.VirtualDiskManager.DeleteVirtualDisk_Task.apply( this, arguments ); }
  DeleteVmfsVolumeState() { return this.HostStorageSystem.DeleteVmfsVolumeState.apply( this, arguments ); }
  DeleteVsanObjects() { return this.HostVsanInternalSystem.DeleteVsanObjects.apply( this, arguments ); }
  DeleteVStorageObject_Task() { return this.VcenterVStorageObjectManager.DeleteVStorageObject_Task.apply( this, arguments ); }
  deployVcha_Task() { return this.FailoverClusterConfigurator.deployVcha_Task.apply( this, arguments ); }
  DeselectVnic() { return this.HostVMotionSystem.DeselectVnic.apply( this, arguments ); }
  DeselectVnicForNicType() { return this.HostVirtualNicManager.DeselectVnicForNicType.apply( this, arguments ); }
  Destroy_Task() { return this.ManagedEntity.Destroy_Task.apply( this, arguments ); }
  DestroyChildren() { return this.ResourcePool.DestroyChildren.apply( this, arguments ); }
  DestroyCollector() { return this.HistoryCollector.DestroyCollector.apply( this, arguments ); }
  DestroyDatastore() { return this.Datastore.DestroyDatastore.apply( this, arguments ); }
  DestroyIpPool() { return this.IpPoolManager.DestroyIpPool.apply( this, arguments ); }
  DestroyNetwork() { return this.Network.DestroyNetwork.apply( this, arguments ); }
  DestroyProfile() { return this.Profile.DestroyProfile.apply( this, arguments ); }
  DestroyPropertyCollector() { return this.PropertyCollector.DestroyPropertyCollector.apply( this, arguments ); }
  DestroyPropertyFilter() { return this.PropertyFilter.DestroyPropertyFilter.apply( this, arguments ); }
  destroyVcha_Task() { return this.FailoverClusterConfigurator.destroyVcha_Task.apply( this, arguments ); }
  DestroyVffs() { return this.HostStorageSystem.DestroyVffs.apply( this, arguments ); }
  DestroyView() { return this.View.DestroyView.apply( this, arguments ); }
  DetachDisk_Task() { return this.VirtualMachine.DetachDisk_Task.apply( this, arguments ); }
  DetachScsiLun() { return this.HostStorageSystem.DetachScsiLun.apply( this, arguments ); }
  DetachScsiLunEx_Task() { return this.HostStorageSystem.DetachScsiLunEx_Task.apply( this, arguments ); }
  DetachTagFromVStorageObject() { return this.VcenterVStorageObjectManager.DetachTagFromVStorageObject.apply( this, arguments ); }
  DisableEvcMode_Task() { return this.ClusterEVCManager.DisableEvcMode_Task.apply( this, arguments ); }
  DisableFeature() { return this.LicenseManager.DisableFeature.apply( this, arguments ); }
  DisableHyperThreading() { return this.HostCpuSchedulerSystem.DisableHyperThreading.apply( this, arguments ); }
  DisableMultipathPath() { return this.HostStorageSystem.DisableMultipathPath.apply( this, arguments ); }
  DisableRuleset() { return this.HostFirewallSystem.DisableRuleset.apply( this, arguments ); }
  DisableSecondaryVM_Task() { return this.VirtualMachine.DisableSecondaryVM_Task.apply( this, arguments ); }
  DisableSmartCardAuthentication() { return this.HostActiveDirectoryAuthentication.DisableSmartCardAuthentication.apply( this, arguments ); }
  DisconnectHost_Task() { return this.HostSystem.DisconnectHost_Task.apply( this, arguments ); }
  DiscoverFcoeHbas() { return this.HostStorageSystem.DiscoverFcoeHbas.apply( this, arguments ); }
  DissociateProfile() { return this.Profile.DissociateProfile.apply( this, arguments ); }
  DoesCustomizationSpecExist() { return this.CustomizationSpecManager.DoesCustomizationSpecExist.apply( this, arguments ); }
  DuplicateCustomizationSpec() { return this.CustomizationSpecManager.DuplicateCustomizationSpec.apply( this, arguments ); }
  DVPortgroupRollback_Task() { return this.DistributedVirtualPortgroup.DVPortgroupRollback_Task.apply( this, arguments ); }
  DVSManagerExportEntity_Task() { return this.DistributedVirtualSwitchManager.DVSManagerExportEntity_Task.apply( this, arguments ); }
  DVSManagerImportEntity_Task() { return this.DistributedVirtualSwitchManager.DVSManagerImportEntity_Task.apply( this, arguments ); }
  DVSManagerLookupDvPortGroup() { return this.DistributedVirtualSwitchManager.DVSManagerLookupDvPortGroup.apply( this, arguments ); }
  DvsReconfigureVmVnicNetworkResourcePool_Task() { return this.DistributedVirtualSwitch.DvsReconfigureVmVnicNetworkResourcePool_Task.apply( this, arguments ); }
  DVSRollback_Task() { return this.DistributedVirtualSwitch.DVSRollback_Task.apply( this, arguments ); }
  EagerZeroVirtualDisk_Task() { return this.VirtualDiskManager.EagerZeroVirtualDisk_Task.apply( this, arguments ); }
  EnableAlarmActions() { return this.AlarmManager.EnableAlarmActions.apply( this, arguments ); }
  EnableCrypto() { return this.HostSystem.EnableCrypto.apply( this, arguments ); }
  EnableFeature() { return this.LicenseManager.EnableFeature.apply( this, arguments ); }
  EnableHyperThreading() { return this.HostCpuSchedulerSystem.EnableHyperThreading.apply( this, arguments ); }
  EnableMultipathPath() { return this.HostStorageSystem.EnableMultipathPath.apply( this, arguments ); }
  EnableNetworkResourceManagement() { return this.DistributedVirtualSwitch.EnableNetworkResourceManagement.apply( this, arguments ); }
  EnableRuleset() { return this.HostFirewallSystem.EnableRuleset.apply( this, arguments ); }
  EnableSecondaryVM_Task() { return this.VirtualMachine.EnableSecondaryVM_Task.apply( this, arguments ); }
  EnableSmartCardAuthentication() { return this.HostActiveDirectoryAuthentication.EnableSmartCardAuthentication.apply( this, arguments ); }
  EnterLockdownMode() { return this.HostSystem.EnterLockdownMode.apply( this, arguments ); }
  EnterMaintenanceMode_Task() { return this.HostSystem.EnterMaintenanceMode_Task.apply( this, arguments ); }
  EstimateDatabaseSize() { return this.ResourcePlanningManager.EstimateDatabaseSize.apply( this, arguments ); }
  EstimateStorageForConsolidateSnapshots_Task() { return this.VirtualMachine.EstimateStorageForConsolidateSnapshots_Task.apply( this, arguments ); }
  EsxAgentHostManagerUpdateConfig() { return this.HostEsxAgentHostManager.EsxAgentHostManagerUpdateConfig.apply( this, arguments ); }
  EvacuateVsanNode_Task() { return this.HostVsanSystem.EvacuateVsanNode_Task.apply( this, arguments ); }
  EvcManager() { return this.ClusterComputeResource.EvcManager.apply( this, arguments ); }
  ExecuteHostProfile() { return this.HostProfile.ExecuteHostProfile.apply( this, arguments ); }
  ExecuteSimpleCommand() { return this.SimpleCommand.ExecuteSimpleCommand.apply( this, arguments ); }
  ExitLockdownMode() { return this.HostSystem.ExitLockdownMode.apply( this, arguments ); }
  ExitMaintenanceMode_Task() { return this.HostSystem.ExitMaintenanceMode_Task.apply( this, arguments ); }
  ExpandVmfsDatastore() { return this.HostDatastoreSystem.ExpandVmfsDatastore.apply( this, arguments ); }
  ExpandVmfsExtent() { return this.HostStorageSystem.ExpandVmfsExtent.apply( this, arguments ); }
  ExportAnswerFile_Task() { return this.HostProfileManager.ExportAnswerFile_Task.apply( this, arguments ); }
  ExportProfile() { return this.Profile.ExportProfile.apply( this, arguments ); }
  ExportSnapshot() { return this.VirtualMachineSnapshot.ExportSnapshot.apply( this, arguments ); }
  ExportVApp() { return this.VirtualApp.ExportVApp.apply( this, arguments ); }
  ExportVm() { return this.VirtualMachine.ExportVm.apply( this, arguments ); }
  ExtendDisk_Task() { return this.VcenterVStorageObjectManager.ExtendDisk_Task.apply( this, arguments ); }
  ExtendVffs() { return this.HostStorageSystem.ExtendVffs.apply( this, arguments ); }
  ExtendVirtualDisk_Task() { return this.VirtualDiskManager.ExtendVirtualDisk_Task.apply( this, arguments ); }
  ExtendVmfsDatastore() { return this.HostDatastoreSystem.ExtendVmfsDatastore.apply( this, arguments ); }
  ExtractOvfEnvironment() { return this.VirtualMachine.ExtractOvfEnvironment.apply( this, arguments ); }
  FetchDVPortKeys() { return this.DistributedVirtualSwitch.FetchDVPortKeys.apply( this, arguments ); }
  FetchDVPorts() { return this.DistributedVirtualSwitch.FetchDVPorts.apply( this, arguments ); }
  fetchSoftwarePackages() { return this.HostImageConfigManager.fetchSoftwarePackages.apply( this, arguments ); }
  FetchSystemEventLog() { return this.HostHealthStatusSystem.FetchSystemEventLog.apply( this, arguments ); }
  FetchUserPrivilegeOnEntities() { return this.AuthorizationManager.FetchUserPrivilegeOnEntities.apply( this, arguments ); }
  FindAllByDnsName() { return this.SearchIndex.FindAllByDnsName.apply( this, arguments ); }
  FindAllByIp() { return this.SearchIndex.FindAllByIp.apply( this, arguments ); }
  FindAllByUuid() { return this.SearchIndex.FindAllByUuid.apply( this, arguments ); }
  FindAssociatedProfile() { return this.ProfileManager.FindAssociatedProfile.apply( this, arguments ); }
  FindByDatastorePath() { return this.SearchIndex.FindByDatastorePath.apply( this, arguments ); }
  FindByDnsName() { return this.SearchIndex.FindByDnsName.apply( this, arguments ); }
  FindByInventoryPath() { return this.SearchIndex.FindByInventoryPath.apply( this, arguments ); }
  FindByIp() { return this.SearchIndex.FindByIp.apply( this, arguments ); }
  FindByUuid(connectionData: connectionData,
             uuid: string,
             vmSearch: boolean,
             instanceUuid?: boolean,
             managedDatacenter?: ManagedObjectReference & { type: 'Datacenter' }) { return this.SearchIndex.FindByUuid.apply( this, arguments ); }
  FindChild() { return this.SearchIndex.FindChild.apply( this, arguments ); }
  FindExtension(connectionData: connectionData,
                extensionKey: string) { return this.ExtensionManager.FindExtension(connectionData, extensionKey); }
  FindRulesForVm() { return this.ClusterComputeResource.FindRulesForVm.apply( this, arguments ); }
  FormatVffs() { return this.HostStorageSystem.FormatVffs.apply( this, arguments ); }
  FormatVmfs() { return this.HostStorageSystem.FormatVmfs.apply( this, arguments ); }
  GenerateCertificateSigningRequest() { return this.HostCertificateManager.GenerateCertificateSigningRequest.apply( this, arguments ); }
  GenerateCertificateSigningRequestByDn() { return this.HostCertificateManager.GenerateCertificateSigningRequestByDn.apply( this, arguments ); }
  GenerateClientCsr() { return this.CryptoManagerKmip.GenerateClientCsr.apply( this, arguments ); }
  GenerateConfigTaskList() { return this.HostProfileManager.GenerateConfigTaskList.apply( this, arguments ); }
  GenerateHostConfigTaskSpec_Task() { return this.HostProfileManager.GenerateHostConfigTaskSpec_Task.apply( this, arguments ); }
  GenerateHostProfileTaskList_Task() { return this.HostProfileManager.GenerateHostProfileTaskList_Task.apply( this, arguments ); }
  GenerateKey() { return this.CryptoManagerKmip.GenerateKey.apply( this, arguments ); }
  GenerateLogBundles_Task() { return this.DiagnosticManager.GenerateLogBundles_Task.apply( this, arguments ); }
  GenerateSelfSignedClientCert() { return this.CryptoManagerKmip.GenerateSelfSignedClientCert.apply( this, arguments ); }
  GetAlarm() { return this.AlarmManager.GetAlarm.apply( this, arguments ); }
  GetAlarmState() { return this.AlarmManager.GetAlarmState.apply( this, arguments ); }
  getClusterMode() { return this.FailoverClusterManager.getClusterMode.apply( this, arguments ); }
  GetCustomizationSpec() { return this.CustomizationSpecManager.GetCustomizationSpec.apply( this, arguments ); }
  GetPublicKey() { return this.ExtensionManager.GetPublicKey.apply( this, arguments ); }
  GetResourceUsage() { return this.ClusterComputeResource.GetResourceUsage.apply( this, arguments ); }
  GetVchaClusterHealth() { return this.FailoverClusterManager.GetVchaClusterHealth.apply( this, arguments ); }
  getVchaConfig() { return this.FailoverClusterConfigurator.getVchaConfig.apply( this, arguments ); }
  GetVsanObjExtAttrs() { return this.HostVsanInternalSystem.GetVsanObjExtAttrs.apply( this, arguments ); }
  HasMonitoredEntity() { return this.HealthUpdateManager.HasMonitoredEntity.apply( this, arguments ); }
  HasPrivilegeOnEntities() { return this.AuthorizationManager.HasPrivilegeOnEntities.apply( this, arguments ); }
  HasPrivilegeOnEntity() { return this.AuthorizationManager.HasPrivilegeOnEntity.apply( this, arguments ); }
  HasProvider() { return this.HealthUpdateManager.HasProvider.apply( this, arguments ); }
  HasUserPrivilegeOnEntities() { return this.AuthorizationManager.HasUserPrivilegeOnEntities.apply( this, arguments ); }
  HostClearVStorageObjectControlFlags() { return this.HostVStorageObjectManager.HostClearVStorageObjectControlFlags.apply( this, arguments ); }
  HostCloneVStorageObject_Task() { return this.HostVStorageObjectManager.HostCloneVStorageObject_Task.apply( this, arguments ); }
  HostConfigureVFlashResource() { return this.HostVFlashManager.HostConfigureVFlashResource.apply( this, arguments ); }
  HostConfigVFlashCache() { return this.HostVFlashManager.HostConfigVFlashCache.apply( this, arguments ); }
  HostCreateDisk_Task() { return this.HostVStorageObjectManager.HostCreateDisk_Task.apply( this, arguments ); }
  HostDeleteVStorageObject_Task() { return this.HostVStorageObjectManager.HostDeleteVStorageObject_Task.apply( this, arguments ); }
  HostExtendDisk_Task() { return this.HostVStorageObjectManager.HostExtendDisk_Task.apply( this, arguments ); }
  HostGetVFlashModuleDefaultConfig() { return this.HostVFlashManager.HostGetVFlashModuleDefaultConfig.apply( this, arguments ); }
  HostImageConfigGetAcceptance() { return this.HostImageConfigManager.HostImageConfigGetAcceptance.apply( this, arguments ); }
  HostImageConfigGetProfile() { return this.HostImageConfigManager.HostImageConfigGetProfile.apply( this, arguments ); }
  HostInflateDisk_Task() { return this.HostVStorageObjectManager.HostInflateDisk_Task.apply( this, arguments ); }
  HostListVStorageObject() { return this.HostVStorageObjectManager.HostListVStorageObject.apply( this, arguments ); }
  HostProfileResetValidationState() { return this.HostProfile.HostProfileResetValidationState.apply( this, arguments ); }
  HostReconcileDatastoreInventory_Task() { return this.HostVStorageObjectManager.HostReconcileDatastoreInventory_Task.apply( this, arguments ); }
  HostRegisterDisk() { return this.HostVStorageObjectManager.HostRegisterDisk.apply( this, arguments ); }
  HostRelocateVStorageObject_Task() { return this.HostVStorageObjectManager.HostRelocateVStorageObject_Task.apply( this, arguments ); }
  HostRemoveVFlashResource() { return this.HostVFlashManager.HostRemoveVFlashResource.apply( this, arguments ); }
  HostRenameVStorageObject() { return this.HostVStorageObjectManager.HostRenameVStorageObject.apply( this, arguments ); }
  HostRetrieveVStorageInfrastructureObjectPolicy() { return this.HostVStorageObjectManager.HostRetrieveVStorageInfrastructureObjectPolicy.apply( this, arguments ); }
  HostRetrieveVStorageObject() { return this.HostVStorageObjectManager.HostRetrieveVStorageObject.apply( this, arguments ); }
  HostRetrieveVStorageObjectState() { return this.HostVStorageObjectManager.HostRetrieveVStorageObjectState.apply( this, arguments ); }
  HostScheduleReconcileDatastoreInventory() { return this.HostVStorageObjectManager.HostScheduleReconcileDatastoreInventory.apply( this, arguments ); }
  HostSetVStorageObjectControlFlags() { return this.HostVStorageObjectManager.HostSetVStorageObjectControlFlags.apply( this, arguments ); }
  HostSpecGetUpdatedHosts() { return this.HostSpecificationManager.HostSpecGetUpdatedHosts.apply( this, arguments ); }
  HostVStorageObjectCreateDiskFromSnapshot_Task() { return this.HostVStorageObjectManager.HostVStorageObjectCreateDiskFromSnapshot_Task.apply( this, arguments ); }
  HostVStorageObjectCreateSnapshot_Task() { return this.HostVStorageObjectManager.HostVStorageObjectCreateSnapshot_Task.apply( this, arguments ); }
  HostVStorageObjectDeleteSnapshot_Task() { return this.HostVStorageObjectManager.HostVStorageObjectDeleteSnapshot_Task.apply( this, arguments ); }
  HostVStorageObjectRetrieveSnapshotInfo() { return this.HostVStorageObjectManager.HostVStorageObjectRetrieveSnapshotInfo.apply( this, arguments ); }
  HostVStorageObjectRevert_Task() { return this.HostVStorageObjectManager.HostVStorageObjectRevert_Task.apply( this, arguments ); }
  HttpNfcLeaseAbort() { return this.HttpNfcLease.HttpNfcLeaseAbort.apply( this, arguments ); }
  HttpNfcLeaseComplete() { return this.HttpNfcLease.HttpNfcLeaseComplete.apply( this, arguments ); }
  HttpNfcLeaseGetManifest() { return this.HttpNfcLease.HttpNfcLeaseGetManifest.apply( this, arguments ); }
  HttpNfcLeaseProgress() { return this.HttpNfcLease.HttpNfcLeaseProgress.apply( this, arguments ); }
  HttpNfcLeasePullFromUrls_Task() { return this.HttpNfcLease.HttpNfcLeasePullFromUrls_Task.apply( this, arguments ); }
  HttpNfcLeaseSetManifestChecksumType() { return this.HttpNfcLease.HttpNfcLeaseSetManifestChecksumType.apply( this, arguments ); }
  ImpersonateUser() { return this.SessionManager.ImpersonateUser.apply( this, arguments ); }
  ImportCertificateForCAM_Task() { return this.HostActiveDirectoryAuthentication.ImportCertificateForCAM_Task.apply( this, arguments ); }
  ImportUnmanagedSnapshot() { return this.VirtualDiskManager.ImportUnmanagedSnapshot.apply( this, arguments ); }
  ImportVApp() { return this.ResourcePool.ImportVApp.apply( this, arguments ); }
  InflateDisk_Task() { return this.VcenterVStorageObjectManager.InflateDisk_Task.apply( this, arguments ); }
  InflateVirtualDisk_Task() { return this.VirtualDiskManager.InflateVirtualDisk_Task.apply( this, arguments ); }
  InitializeDisks_Task() { return this.HostVsanSystem.InitializeDisks_Task.apply( this, arguments ); }
  initiateFailover_Task() { return this.FailoverClusterManager.initiateFailover_Task.apply( this, arguments ); }
  InitiateFileTransferFromGuest() { return this.GuestFileManager.InitiateFileTransferFromGuest.apply( this, arguments ); }
  InitiateFileTransferToGuest() { return this.GuestFileManager.InitiateFileTransferToGuest.apply( this, arguments ); }
  installDate() { return this.HostImageConfigManager.installDate.apply( this, arguments ); }
  InstallHostPatch_Task() { return this.HostPatchManager.InstallHostPatch_Task.apply( this, arguments ); }
  InstallHostPatchV2_Task() { return this.HostPatchManager.InstallHostPatchV2_Task.apply( this, arguments ); }
  InstallIoFilter_Task() { return this.IoFilterManager.InstallIoFilter_Task.apply( this, arguments ); }
  InstallServerCertificate() { return this.HostCertificateManager.InstallServerCertificate.apply( this, arguments ); }
  InstallSmartCardTrustAnchor() { return this.HostActiveDirectoryAuthentication.InstallSmartCardTrustAnchor.apply( this, arguments ); }
  InstantClone_Task() { return this.VirtualMachine.InstantClone_Task.apply( this, arguments ); }
  IsSharedGraphicsActive() { return this.HostGraphicsManager.IsSharedGraphicsActive.apply( this, arguments ); }
  JoinDomain_Task() { return this.HostActiveDirectoryAuthentication.JoinDomain_Task.apply( this, arguments ); }
  JoinDomainWithCAM_Task() { return this.HostActiveDirectoryAuthentication.JoinDomainWithCAM_Task.apply( this, arguments ); }
  LeaveCurrentDomain_Task() { return this.HostActiveDirectoryAuthentication.LeaveCurrentDomain_Task.apply( this, arguments ); }
  ListCACertificateRevocationLists() { return this.HostCertificateManager.ListCACertificateRevocationLists.apply( this, arguments ); }
  ListCACertificates() { return this.HostCertificateManager.ListCACertificates.apply( this, arguments ); }
  ListFilesInGuest() { return this.GuestFileManager.ListFilesInGuest.apply( this, arguments ); }
  ListGuestAliases() { return this.GuestAliasManager.ListGuestAliases.apply( this, arguments ); }
  ListGuestMappedAliases() { return this.GuestAliasManager.ListGuestMappedAliases.apply( this, arguments ); }
  ListKeys() { return this.CryptoManager.ListKeys.apply( this, arguments ); }
  ListKmipServers() { return this.CryptoManagerKmip.ListKmipServers.apply( this, arguments ); }
  ListProcessesInGuest() { return this.GuestProcessManager.ListProcessesInGuest.apply( this, arguments ); }
  ListRegistryKeysInGuest() { return this.GuestWindowsRegistryManager.ListRegistryKeysInGuest.apply( this, arguments ); }
  ListRegistryValuesInGuest() { return this.GuestWindowsRegistryManager.ListRegistryValuesInGuest.apply( this, arguments ); }
  ListSmartCardTrustAnchors() { return this.HostActiveDirectoryAuthentication.ListSmartCardTrustAnchors.apply( this, arguments ); }
  ListTagsAttachedToVStorageObject() { return this.VcenterVStorageObjectManager.ListTagsAttachedToVStorageObject.apply( this, arguments ); }
  ListVStorageObject() { return this.VcenterVStorageObjectManager.ListVStorageObject.apply( this, arguments ); }
  ListVStorageObjectsAttachedToTag() { return this.VcenterVStorageObjectManager.ListVStorageObjectsAttachedToTag.apply( this, arguments ); }
  Login() { return this.SessionManager.Login.apply( this, arguments ); }
  LoginBySSPI() { return this.SessionManager.LoginBySSPI.apply( this, arguments ); }
  LoginByToken() { return this.SessionManager.LoginByToken.apply( this, arguments ); }
  LoginExtensionByCertificate() { return this.SessionManager.LoginExtensionByCertificate.apply( this, arguments ); }
  LoginExtensionBySubjectName() { return this.SessionManager.LoginExtensionBySubjectName.apply( this, arguments ); }
  Logout() { return this.SessionManager.Logout.apply( this, arguments ); }
  LogUserEvent() { return this.EventManager.LogUserEvent.apply( this, arguments ); }
  LookupDvPortGroup() { return this.DistributedVirtualSwitch.LookupDvPortGroup.apply( this, arguments ); }
  LookupVmOverheadMemory() { return this.OverheadMemoryManager.LookupVmOverheadMemory.apply( this, arguments ); }
  MakeDirectory(connectionData: connectionData,
                datastoreName: string,
                path: string,
                managedDatacenter: ManagedObjectReference & { type: 'Datacenter' },
                createParentDirectories: boolean = false) { return this.FileManager.MakeDirectory.apply( this, arguments ); }
  MakeDirectoryInGuest() { return this.GuestFileManager.MakeDirectoryInGuest.apply( this, arguments ); }
  MakePrimaryVM_Task() { return this.VirtualMachine.MakePrimaryVM_Task.apply( this, arguments ); }
  MarkAsLocal_Task() { return this.HostStorageSystem.MarkAsLocal_Task.apply( this, arguments ); }
  MarkAsNonLocal_Task() { return this.HostStorageSystem.MarkAsNonLocal_Task.apply( this, arguments ); }
  MarkAsNonSsd_Task() { return this.HostStorageSystem.MarkAsNonSsd_Task.apply( this, arguments ); }
  MarkAsSsd_Task() { return this.HostStorageSystem.MarkAsSsd_Task.apply( this, arguments ); }
  MarkAsTemplate() { return this.VirtualMachine.MarkAsTemplate.apply( this, arguments ); }
  MarkAsVirtualMachine() { return this.VirtualMachine.MarkAsVirtualMachine.apply( this, arguments ); }
  MarkDefault() { return this.CryptoManagerKmip.MarkDefault.apply( this, arguments ); }
  MarkForRemoval() { return this.HostStorageSystem.MarkForRemoval.apply( this, arguments ); }
  MergeDvs_Task() { return this.DistributedVirtualSwitch.MergeDvs_Task.apply( this, arguments ); }
  MergePermissions() { return this.AuthorizationManager.MergePermissions.apply( this, arguments ); }
  MigrateVM_Task() { return this.VirtualMachine.MigrateVM_Task.apply( this, arguments ); }
  ModifyListView() { return this.ListView.ModifyListView.apply( this, arguments ); }
  MountToolsInstaller() { return this.VirtualMachine.MountToolsInstaller.apply( this, arguments ); }
  MountVffsVolume() { return this.HostStorageSystem.MountVffsVolume.apply( this, arguments ); }
  MountVmfsVolume() { return this.HostStorageSystem.MountVmfsVolume.apply( this, arguments ); }
  MountVmfsVolumeEx_Task() { return this.HostStorageSystem.MountVmfsVolumeEx_Task.apply( this, arguments ); }
  MoveDatastoreFile_Task(connectionData: connectionData,
                         srcDatastoreName: string,
                         srcPath: string,
                         srcDatacenter: ManagedObjectReference & { type: 'Datacenter' },
                         dstDatastoreName: string,
                         dstPath: string,
                         dstDatacenter: ManagedObjectReference & { type: 'Datacenter' },
                         force: boolean = false,
                         returnOnTaskFinish: boolean = true) { return this.FileManager.MoveDatastoreFile_Task.apply( this, arguments ); }
  MoveDirectoryInGuest() { return this.GuestFileManager.MoveDirectoryInGuest.apply( this, arguments ); }
  MoveDVPort_Task() { return this.DistributedVirtualSwitch.MoveDVPort_Task.apply( this, arguments ); }
  MoveFileInGuest() { return this.GuestFileManager.MoveFileInGuest.apply( this, arguments ); }
  MoveHostInto_Task() { return this.ClusterComputeResource.MoveHostInto_Task.apply( this, arguments ); }
  MoveInto_Task() { return this.ClusterComputeResource.MoveInto_Task.apply( this, arguments ); }
  MoveIntoFolder_Task() { return this.Folder.MoveIntoFolder_Task.apply( this, arguments ); }
  MoveIntoResourcePool() { return this.ResourcePool.MoveIntoResourcePool.apply( this, arguments ); }
  MoveVirtualDisk_Task() { return this.VirtualDiskManager.MoveVirtualDisk_Task.apply( this, arguments ); }
  OpenInventoryViewFolder() { return this.InventoryView.OpenInventoryViewFolder.apply( this, arguments ); }
  OverwriteCustomizationSpec() { return this.CustomizationSpecManager.OverwriteCustomizationSpec.apply( this, arguments ); }
  ParseDescriptor() { return this.OvfManager.ParseDescriptor.apply( this, arguments ); }
  PerformDvsProductSpecOperation_Task() { return this.DistributedVirtualSwitch.PerformDvsProductSpecOperation_Task.apply( this, arguments ); }
  PerformVsanUpgrade_Task() { return this.VsanUpgradeSystem.PerformVsanUpgrade_Task.apply( this, arguments ); }
  PerformVsanUpgradePreflightCheck() { return this.VsanUpgradeSystem.PerformVsanUpgradePreflightCheck.apply( this, arguments ); }
  PlaceVm() { return this.ClusterComputeResource.PlaceVm.apply( this, arguments ); }
  PostEvent() { return this.EventManager.PostEvent.apply( this, arguments ); }
  PostHealthUpdates() { return this.HealthUpdateManager.PostHealthUpdates.apply( this, arguments ); }
  PowerDownHostToStandBy_Task() { return this.HostSystem.PowerDownHostToStandBy_Task.apply( this, arguments ); }
  PowerOffVApp_Task() { return this.VirtualApp.PowerOffVApp_Task.apply( this, arguments ); }
  PowerOffVM_Task(connectionData: connectionData,
                  managedVM: ManagedObjectReference & { type: 'VirtualMachine' },
                  returnOnTaskFinish: boolean = true) { return this.VirtualMachine.PowerOffVM_Task.apply( this, arguments ); }
  PowerOnMultiVM_Task() { return this.Datacenter.PowerOnMultiVM_Task.apply( this, arguments ); }
  PowerOnVApp_Task() { return this.VirtualApp.PowerOnVApp_Task.apply( this, arguments ); }
  PowerOnVM_Task(connectionData: connectionData,
                 managedVM: ManagedObjectReference & { type: 'VirtualMachine' },
                 managedHost?: ManagedObjectReference & { type: 'HostSystem' },
                 returnOnTaskFinish: boolean = true) { return this.VirtualMachine.PowerOnVM_Task.apply( this, arguments ); }
  PowerUpHostFromStandBy_Task() { return this.HostSystem.PowerUpHostFromStandBy_Task.apply( this, arguments ); }
  PrepareCrypto() { return this.HostSystem.PrepareCrypto.apply( this, arguments ); }
  prepareVcha_Task() { return this.FailoverClusterConfigurator.prepareVcha_Task.apply( this, arguments ); }
  PromoteDisks_Task() { return this.VirtualMachine.PromoteDisks_Task.apply( this, arguments ); }
  PutUsbScanCodes() { return this.VirtualMachine.PutUsbScanCodes.apply( this, arguments ); }
  QueryAnswerFileStatus() { return this.HostProfileManager.QueryAnswerFileStatus.apply( this, arguments ); }
  QueryAssignedLicenses() { return this.LicenseAssignmentManager.QueryAssignedLicenses.apply( this, arguments ); }
  QueryAvailableDisksForVmfs() { return this.HostDatastoreSystem.QueryAvailableDisksForVmfs.apply( this, arguments ); }
  QueryAvailableDvsSpec() { return this.DistributedVirtualSwitchManager.QueryAvailableDvsSpec.apply( this, arguments ); }
  QueryAvailablePartition() { return this.HostDiagnosticSystem.QueryAvailablePartition.apply( this, arguments ); }
  QueryAvailablePerfMetric(connectionData: connectionData,
                           managedObject: ManagedObjectReference,
                           beginTime?: Date,
                           endTime?: Date,
                           intervalId?: number) { return this.PerformanceManager.QueryAvailablePerfMetric.apply( this, arguments ); }
  QueryAvailableSsds() { return this.HostStorageSystem.QueryAvailableSsds.apply( this, arguments ); }
  QueryAvailableTimeZones() { return this.HostDateTimeSystem.QueryAvailableTimeZones.apply( this, arguments ); }
  QueryBootDevices() { return this.HostBootDeviceSystem.QueryBootDevices.apply( this, arguments ); }
  QueryBoundVnics() { return this.IscsiManager.QueryBoundVnics.apply( this, arguments ); }
  QueryCandidateNics() { return this.IscsiManager.QueryCandidateNics.apply( this, arguments ); }
  QueryChangedDiskAreas() { return this.VirtualMachine.QueryChangedDiskAreas.apply( this, arguments ); }
  QueryCmmds() { return this.HostVsanInternalSystem.QueryCmmds.apply( this, arguments ); }
  QueryCompatibleHostForExistingDvs() { return this.DistributedVirtualSwitchManager.QueryCompatibleHostForExistingDvs.apply( this, arguments ); }
  QueryCompatibleHostForNewDvs() { return this.DistributedVirtualSwitchManager.QueryCompatibleHostForNewDvs.apply( this, arguments ); }
  QueryComplianceStatus() { return this.ProfileComplianceManager.QueryComplianceStatus.apply( this, arguments ); }
  QueryConfigOption() { return this.EnvironmentBrowser.QueryConfigOption.apply( this, arguments ); }
  QueryConfigOptionDescriptor() { return this.EnvironmentBrowser.QueryConfigOptionDescriptor.apply( this, arguments ); }
  QueryConfigOptionEx() { return this.EnvironmentBrowser.QueryConfigOptionEx.apply( this, arguments ); }
  QueryConfigTarget() { return this.EnvironmentBrowser.QueryConfigTarget.apply( this, arguments ); }
  QueryConfiguredModuleOptionString() { return this.HostKernelModuleSystem.QueryConfiguredModuleOptionString.apply( this, arguments ); }
  QueryConnectionInfo() { return this.Datacenter.QueryConnectionInfo.apply( this, arguments ); }
  QueryConnectionInfoViaSpec() { return this.Datacenter.QueryConnectionInfoViaSpec.apply( this, arguments ); }
  queryDatacenterConfigOptionDescriptor() { return this.Datacenter.queryDatacenterConfigOptionDescriptor.apply( this, arguments ); }
  QueryDatastorePerformanceSummary() { return this.StorageResourceManager.QueryDatastorePerformanceSummary.apply( this, arguments ); }
  QueryDateTime() { return this.HostDateTimeSystem.QueryDateTime.apply( this, arguments ); }
  QueryDescriptions() { return this.DiagnosticManager.QueryDescriptions.apply( this, arguments ); }
  QueryDisksForVsan() { return this.HostVsanSystem.QueryDisksForVsan.apply( this, arguments ); }
  QueryDisksUsingFilter() { return this.IoFilterManager.QueryDisksUsingFilter.apply( this, arguments ); }
  QueryDvsByUuid() { return this.DistributedVirtualSwitchManager.QueryDvsByUuid.apply( this, arguments ); }
  QueryDvsCheckCompatibility() { return this.DistributedVirtualSwitchManager.QueryDvsCheckCompatibility.apply( this, arguments ); }
  QueryDvsCompatibleHostSpec() { return this.DistributedVirtualSwitchManager.QueryDvsCompatibleHostSpec.apply( this, arguments ); }
  QueryDvsConfigTarget() { return this.DistributedVirtualSwitchManager.QueryDvsConfigTarget.apply( this, arguments ); }
  QueryDvsFeatureCapability() { return this.DistributedVirtualSwitchManager.QueryDvsFeatureCapability.apply( this, arguments ); }
  QueryEvents(connectionData: connectionData,
              filter: EventFilterSpec) { return this.EventManager.QueryEvents.apply( this, arguments ); }
  QueryExpressionMetadata() { return this.ProfileComplianceManager.QueryExpressionMetadata.apply( this, arguments ); }
  QueryExtensionIpAllocationUsage() { return this.ExtensionManager.QueryExtensionIpAllocationUsage.apply( this, arguments ); }
  QueryFaultToleranceCompatibility() { return this.VirtualMachine.QueryFaultToleranceCompatibility.apply( this, arguments ); }
  QueryFaultToleranceCompatibilityEx() { return this.VirtualMachine.QueryFaultToleranceCompatibilityEx.apply( this, arguments ); }
  QueryFilterEntities() { return this.HealthUpdateManager.QueryFilterEntities.apply( this, arguments ); }
  QueryFilterInfoIds() { return this.HealthUpdateManager.QueryFilterInfoIds.apply( this, arguments ); }
  QueryFilterList() { return this.HealthUpdateManager.QueryFilterList.apply( this, arguments ); }
  QueryFilterName() { return this.HealthUpdateManager.QueryFilterName.apply( this, arguments ); }
  QueryFirmwareConfigUploadURL() { return this.HostFirmwareSystem.QueryFirmwareConfigUploadURL.apply( this, arguments ); }
  QueryHealthUpdateInfos() { return this.HealthUpdateManager.QueryHealthUpdateInfos.apply( this, arguments ); }
  QueryHealthUpdates() { return this.HealthUpdateManager.QueryHealthUpdates.apply( this, arguments ); }
  QueryHostConnectionInfo() { return this.HostSystem.QueryHostConnectionInfo.apply( this, arguments ); }
  QueryHostPatch_Task() { return this.HostPatchManager.QueryHostPatch_Task.apply( this, arguments ); }
  QueryHostProfileMetadata() { return this.HostProfileManager.QueryHostProfileMetadata.apply( this, arguments ); }
  QueryHostStatus() { return this.HostVsanSystem.QueryHostStatus.apply( this, arguments ); }
  QueryIoFilterInfo() { return this.IoFilterManager.QueryIoFilterInfo.apply( this, arguments ); }
  QueryIoFilterIssues() { return this.IoFilterManager.QueryIoFilterIssues.apply( this, arguments ); }
  QueryIORMConfigOption() { return this.StorageResourceManager.QueryIORMConfigOption.apply( this, arguments ); }
  QueryIPAllocations() { return this.IpPoolManager.QueryIPAllocations.apply( this, arguments ); }
  QueryIpPools() { return this.IpPoolManager.QueryIpPools.apply( this, arguments ); }
  QueryLicenseSourceAvailability() { return this.LicenseManager.QueryLicenseSourceAvailability.apply( this, arguments ); }
  QueryLicenseUsage() { return this.LicenseManager.QueryLicenseUsage.apply( this, arguments ); }
  QueryLockdownExceptions() { return this.HostAccessManager.QueryLockdownExceptions.apply( this, arguments ); }
  QueryManagedBy() { return this.ExtensionManager.QueryManagedBy.apply( this, arguments ); }
  QueryMemoryOverhead() { return this.HostSystem.QueryMemoryOverhead.apply( this, arguments ); }
  QueryMemoryOverheadEx() { return this.HostSystem.QueryMemoryOverheadEx.apply( this, arguments ); }
  QueryMigrationDependencies() { return this.IscsiManager.QueryMigrationDependencies.apply( this, arguments ); }
  QueryModules() { return this.HostKernelModuleSystem.QueryModules.apply( this, arguments ); }
  QueryMonitoredEntities() { return this.HealthUpdateManager.QueryMonitoredEntities.apply( this, arguments ); }
  QueryNetConfig() { return this.HostVirtualNicManager.QueryNetConfig.apply( this, arguments ); }
  QueryNetworkHint() { return this.HostNetworkSystem.QueryNetworkHint.apply( this, arguments ); }
  QueryNFSUser() { return this.HostStorageSystem.QueryNFSUser.apply( this, arguments ); }
  QueryObjectsOnPhysicalVsanDisk() { return this.HostVsanInternalSystem.QueryObjectsOnPhysicalVsanDisk.apply( this, arguments ); }
  QueryOptions() { return this.OptionManager.QueryOptions.apply( this, arguments ); }
  QueryPartitionCreateDesc() { return this.HostDiagnosticSystem.QueryPartitionCreateDesc.apply( this, arguments ); }
  QueryPartitionCreateOptions() { return this.HostDiagnosticSystem.QueryPartitionCreateOptions.apply( this, arguments ); }
  QueryPathSelectionPolicyOptions() { return this.HostStorageSystem.QueryPathSelectionPolicyOptions.apply( this, arguments ); }
  QueryPerf(connectionData: connectionData,
            querySpec: PerfQuerySpec[]) { return this.PerformanceManager.QueryPerf.apply( this, arguments ); }
  QueryPerfComposite() { return this.PerformanceManager.QueryPerfComposite.apply( this, arguments ); }
  QueryPerfCounter(connectionData: connectionData,
                   counterId: number[]) { return this.PerformanceManager.QueryPerfCounter.apply( this, arguments ); }
  QueryPerfCounterByLevel(connectionData: connectionData,
                          level: number) { return this.PerformanceManager.QueryPerfCounterByLevel.apply( this, arguments ); }
  QueryPerfProviderSummary(connectionData: connectionData,
                           managedObject: ManagedObjectReference) { return this.PerformanceManager.QueryPerfProviderSummary.apply( this, arguments ); }
  QueryPhysicalVsanDisks() { return this.HostVsanInternalSystem.QueryPhysicalVsanDisks.apply( this, arguments ); }
  QueryPnicStatus() { return this.IscsiManager.QueryPnicStatus.apply( this, arguments ); }
  QueryPolicyMetadata() { return this.ProfileManager.QueryPolicyMetadata.apply( this, arguments ); }
  QueryProfileStructure() { return this.HostProfileManager.QueryProfileStructure.apply( this, arguments ); }
  QueryProviderList() { return this.HealthUpdateManager.QueryProviderList.apply( this, arguments ); }
  QueryProviderName() { return this.HealthUpdateManager.QueryProviderName.apply( this, arguments ); }
  QueryResourceConfigOption() { return this.ResourcePool.QueryResourceConfigOption.apply( this, arguments ); }
  QueryServiceList() { return this.ServiceManager.QueryServiceList.apply( this, arguments ); }
  QueryStorageArrayTypePolicyOptions() { return this.HostStorageSystem.QueryStorageArrayTypePolicyOptions.apply( this, arguments ); }
  QuerySupportedFeatures() { return this.LicenseManager.QuerySupportedFeatures.apply( this, arguments ); }
  QuerySyncingVsanObjects() { return this.HostVsanInternalSystem.QuerySyncingVsanObjects.apply( this, arguments ); }
  QuerySystemUsers() { return this.HostAccessManager.QuerySystemUsers.apply( this, arguments ); }
  QueryTargetCapabilities() { return this.EnvironmentBrowser.QueryTargetCapabilities.apply( this, arguments ); }
  QueryTpmAttestationReport() { return this.HostSystem.QueryTpmAttestationReport.apply( this, arguments ); }
  QueryUnmonitoredHosts() { return this.HealthUpdateManager.QueryUnmonitoredHosts.apply( this, arguments ); }
  QueryUnownedFiles() { return this.VirtualMachine.QueryUnownedFiles.apply( this, arguments ); }
  QueryUnresolvedVmfsVolume() { return this.HostStorageSystem.QueryUnresolvedVmfsVolume.apply( this, arguments ); }
  QueryUnresolvedVmfsVolumes() { return this.HostDatastoreSystem.QueryUnresolvedVmfsVolumes.apply( this, arguments ); }
  QueryUsedVlanIdInDvs() { return this.DistributedVirtualSwitch.QueryUsedVlanIdInDvs.apply( this, arguments ); }
  QueryVirtualDiskFragmentation() { return this.VirtualDiskManager.QueryVirtualDiskFragmentation.apply( this, arguments ); }
  QueryVirtualDiskGeometry() { return this.VirtualDiskManager.QueryVirtualDiskGeometry.apply( this, arguments ); }
  QueryVirtualDiskUuid() { return this.VirtualDiskManager.QueryVirtualDiskUuid.apply( this, arguments ); }
  QueryVmfsConfigOption() { return this.HostStorageSystem.QueryVmfsConfigOption.apply( this, arguments ); }
  QueryVmfsDatastoreCreateOptions() { return this.HostDatastoreSystem.QueryVmfsDatastoreCreateOptions.apply( this, arguments ); }
  QueryVmfsDatastoreExpandOptions() { return this.HostDatastoreSystem.QueryVmfsDatastoreExpandOptions.apply( this, arguments ); }
  QueryVmfsDatastoreExtendOptions() { return this.HostDatastoreSystem.QueryVmfsDatastoreExtendOptions.apply( this, arguments ); }
  QueryVMotionCompatibility() { return this.ServiceInstance.QueryVMotionCompatibility.apply( this, arguments ); }
  QueryVMotionCompatibilityEx_Task() { return this.VirtualMachineProvisioningChecker.QueryVMotionCompatibilityEx_Task.apply( this, arguments ); }
  QueryVnicStatus() { return this.IscsiManager.QueryVnicStatus.apply( this, arguments ); }
  QueryVsanObjects() { return this.HostVsanInternalSystem.QueryVsanObjects.apply( this, arguments ); }
  QueryVsanObjectUuidsByFilter() { return this.HostVsanInternalSystem.QueryVsanObjectUuidsByFilter.apply( this, arguments ); }
  QueryVsanStatistics() { return this.HostVsanInternalSystem.QueryVsanStatistics.apply( this, arguments ); }
  QueryVsanUpgradeStatus() { return this.VsanUpgradeSystem.QueryVsanUpgradeStatus.apply( this, arguments ); }
  ReadEnvironmentVariableInGuest() { return this.GuestProcessManager.ReadEnvironmentVariableInGuest.apply( this, arguments ); }
  ReadNextEvents() { return this.EventHistoryCollector.ReadNextEvents.apply( this, arguments ); }
  ReadNextTasks() { return this.TaskHistoryCollector.ReadNextTasks.apply( this, arguments ); }
  ReadPreviousEvents() { return this.EventHistoryCollector.ReadPreviousEvents.apply( this, arguments ); }
  ReadPreviousTasks() { return this.TaskHistoryCollector.ReadPreviousTasks.apply( this, arguments ); }
  RebootGuest(connectionData: connectionData,
              managedVM: ManagedObjectReference & { type: 'VirtualMachine' }) { return this.VirtualMachine.RebootGuest.apply( this, arguments ); }
  RebootHost_Task() { return this.HostSystem.RebootHost_Task.apply( this, arguments ); }
  RecommendDatastores() { return this.StorageResourceManager.RecommendDatastores.apply( this, arguments ); }
  RecommendHostsForVm() { return this.ClusterComputeResource.RecommendHostsForVm.apply( this, arguments ); }
  RecommissionVsanNode_Task() { return this.HostVsanSystem.RecommissionVsanNode_Task.apply( this, arguments ); }
  ReconcileDatastoreInventory_Task() { return this.VcenterVStorageObjectManager.ReconcileDatastoreInventory_Task.apply( this, arguments ); }
  ReconfigurationSatisfiable() { return this.HostVsanInternalSystem.ReconfigurationSatisfiable.apply( this, arguments ); }
  ReconfigureAlarm() { return this.Alarm.ReconfigureAlarm.apply( this, arguments ); }
  ReconfigureAutostart() { return this.HostAutoStartManager.ReconfigureAutostart.apply( this, arguments ); }
  ReconfigureCluster_Task() { return this.ClusterComputeResource.ReconfigureCluster_Task.apply( this, arguments ); }
  ReconfigureComputeResource_Task() { return this.ComputeResource.ReconfigureComputeResource_Task.apply( this, arguments ); }
  ReconfigureDatacenter_Task() { return this.Datacenter.ReconfigureDatacenter_Task.apply( this, arguments ); }
  ReconfigureDomObject() { return this.HostVsanInternalSystem.ReconfigureDomObject.apply( this, arguments ); }
  ReconfigureDVPort_Task() { return this.DistributedVirtualSwitch.ReconfigureDVPort_Task.apply( this, arguments ); }
  ReconfigureDVPortgroup_Task() { return this.DistributedVirtualPortgroup.ReconfigureDVPortgroup_Task.apply( this, arguments ); }
  ReconfigureDvs_Task() { return this.DistributedVirtualSwitch.ReconfigureDvs_Task.apply( this, arguments ); }
  ReconfigureHostForDAS_Task() { return this.HostSystem.ReconfigureHostForDAS_Task.apply( this, arguments ); }
  ReconfigureScheduledTask() { return this.ScheduledTask.ReconfigureScheduledTask.apply( this, arguments ); }
  ReconfigureServiceConsoleReservation() { return this.HostMemorySystem.ReconfigureServiceConsoleReservation.apply( this, arguments ); }
  ReconfigureSnmpAgent() { return this.HostSnmpSystem.ReconfigureSnmpAgent.apply( this, arguments ); }
  ReconfigureVirtualMachineReservation() { return this.HostMemorySystem.ReconfigureVirtualMachineReservation.apply( this, arguments ); }
  ReconfigVM_Task(connectionData: connectionData,
                  managedVM: ManagedObjectReference & { type: 'VirtualMachine' },
                  spec: VirtualMachineCloneSpec,
                  returnOnTaskFinish: boolean = true) { return this.VirtualMachine.ReconfigVM_Task.apply( this, arguments ); }
  ReconnectHost_Task() { return this.HostSystem.ReconnectHost_Task.apply( this, arguments ); }
  RectifyDvsHost_Task() { return this.DistributedVirtualSwitch.RectifyDvsHost_Task.apply( this, arguments ); }
  RectifyDvsOnHost_Task() { return this.DistributedVirtualSwitchManager.RectifyDvsOnHost_Task.apply( this, arguments ); }
  Refresh() { return this.HostPciPassthruSystem.Refresh.apply( this, arguments ); }
  RefreshDatastore() { return this.Datastore.RefreshDatastore.apply( this, arguments ); }
  RefreshDatastoreStorageInfo() { return this.Datastore.RefreshDatastoreStorageInfo.apply( this, arguments ); }
  RefreshDateTimeSystem() { return this.HostDateTimeSystem.RefreshDateTimeSystem.apply( this, arguments ); }
  RefreshDVPortState() { return this.DistributedVirtualSwitch.RefreshDVPortState.apply( this, arguments ); }
  RefreshFirewall() { return this.HostFirewallSystem.RefreshFirewall.apply( this, arguments ); }
  RefreshGraphicsManager() { return this.HostGraphicsManager.RefreshGraphicsManager.apply( this, arguments ); }
  RefreshHealthStatusSystem() { return this.HostHealthStatusSystem.RefreshHealthStatusSystem.apply( this, arguments ); }
  RefreshNetworkSystem() { return this.HostNetworkSystem.RefreshNetworkSystem.apply( this, arguments ); }
  RefreshRecommendation() { return this.ClusterComputeResource.RefreshRecommendation.apply( this, arguments ); }
  RefreshRuntime() { return this.ResourcePool.RefreshRuntime.apply( this, arguments ); }
  RefreshServices() { return this.HostServiceSystem.RefreshServices.apply( this, arguments ); }
  RefreshStorageDrsRecommendation() { return this.StorageResourceManager.RefreshStorageDrsRecommendation.apply( this, arguments ); }
  RefreshStorageDrsRecommendationsForPod_Task() { return this.StorageResourceManager.RefreshStorageDrsRecommendationsForPod_Task.apply( this, arguments ); }
  RefreshStorageInfo() { return this.VirtualMachine.RefreshStorageInfo.apply( this, arguments ); }
  RefreshStorageSystem() { return this.HostStorageSystem.RefreshStorageSystem.apply( this, arguments ); }
  RegisterChildVM_Task() { return this.ResourcePool.RegisterChildVM_Task.apply( this, arguments ); }
  RegisterDisk() { return this.VcenterVStorageObjectManager.RegisterDisk.apply( this, arguments ); }
  RegisterExtension(connectionData: connectionData,
                    extension: Extension) { return this.ExtensionManager.RegisterExtension.apply( this, arguments ); }
  RegisterHealthUpdateProvider() { return this.HealthUpdateManager.RegisterHealthUpdateProvider.apply( this, arguments ); }
  RegisterKmipServer() { return this.CryptoManagerKmip.RegisterKmipServer.apply( this, arguments ); }
  RegisterVM_Task(connectionData: connectionData,
                  managedFolder: ManagedObjectReference & { type: 'Folder' },
                  path: string,
                  name?: string,
                  asTemplate: boolean = false,
                  managedPool?: ManagedObjectReference & { type: 'ResourcePool' },
                  managedHost?: ManagedObjectReference & { type: 'HostSystem' },
                  returnOnTaskFinish: boolean = true) { return this.Folder.RegisterVM_Task.apply( this, arguments ); }
  ReleaseCredentialsInGuest() { return this.GuestAuthManager.ReleaseCredentialsInGuest.apply( this, arguments ); }
  ReleaseIpAllocation() { return this.IpPoolManager.ReleaseIpAllocation.apply( this, arguments ); }
  ReleaseManagedSnapshot() { return this.VirtualDiskManager.ReleaseManagedSnapshot.apply( this, arguments ); }
  Reload(connectionData: connectionData,
         managedObject: ManagedObjectReference) { return this.ManagedEntity.Reload.apply( this, arguments ); }
  reloadVirtualMachineFromPath_Task() { return this.VirtualMachine.reloadVirtualMachineFromPath_Task.apply( this, arguments ); }
  RelocateVM_Task() { return this.VirtualMachine.RelocateVM_Task.apply( this, arguments ); }
  RelocateVStorageObject_Task() { return this.VcenterVStorageObjectManager.RelocateVStorageObject_Task.apply( this, arguments ); }
  RemoveAlarm() { return this.Alarm.RemoveAlarm.apply( this, arguments ); }
  RemoveAllSnapshots_Task() { return this.VirtualMachine.RemoveAllSnapshots_Task.apply( this, arguments ); }
  RemoveAssignedLicense() { return this.LicenseAssignmentManager.RemoveAssignedLicense.apply( this, arguments ); }
  RemoveAuthorizationRole() { return this.AuthorizationManager.RemoveAuthorizationRole.apply( this, arguments ); }
  RemoveCustomFieldDef() { return this.CustomFieldsManager.RemoveCustomFieldDef.apply( this, arguments ); }
  RemoveDatastore(connectionData: connectionData,
                  managedDatastoreSystem: ManagedObjectReference & { type: 'HostDatastoreSystem' },
                  managedDatastore: ManagedObjectReference & { type: 'Datastore' }) { return this.HostDatastoreSystem.RemoveDatastore.apply( this, arguments ); }
  RemoveDatastoreEx_Task() { return this.HostDatastoreSystem.RemoveDatastoreEx_Task.apply( this, arguments ); }
  RemoveDisk_Task() { return this.HostVsanSystem.RemoveDisk_Task.apply( this, arguments ); }
  RemoveDiskMapping_Task() { return this.HostVsanSystem.RemoveDiskMapping_Task.apply( this, arguments ); }
  RemoveEntityPermission() { return this.AuthorizationManager.RemoveEntityPermission.apply( this, arguments ); }
  RemoveFilter() { return this.HealthUpdateManager.RemoveFilter.apply( this, arguments ); }
  RemoveFilterEntities() { return this.HealthUpdateManager.RemoveFilterEntities.apply( this, arguments ); }
  RemoveGroup() { return this.HostLocalAccountManager.RemoveGroup.apply( this, arguments ); }
  RemoveGuestAlias() { return this.GuestAliasManager.RemoveGuestAlias.apply( this, arguments ); }
  RemoveGuestAliasByCert() { return this.GuestAliasManager.RemoveGuestAliasByCert.apply( this, arguments ); }
  RemoveInternetScsiSendTargets() { return this.HostStorageSystem.RemoveInternetScsiSendTargets.apply( this, arguments ); }
  RemoveInternetScsiStaticTargets() { return this.HostStorageSystem.RemoveInternetScsiStaticTargets.apply( this, arguments ); }
  RemoveKey() { return this.CryptoManager.RemoveKey.apply( this, arguments ); }
  RemoveKeys() { return this.CryptoManager.RemoveKeys.apply( this, arguments ); }
  RemoveKmipServer() { return this.CryptoManagerKmip.RemoveKmipServer.apply( this, arguments ); }
  RemoveLicense() { return this.LicenseManager.RemoveLicense.apply( this, arguments ); }
  RemoveLicenseLabel() { return this.LicenseManager.RemoveLicenseLabel.apply( this, arguments ); }
  RemoveMonitoredEntities() { return this.HealthUpdateManager.RemoveMonitoredEntities.apply( this, arguments ); }
  RemoveNetworkResourcePool() { return this.DistributedVirtualSwitch.RemoveNetworkResourcePool.apply( this, arguments ); }
  RemovePerfInterval() { return this.PerformanceManager.RemovePerfInterval.apply( this, arguments ); }
  RemovePortGroup() { return this.HostNetworkSystem.RemovePortGroup.apply( this, arguments ); }
  RemoveScheduledTask() { return this.ScheduledTask.RemoveScheduledTask.apply( this, arguments ); }
  RemoveServiceConsoleVirtualNic() { return this.HostNetworkSystem.RemoveServiceConsoleVirtualNic.apply( this, arguments ); }
  RemoveSmartCardTrustAnchor() { return this.HostActiveDirectoryAuthentication.RemoveSmartCardTrustAnchor.apply( this, arguments ); }
  RemoveSmartCardTrustAnchorByFingerprint() { return this.HostActiveDirectoryAuthentication.RemoveSmartCardTrustAnchorByFingerprint.apply( this, arguments ); }
  RemoveSnapshot_Task(connectionData: connectionData,
                      managedVMSnapshot: ManagedObjectReference & { type: 'VirtualMachineSnapshot' },
                      removeChildren: boolean,
                      consolidate: boolean = true,
                      returnOnTaskFinish: boolean = true) { return this.VirtualMachineSnapshot.RemoveSnapshot_Task.apply( this, arguments ); }
  RemoveUser() { return this.HostLocalAccountManager.RemoveUser.apply( this, arguments ); }
  RemoveVirtualNic() { return this.HostNetworkSystem.RemoveVirtualNic.apply( this, arguments ); }
  RemoveVirtualSwitch() { return this.HostNetworkSystem.RemoveVirtualSwitch.apply( this, arguments ); }
  Rename_Task() { return this.ManagedEntity.Rename_Task.apply( this, arguments ); }
  RenameCustomFieldDef() { return this.CustomFieldsManager.RenameCustomFieldDef.apply( this, arguments ); }
  RenameCustomizationSpec() { return this.CustomizationSpecManager.RenameCustomizationSpec.apply( this, arguments ); }
  RenameDatastore() { return this.Datastore.RenameDatastore.apply( this, arguments ); }
  RenameSnapshot() { return this.VirtualMachineSnapshot.RenameSnapshot.apply( this, arguments ); }
  RenameVStorageObject() { return this.VcenterVStorageObjectManager.RenameVStorageObject.apply( this, arguments ); }
  ReplaceCACertificatesAndCRLs() { return this.HostCertificateManager.ReplaceCACertificatesAndCRLs.apply( this, arguments ); }
  ReplaceSmartCardTrustAnchors() { return this.HostActiveDirectoryAuthentication.ReplaceSmartCardTrustAnchors.apply( this, arguments ); }
  RescanAllHba() { return this.HostStorageSystem.RescanAllHba.apply( this, arguments ); }
  RescanHba() { return this.HostStorageSystem.RescanHba.apply( this, arguments ); }
  RescanVffs() { return this.HostStorageSystem.RescanVffs.apply( this, arguments ); }
  RescanVmfs() { return this.HostStorageSystem.RescanVmfs.apply( this, arguments ); }
  ResetCollector() { return this.HistoryCollector.ResetCollector.apply( this, arguments ); }
  ResetCounterLevelMapping() { return this.PerformanceManager.ResetCounterLevelMapping.apply( this, arguments ); }
  ResetEntityPermissions() { return this.AuthorizationManager.ResetEntityPermissions.apply( this, arguments ); }
  ResetFirmwareToFactoryDefaults() { return this.HostFirmwareSystem.ResetFirmwareToFactoryDefaults.apply( this, arguments ); }
  ResetGuestInformation() { return this.VirtualMachine.ResetGuestInformation.apply( this, arguments ); }
  ResetListView() { return this.ListView.ResetListView.apply( this, arguments ); }
  ResetListViewFromView() { return this.ListView.ResetListViewFromView.apply( this, arguments ); }
  ResetSystemHealthInfo() { return this.HostHealthStatusSystem.ResetSystemHealthInfo.apply( this, arguments ); }
  ResetVM_Task(connectionData: connectionData,
               managedVM: ManagedObjectReference & { type: 'VirtualMachine' },
               returnOnTaskFinish: boolean = true) { return this.VirtualMachine.ResetVM_Task.apply( this, arguments ); }
  ResignatureUnresolvedVmfsVolume_Task() { return this.HostDatastoreSystem.ResignatureUnresolvedVmfsVolume_Task.apply( this, arguments ); }
  ResolveInstallationErrorsOnCluster_Task() { return this.IoFilterManager.ResolveInstallationErrorsOnCluster_Task.apply( this, arguments ); }
  ResolveInstallationErrorsOnHost_Task() { return this.IoFilterManager.ResolveInstallationErrorsOnHost_Task.apply( this, arguments ); }
  ResolveMultipleUnresolvedVmfsVolumes() { return this.HostStorageSystem.ResolveMultipleUnresolvedVmfsVolumes.apply( this, arguments ); }
  ResolveMultipleUnresolvedVmfsVolumesEx_Task() { return this.HostStorageSystem.ResolveMultipleUnresolvedVmfsVolumesEx_Task.apply( this, arguments ); }
  RestartService() { return this.HostServiceSystem.RestartService.apply( this, arguments ); }
  RestartServiceConsoleVirtualNic() { return this.HostNetworkSystem.RestartServiceConsoleVirtualNic.apply( this, arguments ); }
  RestoreFirmwareConfiguration() { return this.HostFirmwareSystem.RestoreFirmwareConfiguration.apply( this, arguments ); }
  RetrieveAllPermissions() { return this.AuthorizationManager.RetrieveAllPermissions.apply( this, arguments ); }
  RetrieveAnswerFile() { return this.HostProfileManager.RetrieveAnswerFile.apply( this, arguments ); }
  RetrieveAnswerFileForProfile() { return this.HostProfileManager.RetrieveAnswerFileForProfile.apply( this, arguments ); }
  RetrieveArgumentDescription() { return this.EventManager.RetrieveArgumentDescription.apply( this, arguments ); }
  RetrieveClientCert() { return this.CryptoManagerKmip.RetrieveClientCert.apply( this, arguments ); }
  RetrieveClientCsr() { return this.CryptoManagerKmip.RetrieveClientCsr.apply( this, arguments ); }
  RetrieveDasAdvancedRuntimeInfo() { return this.ClusterComputeResource.RetrieveDasAdvancedRuntimeInfo.apply( this, arguments ); }
  RetrieveDescription() { return this.Profile.RetrieveDescription.apply( this, arguments ); }
  RetrieveDiskPartitionInfo() { return this.HostStorageSystem.RetrieveDiskPartitionInfo.apply( this, arguments ); }
  RetrieveEntityPermissions() { return this.AuthorizationManager.RetrieveEntityPermissions.apply( this, arguments ); }
  RetrieveEntityScheduledTask() { return this.ScheduledTaskManager.RetrieveEntityScheduledTask.apply( this, arguments ); }
  RetrieveHardwareUptime() { return this.HostSystem.RetrieveHardwareUptime.apply( this, arguments ); }
  RetrieveHostAccessControlEntries() { return this.HostAccessManager.RetrieveHostAccessControlEntries.apply( this, arguments ); }
  RetrieveHostCustomizations() { return this.HostProfileManager.RetrieveHostCustomizations.apply( this, arguments ); }
  RetrieveHostCustomizationsForProfile() { return this.HostProfileManager.RetrieveHostCustomizationsForProfile.apply( this, arguments ); }
  RetrieveHostSpecification() { return this.HostSpecificationManager.RetrieveHostSpecification.apply( this, arguments ); }
  RetrieveKmipServerCert() { return this.CryptoManagerKmip.RetrieveKmipServerCert.apply( this, arguments ); }
  RetrieveKmipServersStatus_Task() { return this.CryptoManagerKmip.RetrieveKmipServersStatus_Task.apply( this, arguments ); }
  RetrieveObjectScheduledTask() { return this.ScheduledTaskManager.RetrieveObjectScheduledTask.apply( this, arguments ); }
  RetrieveProductComponents() { return this.ServiceInstance.RetrieveProductComponents.apply( this, arguments ); }
  RetrieveProperties(connectionData: connectionData,
                     specSet: PropertyFilterSpec[],) { return this.PropertyCollector.RetrieveProperties.apply( this, arguments ); }
  RetrievePropertiesEx() { return this.PropertyCollector.RetrievePropertiesEx.apply( this, arguments ); }
  RetrieveRolePermissions() { return this.AuthorizationManager.RetrieveRolePermissions.apply( this, arguments ); }
  RetrieveSelfSignedClientCert() { return this.CryptoManagerKmip.RetrieveSelfSignedClientCert.apply( this, arguments ); }
  RetrieveServiceContent() { return this.ServiceInstance.RetrieveServiceContent.apply( this, arguments ); }
  RetrieveSnapshotInfo() { return this.VcenterVStorageObjectManager.RetrieveSnapshotInfo.apply( this, arguments ); }
  RetrieveUserGroups() { return this.UserDirectory.RetrieveUserGroups.apply( this, arguments ); }
  RetrieveVStorageInfrastructureObjectPolicy() { return this.VcenterVStorageObjectManager.RetrieveVStorageInfrastructureObjectPolicy.apply( this, arguments ); }
  RetrieveVStorageObject() { return this.VcenterVStorageObjectManager.RetrieveVStorageObject.apply( this, arguments ); }
  RetrieveVStorageObjectAssociations() { return this.VcenterVStorageObjectManager.RetrieveVStorageObjectAssociations.apply( this, arguments ); }
  RetrieveVStorageObjectState() { return this.VcenterVStorageObjectManager.RetrieveVStorageObjectState.apply( this, arguments ); }
  RevertToCurrentSnapshot_Task() { return this.VirtualMachine.RevertToCurrentSnapshot_Task.apply( this, arguments ); }
  RevertToSnapshot_Task(connectionData: connectionData,
                        managedVMSnapshot: ManagedObjectReference & { type: 'VirtualMachineSnapshot' },
                        managedHost?: ManagedObjectReference & { type: 'HostSystem' },
                        suppressPowerOn: boolean = false,
                        returnOnTaskFinish: boolean = true) { return this.VirtualMachineSnapshot.RevertToSnapshot_Task.apply( this, arguments ); }
  RevertVStorageObject_Task() { return this.VcenterVStorageObjectManager.RevertVStorageObject_Task.apply( this, arguments ); }
  RewindCollector() { return this.HistoryCollector.RewindCollector.apply( this, arguments ); }
  RunScheduledTask() { return this.ScheduledTask.RunScheduledTask.apply( this, arguments ); }
  RunVsanPhysicalDiskDiagnostics() { return this.HostVsanInternalSystem.RunVsanPhysicalDiskDiagnostics.apply( this, arguments ); }
  ScanHostPatch_Task() { return this.HostPatchManager.ScanHostPatch_Task.apply( this, arguments ); }
  ScanHostPatchV2_Task() { return this.HostPatchManager.ScanHostPatchV2_Task.apply( this, arguments ); }
  ScheduleReconcileDatastoreInventory() { return this.VcenterVStorageObjectManager.ScheduleReconcileDatastoreInventory.apply( this, arguments ); }
  SearchDatastore_Task(connectionData: connectionData,
                       managedDatastoreBrowser: ManagedObjectReference & { type: 'HostDatastoreBrowser' },
                       datastoreName: string,
                       path: string,
                       searchSpec?: HostDatastoreBrowserSearchSpec,
                       returnOnTaskFinish: boolean = true) { return this.HostDatastoreBrowser.SearchDatastore_Task.apply( this, arguments ); }
  SearchDatastoreSubFolders_Task() { return this.HostDatastoreBrowser.SearchDatastoreSubFolders_Task.apply( this, arguments ); }
  SelectActivePartition() { return this.HostDiagnosticSystem.SelectActivePartition.apply( this, arguments ); }
  SelectVnic() { return this.HostVMotionSystem.SelectVnic.apply( this, arguments ); }
  SelectVnicForNicType() { return this.HostVirtualNicManager.SelectVnicForNicType.apply( this, arguments ); }
  SendNMI() { return this.VirtualMachine.SendNMI.apply( this, arguments ); }
  SendTestNotification() { return this.HostSnmpSystem.SendTestNotification.apply( this, arguments ); }
  SessionIsActive() { return this.SessionManager.SessionIsActive.apply( this, arguments ); }
  setClusterMode_Task() { return this.FailoverClusterManager.setClusterMode_Task.apply( this, arguments ); }
  SetCollectorPageSize() { return this.HistoryCollector.SetCollectorPageSize.apply( this, arguments ); }
  setCustomValue() { return this.ExtensibleManagedObject.setCustomValue.apply( this, arguments ); }
  SetDisplayTopology() { return this.VirtualMachine.SetDisplayTopology.apply( this, arguments ); }
  SetEntityPermissions() { return this.AuthorizationManager.SetEntityPermissions.apply( this, arguments ); }
  SetExtensionCertificate() { return this.ExtensionManager.SetExtensionCertificate.apply( this, arguments ); }
  SetField() { return this.CustomFieldsManager.SetField.apply( this, arguments ); }
  SetLicenseEdition() { return this.LicenseManager.SetLicenseEdition.apply( this, arguments ); }
  SetLocale() { return this.SessionManager.SetLocale.apply( this, arguments ); }
  SetMultipathLunPolicy() { return this.HostStorageSystem.SetMultipathLunPolicy.apply( this, arguments ); }
  SetNFSUser() { return this.HostStorageSystem.SetNFSUser.apply( this, arguments ); }
  SetPublicKey() { return this.ExtensionManager.SetPublicKey.apply( this, arguments ); }
  SetRegistryValueInGuest() { return this.GuestWindowsRegistryManager.SetRegistryValueInGuest.apply( this, arguments ); }
  SetScreenResolution() { return this.VirtualMachine.SetScreenResolution.apply( this, arguments ); }
  SetTaskDescription() { return this.Task.SetTaskDescription.apply( this, arguments ); }
  SetTaskState(connectionData: connectionData,
               managedTask: ManagedObjectReference & { type: 'Task' },
               state: TaskInfoState,
               result?: any,
               fault?: MethodFault) { return this.Task.SetTaskState.apply( this, arguments ); }
  SetVirtualDiskUuid() { return this.VirtualDiskManager.SetVirtualDiskUuid.apply( this, arguments ); }
  SetVStorageObjectControlFlags() { return this.VcenterVStorageObjectManager.SetVStorageObjectControlFlags.apply( this, arguments ); }
  ShrinkVirtualDisk_Task() { return this.VirtualDiskManager.ShrinkVirtualDisk_Task.apply( this, arguments ); }
  ShutdownGuest(connectionData: connectionData,
                managedVM: ManagedObjectReference & { type: 'VirtualMachine' }) { return this.VirtualMachine.ShutdownGuest.apply( this, arguments ); }
  ShutdownHost_Task() { return this.HostSystem.ShutdownHost_Task.apply( this, arguments ); }
  StageHostPatch_Task() { return this.HostPatchManager.StageHostPatch_Task.apply( this, arguments ); }
  StampAllRulesWithUuid_Task() { return this.ClusterComputeResource.StampAllRulesWithUuid_Task.apply( this, arguments ); }
  StandbyGuest() { return this.VirtualMachine.StandbyGuest.apply( this, arguments ); }
  StartProgramInGuest() { return this.GuestProcessManager.StartProgramInGuest.apply( this, arguments ); }
  StartRecording_Task() { return this.VirtualMachine.StartRecording_Task.apply( this, arguments ); }
  StartReplaying_Task() { return this.VirtualMachine.StartReplaying_Task.apply( this, arguments ); }
  StartService() { return this.HostServiceSystem.StartService.apply( this, arguments ); }
  StopRecording_Task() { return this.VirtualMachine.StopRecording_Task.apply( this, arguments ); }
  StopReplaying_Task() { return this.VirtualMachine.StopReplaying_Task.apply( this, arguments ); }
  StopService() { return this.HostServiceSystem.StopService.apply( this, arguments ); }
  SuspendVApp_Task() { return this.VirtualApp.SuspendVApp_Task.apply( this, arguments ); }
  SuspendVM_Task(connectionData: connectionData,
                 managedVM: ManagedObjectReference & { type: 'VirtualMachine' },
                 returnOnTaskFinish: boolean = true) { return this.VirtualMachine.SuspendVM_Task.apply( this, arguments ); }
  TerminateFaultTolerantVM_Task() { return this.VirtualMachine.TerminateFaultTolerantVM_Task.apply( this, arguments ); }
  TerminateProcessInGuest() { return this.GuestProcessManager.TerminateProcessInGuest.apply( this, arguments ); }
  TerminateSession() { return this.SessionManager.TerminateSession.apply( this, arguments ); }
  TerminateVM() { return this.VirtualMachine.TerminateVM.apply( this, arguments ); }
  TurnDiskLocatorLedOff_Task() { return this.HostStorageSystem.TurnDiskLocatorLedOff_Task.apply( this, arguments ); }
  TurnDiskLocatorLedOn_Task() { return this.HostStorageSystem.TurnDiskLocatorLedOn_Task.apply( this, arguments ); }
  TurnOffFaultToleranceForVM_Task() { return this.VirtualMachine.TurnOffFaultToleranceForVM_Task.apply( this, arguments ); }
  UnassignUserFromGroup() { return this.HostLocalAccountManager.UnassignUserFromGroup.apply( this, arguments ); }
  UnbindVnic() { return this.IscsiManager.UnbindVnic.apply( this, arguments ); }
  UninstallHostPatch_Task() { return this.HostPatchManager.UninstallHostPatch_Task.apply( this, arguments ); }
  UninstallIoFilter_Task() { return this.IoFilterManager.UninstallIoFilter_Task.apply( this, arguments ); }
  UninstallService() { return this.HostServiceSystem.UninstallService.apply( this, arguments ); }
  UnmapVmfsVolumeEx_Task() { return this.HostStorageSystem.UnmapVmfsVolumeEx_Task.apply( this, arguments ); }
  UnmountDiskMapping_Task() { return this.HostVsanSystem.UnmountDiskMapping_Task.apply( this, arguments ); }
  UnmountForceMountedVmfsVolume() { return this.HostStorageSystem.UnmountForceMountedVmfsVolume.apply( this, arguments ); }
  UnmountToolsInstaller() { return this.VirtualMachine.UnmountToolsInstaller.apply( this, arguments ); }
  UnmountVffsVolume() { return this.HostStorageSystem.UnmountVffsVolume.apply( this, arguments ); }
  UnmountVmfsVolume() { return this.HostStorageSystem.UnmountVmfsVolume.apply( this, arguments ); }
  UnmountVmfsVolumeEx_Task() { return this.HostStorageSystem.UnmountVmfsVolumeEx_Task.apply( this, arguments ); }
  UnregisterAndDestroy_Task() { return this.Folder.UnregisterAndDestroy_Task.apply( this, arguments ); }
  UnregisterExtension() { return this.ExtensionManager.UnregisterExtension.apply( this, arguments ); }
  UnregisterHealthUpdateProvider() { return this.HealthUpdateManager.UnregisterHealthUpdateProvider.apply( this, arguments ); }
  unregisterVApp_Task() { return this.VirtualApp.unregisterVApp_Task.apply( this, arguments ); }
  UnregisterVM(connectionData: connectionData,
               managedVM: ManagedObjectReference & { type: 'VirtualMachine' }) { return this.VirtualMachine.UnregisterVM.apply( this, arguments ); }
  UpdateAnswerFile_Task() { return this.HostProfileManager.UpdateAnswerFile_Task.apply( this, arguments ); }
  UpdateAssignedLicense() { return this.LicenseAssignmentManager.UpdateAssignedLicense.apply( this, arguments ); }
  UpdateAuthorizationRole() { return this.AuthorizationManager.UpdateAuthorizationRole.apply( this, arguments ); }
  UpdateBootDevice() { return this.HostBootDeviceSystem.UpdateBootDevice.apply( this, arguments ); }
  UpdateChildResourceConfiguration() { return this.ResourcePool.UpdateChildResourceConfiguration.apply( this, arguments ); }
  UpdateClusterProfile() { return this.ClusterProfile.UpdateClusterProfile.apply( this, arguments ); }
  UpdateConfig() { return this.ResourcePool.UpdateConfig.apply( this, arguments ); }
  UpdateConsoleIpRouteConfig() { return this.HostNetworkSystem.UpdateConsoleIpRouteConfig.apply( this, arguments ); }
  UpdateCounterLevelMapping() { return this.PerformanceManager.UpdateCounterLevelMapping.apply( this, arguments ); }
  UpdateDateTime() { return this.HostDateTimeSystem.UpdateDateTime.apply( this, arguments ); }
  UpdateDateTimeConfig() { return this.HostDateTimeSystem.UpdateDateTimeConfig.apply( this, arguments ); }
  UpdateDefaultPolicy() { return this.HostFirewallSystem.UpdateDefaultPolicy.apply( this, arguments ); }
  UpdateDiskPartitions() { return this.HostStorageSystem.UpdateDiskPartitions.apply( this, arguments ); }
  UpdateDnsConfig() { return this.HostNetworkSystem.UpdateDnsConfig.apply( this, arguments ); }
  UpdateDvsCapability() { return this.DistributedVirtualSwitch.UpdateDvsCapability.apply( this, arguments ); }
  UpdateDVSHealthCheckConfig_Task() { return this.DistributedVirtualSwitch.UpdateDVSHealthCheckConfig_Task.apply( this, arguments ); }
  UpdateDVSLacpGroupConfig_Task() { return this.VmwareDistributedVirtualSwitch.UpdateDVSLacpGroupConfig_Task.apply( this, arguments ); }
  UpdateExtension() { return this.ExtensionManager.UpdateExtension.apply( this, arguments ); }
  UpdateFlags() { return this.HostSystem.UpdateFlags.apply( this, arguments ); }
  UpdateGraphicsConfig() { return this.HostGraphicsManager.UpdateGraphicsConfig.apply( this, arguments ); }
  UpdateHostCustomizations_Task() { return this.HostProfileManager.UpdateHostCustomizations_Task.apply( this, arguments ); }
  UpdateHostImageAcceptanceLevel() { return this.HostImageConfigManager.UpdateHostImageAcceptanceLevel.apply( this, arguments ); }
  UpdateHostProfile() { return this.HostProfile.UpdateHostProfile.apply( this, arguments ); }
  UpdateHostSpecification() { return this.HostSpecificationManager.UpdateHostSpecification.apply( this, arguments ); }
  UpdateHostSubSpecification() { return this.HostSpecificationManager.UpdateHostSubSpecification.apply( this, arguments ); }
  UpdateInternetScsiAdvancedOptions() { return this.HostStorageSystem.UpdateInternetScsiAdvancedOptions.apply( this, arguments ); }
  UpdateInternetScsiAlias() { return this.HostStorageSystem.UpdateInternetScsiAlias.apply( this, arguments ); }
  UpdateInternetScsiAuthenticationProperties() { return this.HostStorageSystem.UpdateInternetScsiAuthenticationProperties.apply( this, arguments ); }
  UpdateInternetScsiDigestProperties() { return this.HostStorageSystem.UpdateInternetScsiDigestProperties.apply( this, arguments ); }
  UpdateInternetScsiDiscoveryProperties() { return this.HostStorageSystem.UpdateInternetScsiDiscoveryProperties.apply( this, arguments ); }
  UpdateInternetScsiIPProperties() { return this.HostStorageSystem.UpdateInternetScsiIPProperties.apply( this, arguments ); }
  UpdateInternetScsiName() { return this.HostStorageSystem.UpdateInternetScsiName.apply( this, arguments ); }
  UpdateIpConfig() { return this.HostVMotionSystem.UpdateIpConfig.apply( this, arguments ); }
  UpdateIpmi() { return this.HostSystem.UpdateIpmi.apply( this, arguments ); }
  UpdateIpPool() { return this.IpPoolManager.UpdateIpPool.apply( this, arguments ); }
  UpdateIpRouteConfig() { return this.HostNetworkSystem.UpdateIpRouteConfig.apply( this, arguments ); }
  UpdateIpRouteTableConfig() { return this.HostNetworkSystem.UpdateIpRouteTableConfig.apply( this, arguments ); }
  UpdateKmipServer() { return this.CryptoManagerKmip.UpdateKmipServer.apply( this, arguments ); }
  UpdateKmsSignedCsrClientCert() { return this.CryptoManagerKmip.UpdateKmsSignedCsrClientCert.apply( this, arguments ); }
  UpdateLicense() { return this.LicenseManager.UpdateLicense.apply( this, arguments ); }
  UpdateLicenseLabel() { return this.LicenseManager.UpdateLicenseLabel.apply( this, arguments ); }
  UpdateLinkedChildren() { return this.VirtualApp.UpdateLinkedChildren.apply( this, arguments ); }
  UpdateLocalSwapDatastore() { return this.HostDatastoreSystem.UpdateLocalSwapDatastore.apply( this, arguments ); }
  UpdateLockdownExceptions() { return this.HostAccessManager.UpdateLockdownExceptions.apply( this, arguments ); }
  UpdateModuleOptionString() { return this.HostKernelModuleSystem.UpdateModuleOptionString.apply( this, arguments ); }
  UpdateNetworkConfig() { return this.HostNetworkSystem.UpdateNetworkConfig.apply( this, arguments ); }
  UpdateNetworkResourcePool() { return this.DistributedVirtualSwitch.UpdateNetworkResourcePool.apply( this, arguments ); }
  UpdateOptions() { return this.OptionManager.UpdateOptions.apply( this, arguments ); }
  UpdatePassthruConfig() { return this.HostPciPassthruSystem.UpdatePassthruConfig.apply( this, arguments ); }
  UpdatePerfInterval() { return this.PerformanceManager.UpdatePerfInterval.apply( this, arguments ); }
  UpdatePhysicalNicLinkSpeed() { return this.HostNetworkSystem.UpdatePhysicalNicLinkSpeed.apply( this, arguments ); }
  UpdatePortGroup() { return this.HostNetworkSystem.UpdatePortGroup.apply( this, arguments ); }
  UpdateProgress(connectionData: connectionData,
                 managedTask: ManagedObjectReference & { type: 'Task' },
                 percentDone: number) { return this.Task.UpdateProgress.apply( this, arguments ); }
  UpdateReferenceHost() { return this.HostProfile.UpdateReferenceHost.apply( this, arguments ); }
  UpdateRuleset(connectionData: connectionData,
                managedFirewallSystem: ManagedObjectReference & { type: 'HostFirewallSystem' },
                id: string,
                spec: HostFirewallRulesetRulesetSpec) { return this.HostFirewallSystem.UpdateRuleset.apply( this, arguments ); }
  UpdateScsiLunDisplayName() { return this.HostStorageSystem.UpdateScsiLunDisplayName.apply( this, arguments ); }
  UpdateSelfSignedClientCert() { return this.CryptoManagerKmip.UpdateSelfSignedClientCert.apply( this, arguments ); }
  UpdateServiceConsoleVirtualNic() { return this.HostNetworkSystem.UpdateServiceConsoleVirtualNic.apply( this, arguments ); }
  UpdateServiceMessage() { return this.SessionManager.UpdateServiceMessage.apply( this, arguments ); }
  UpdateServicePolicy() { return this.HostServiceSystem.UpdateServicePolicy.apply( this, arguments ); }
  UpdateSoftwareInternetScsiEnabled() { return this.HostStorageSystem.UpdateSoftwareInternetScsiEnabled.apply( this, arguments ); }
  UpdateSystemResources() { return this.HostSystem.UpdateSystemResources.apply( this, arguments ); }
  UpdateSystemSwapConfiguration() { return this.HostSystem.UpdateSystemSwapConfiguration.apply( this, arguments ); }
  UpdateSystemUsers() { return this.HostAccessManager.UpdateSystemUsers.apply( this, arguments ); }
  UpdateUser() { return this.HostLocalAccountManager.UpdateUser.apply( this, arguments ); }
  UpdateVAppConfig() { return this.VirtualApp.UpdateVAppConfig.apply( this, arguments ); }
  UpdateVirtualMachineFiles_Task() { return this.Datastore.UpdateVirtualMachineFiles_Task.apply( this, arguments ); }
  UpdateVirtualNic() { return this.HostNetworkSystem.UpdateVirtualNic.apply( this, arguments ); }
  UpdateVirtualSwitch() { return this.HostNetworkSystem.UpdateVirtualSwitch.apply( this, arguments ); }
  UpdateVmfsUnmapBandwidth() { return this.HostStorageSystem.UpdateVmfsUnmapBandwidth.apply( this, arguments ); }
  UpdateVmfsUnmapPriority() { return this.HostStorageSystem.UpdateVmfsUnmapPriority.apply( this, arguments ); }
  UpdateVsan_Task() { return this.HostVsanSystem.UpdateVsan_Task.apply( this, arguments ); }
  UpdateVStorageInfrastructureObjectPolicy_Task() { return this.VcenterVStorageObjectManager.UpdateVStorageInfrastructureObjectPolicy_Task.apply( this, arguments ); }
  UpdateVStorageObjectPolicy_Task() { return this.VcenterVStorageObjectManager.UpdateVStorageObjectPolicy_Task.apply( this, arguments ); }
  UpdateVVolVirtualMachineFiles_Task() { return this.Datastore.UpdateVVolVirtualMachineFiles_Task.apply( this, arguments ); }
  UpgradeIoFilter_Task() { return this.IoFilterManager.UpgradeIoFilter_Task.apply( this, arguments ); }
  UpgradeTools_Task() { return this.VirtualMachine.UpgradeTools_Task.apply( this, arguments ); }
  UpgradeVM_Task() { return this.VirtualMachine.UpgradeVM_Task.apply( this, arguments ); }
  UpgradeVmfs() { return this.HostStorageSystem.UpgradeVmfs.apply( this, arguments ); }
  UpgradeVmLayout() { return this.HostStorageSystem.UpgradeVmLayout.apply( this, arguments ); }
  UpgradeVsanObjects() { return this.HostVsanInternalSystem.UpgradeVsanObjects.apply( this, arguments ); }
  UploadClientCert() { return this.CryptoManagerKmip.UploadClientCert.apply( this, arguments ); }
  UploadKmipServerCert() { return this.CryptoManagerKmip.UploadKmipServerCert.apply( this, arguments ); }
  ValidateCredentialsInGuest() { return this.GuestAuthManager.ValidateCredentialsInGuest.apply( this, arguments ); }
  ValidateHost() { return this.OvfManager.ValidateHost.apply( this, arguments ); }
  ValidateHostProfileComposition_Task() { return this.HostProfileManager.ValidateHostProfileComposition_Task.apply( this, arguments ); }
  ValidateMigration() { return this.ServiceInstance.ValidateMigration.apply( this, arguments ); }
  ValidateStoragePodConfig() { return this.StorageResourceManager.ValidateStoragePodConfig.apply( this, arguments ); }
  VStorageObjectCreateSnapshot_Task() { return this.VcenterVStorageObjectManager.VStorageObjectCreateSnapshot_Task.apply( this, arguments ); }
  WaitForUpdates() { return this.PropertyCollector.WaitForUpdates.apply( this, arguments ); }
  WaitForUpdatesEx(connectionData: connectionData,
                   options?: WaitOptions,
                   version?: string) { return this.PropertyCollector.WaitForUpdatesEx.apply( this, arguments ); }
  XmlToCustomizationSpecItem() { return this.CustomizationSpecManager.XmlToCustomizationSpecItem.apply( this, arguments ); }
  ZeroFillVirtualDisk_Task() { return this.VirtualDiskManager.ZeroFillVirtualDisk_Task.apply( this, arguments ); }

  /**
   * BASIC
   */
  getClientVersion(connectionData: connectionData): Promise<any> {
    return this.http.post('/api/vmware/getClientVersion', {
      host: connectionData.host,
      port: connectionData.port,
    }).pipe(map((res: any) => {
        return this.SysosLibVmwareHelper.validResponse(res.data.ConfigRoot.clientConnection[0]);
      },
      error => {
        this.logger.error('[VMWare] -> getClientVersion -> Error while doing the call -> ', error);
      })).toPromise.apply( this, arguments );
  }

  connectvCenter(connectionData: connectionData): Promise<any> {
    return this.http.post('/api/vmware/connect', {
      host: connectionData.host,
      port: connectionData.port,
      credential: connectionData.credential
    }).pipe(map((data: any) => {
        return this.SysosLibVmwareHelper.validResponse(data.data);
      },
      error => {
        this.logger.error('[VMWare] -> connectvCenter -> Error while doing the call -> ', error);
      })).toPromise.apply( this, arguments );
  }

  connectvCenterSoap(connectionData: connectionData): Promise<any> {
    return this.http.post('/api/vmware/connectSoap', {
      host: connectionData.host,
      port: connectionData.port,
      credential: connectionData.credential
    }).pipe(map((data: any) => {
        return this.SysosLibVmwareHelper.validResponse(data.data);
      },
      error => {
        this.logger.error('[VMWare] -> connectvCenterSoap -> Error while doing the call -> ', error);
      })).toPromise.apply( this, arguments );
  }

  /**
   * CUSTOM FUNCTIONS
   */

  /**
   * Host
   */
  getComputeResource(connectionData: connectionData, computeResource: string): Promise<any> {

    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'ComputeResource',
        all: true
      }],
      objectSet: [{
        obj: {
          type: 'ComputeResource',
          value: computeResource
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getClusterComputeResource(connectionData: connectionData, clusterComputeResource: string): Promise<any> {

    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'ClusterComputeResource',
        all: true
      }],
      objectSet: [{
        obj: {
          type: 'ClusterComputeResource',
          value: clusterComputeResource
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getResourcePool(connectionData: connectionData, resourcePool: string): Promise<any> {

    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'ResourcePool',
        all: true
      }],
      objectSet: [{
        obj: {
          type: 'ResourcePool',
          value: resourcePool
        },
        skip: false
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(RetrievePropertiesResponse.returnval[0]));
    });

  }

  getHosts(connectionData: connectionData, datacenterFolder: string): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostSystem',
        all: true
      }],
      objectSet: [{
        obj: {
          type: 'Folder',
          value: datacenterFolder
        },
        skip: false,
        selectSet: [
          <TraversalSpec> {
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
          },
          <TraversalSpec> {
            name: 'datacenterDatastoreTraversalSpec',
            type: 'Datacenter',
            path: 'datastoreFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          },
          <TraversalSpec> {
            name: 'datacenterNetworkTraversalSpec',
            type: 'Datacenter',
            path: 'networkFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          },
          <TraversalSpec> {
            name: 'datacenterVmTraversalSpec',
            type: 'Datacenter',
            path: 'vmFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          },
          <TraversalSpec> {
            name: 'datacenterHostTraversalSpec',
            type: 'Datacenter',
            path: 'hostFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          },
          <TraversalSpec> {
            name: 'computeResourceHostTraversalSpec',
            type: 'ComputeResource',
            path: 'host',
            skip: false
          },
          <TraversalSpec> {
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
          },
          <TraversalSpec> {
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
          },
          <TraversalSpec> {
            name: 'hostVmTraversalSpec',
            type: 'HostSystem',
            path: 'vm',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          },
          <TraversalSpec> {
            name: 'resourcePoolVmTraversalSpec',
            type: 'ResourcePool',
            path: 'vm',
            skip: false
          }
        ]
      }]
    }]).then((RetrievePropertiesResponse) => {
      const res = [];

      RetrievePropertiesResponse.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    });

  }

  getHost(connectionData: connectionData, esxiHost): Promise<any> {
    return this.RetrieveProperties(connectionData, [{
      propSet: [{
        type: 'HostSystem',
        all: true
      }],
      objectSet: [{
        obj: {
          type: 'HostSystem',
          value: esxiHost
        },
        skip: false,
        selectSet: [
          <TraversalSpec> {
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
          },
          <TraversalSpec> {
            name: 'datacenterDatastoreTraversalSpec',
            type: 'Datacenter',
            path: 'datastoreFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          },
          <TraversalSpec> {
            name: 'datacenterNetworkTraversalSpec',
            type: 'Datacenter',
            path: 'networkFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          },
          <TraversalSpec> {
            name: 'datacenterVmTraversalSpec',
            type: 'Datacenter',
            path: 'vmFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          },
          <TraversalSpec> {
            name: 'datacenterHostTraversalSpec',
            type: 'Datacenter',
            path: 'hostFolder',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          },
          <TraversalSpec> {
            name: 'computeResourceHostTraversalSpec',
            type: 'ComputeResource',
            path: 'host',
            skip: false
          },
          <TraversalSpec> {
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
          },
          <TraversalSpec> {
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
          },
          <TraversalSpec> {
            name: 'hostVmTraversalSpec',
            type: 'HostSystem',
            path: 'vm',
            skip: false,
            selectSet: [
              {
                name: 'folderTraversalSpec'
              }
            ]
          },
          <TraversalSpec> {
            name: 'resourcePoolVmTraversalSpec',
            type: 'ResourcePool',
            path: 'vm',
            skip: false
          }
        ]
      }]
    }]).then((RetrievePropertiesResponse) => {

      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(RetrievePropertiesResponse.returnval[0]));
    });
  }








  createAllBasicDataFilter(credential, host, port): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <CreateFilter xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <spec>
        <propSet>
          <type>ManagedEntity</type>
          <all>false</all>
          <pathSet>name</pathSet>
          <pathSet>parent</pathSet>
        </propSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>name</pathSet>
          <pathSet>parent</pathSet>
          <pathSet>guest</pathSet>
          <pathSet>runtime.powerState</pathSet>
          <pathSet>runtime.connectionState</pathSet>
          <pathSet>runtime.faultToleranceState</pathSet>
          <pathSet>config.uuid</pathSet>
          <pathSet>summary.config.vmPathName</pathSet>
          <pathSet>summary.config.template</pathSet>
          <pathSet>datastore</pathSet>
          <pathSet>layout</pathSet>
          <pathSet>config.files.logDirectory</pathSet>
          <pathSet>config.hardware.device</pathSet>
          <pathSet>resourcePool</pathSet>
          <pathSet>runtime.host</pathSet>
          <pathSet>config.version</pathSet>
          <pathSet>config.changeTrackingEnabled</pathSet>
          <pathSet>config.ftInfo</pathSet>
          <pathSet>config.hardware.numCPU</pathSet>
          <pathSet>config.hardware.memoryMB</pathSet>
          <pathSet>config.files.snapshotDirectory</pathSet>
          <pathSet>config.extraConfig</pathSet>
          <pathSet>storage.perDatastoreUsage</pathSet>
          <pathSet>snapshot</pathSet>
          <pathSet>layoutEx</pathSet>
          <pathSet>config.guestId</pathSet>
          <pathSet>config.annotation</pathSet>
          <pathSet>customValue</pathSet>
          <pathSet>parentVApp</pathSet>
          <pathSet>runtime.consolidationNeeded</pathSet>
          <pathSet>config.flags.faultToleranceType</pathSet>
          <pathSet>config.forkConfigInfo</pathSet>
          <pathSet>config.files.vmPathName</pathSet>
        </propSet>
        <propSet>
          <type>Datacenter</type>
          <all>false</all>
          <pathSet>datastore</pathSet>
          <pathSet>vmFolder</pathSet>
        </propSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>vm</pathSet>
          <pathSet>datastore</pathSet>
          <pathSet>hardware.cpuInfo.numCpuPackages</pathSet>
          <pathSet>hardware.cpuFeature</pathSet>
          <pathSet>hardware.cpuInfo.hz</pathSet>
          <pathSet>hardware.systemInfo.uuid</pathSet>
          <pathSet>config.product.productLineId</pathSet>
          <pathSet>summary.config.product.fullName</pathSet>
          <pathSet>summary.config.product.version</pathSet>
          <pathSet>summary.config.product.apiVersion</pathSet>
          <pathSet>configManager.storageSystem</pathSet>
          <pathSet>hardware.cpuInfo.numCpuCores</pathSet>
          <pathSet>hardware.cpuInfo.numCpuThreads</pathSet>
          <pathSet>runtime</pathSet>
          <pathSet>config.vsanHostConfig.clusterInfo</pathSet>
        </propSet>
        <propSet>
          <type>HostStorageSystem</type>
          <all>false</all>
          <pathSet>storageDeviceInfo</pathSet>
          <pathSet>fileSystemVolumeInfo</pathSet>
        </propSet>
        <propSet>
          <type>Datastore</type>
          <all>false</all>
          <pathSet>info</pathSet>
          <pathSet>host</pathSet>
          <pathSet>summary.accessible</pathSet>
          <pathSet>summary.capacity</pathSet>
          <pathSet>summary.multipleHostAccess</pathSet>
          <pathSet>vm</pathSet>
          <pathSet>capability</pathSet>
          <pathSet>summary.type</pathSet>
        </propSet>
        <propSet>
          <type>ResourcePool</type>
          <all>false</all>
          <pathSet>vm</pathSet>
          <pathSet>name</pathSet>
          <pathSet>parent</pathSet>
          <pathSet>resourcePool</pathSet>
        </propSet>
        <propSet>
          <type>ClusterComputeResource</type>
          <all>false</all>
          <pathSet>configuration.drsConfig</pathSet>
          <pathSet>summary</pathSet>
          <pathSet>configurationEx.spbmEnabled</pathSet>
        </propSet>
        <propSet>
          <type>ComputeResource</type>
          <all>false</all>
          <pathSet>summary</pathSet>
          <pathSet>configurationEx.spbmEnabled</pathSet>
        </propSet>
        <propSet>
          <type>VirtualApp</type>
          <all>false</all>
          <pathSet>vm</pathSet>
          <pathSet>name</pathSet>
          <pathSet>parent</pathSet>
          <pathSet>parentFolder</pathSet>
          <pathSet>resourcePool</pathSet>
        </propSet>
        <propSet>
          <type>StoragePod</type>
          <all>false</all>
          <pathSet>name</pathSet>
          <pathSet>parent</pathSet>
          <pathSet>summary.capacity</pathSet>
          <pathSet>summary.freeSpace</pathSet>
          <pathSet>podStorageDrsEntry.storageDrsConfig.podConfig.enabled</pathSet>
          <pathSet>podStorageDrsEntry.storageDrsConfig.podConfig.defaultVmBehavior</pathSet>
        </propSet>
        <objectSet>
          <obj type="Folder">group-d1</obj>
          <skip>false</skip>
          <selectSet xsi:type="TraversalSpec">
            <name>resourcepool</name>
            <type>ResourcePool</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet>
              <name>resourcepool</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>ResourcePool</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>VirtualApp</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet>
                <name>vm_to_respool</name>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>ComputeResource</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet>
              <name>resourcepool</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>folder_to_parent</name>
            <type>Folder</type>
            <path>parent</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>parent</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_parent</name>
              </selectSet>
            </selectSet>
            <selectSet>
              <name>folder_to_parent</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>Datacenter</type>
            <path>parent</path>
            <skip>false</skip>
            <selectSet>
              <name>folder_to_parent</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>Datastore</type>
            <path>parent</path>
            <skip>false</skip>
            <selectSet>
              <name>folder_to_parent</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>StoragePod</type>
              <path>childEntity</path>
              <skip>false</skip>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>StoragePod</type>
              <path>childEntity</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_parent</name>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>folder_to_content</name>
            <type>Folder</type>
            <path>childEntity</path>
            <skip>false</skip>
            <selectSet>
              <name>folder_to_content</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>ClusterComputeResource</type>
              <path>host</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>vm</path>
                <skip>false</skip>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>ComputeResource</type>
              <path>host</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>vm</path>
                <skip>false</skip>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>configManager.storageSystem</path>
                <skip>false</skip>
              </selectSet>
            </selectSet>
            <selectSet>
              <name>folder_to_parent</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>ComputeResource</type>
              <path>resourcePool</path>
              <skip>false</skip>
              <selectSet>
                <name>resourcepool</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>hostFolder</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_content</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>vmFolder</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_content</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>VirtualApp</type>
              <path>resourcePool</path>
              <skip>false</skip>
              <selectSet>
                <name>resourcepool</name>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>ResourcePool</type>
                <path>vm</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>VirtualMachine</type>
                  <path>runtime.host</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ClusterComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>datastore</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>Datastore</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                        <selectSet>
                          <name>folder_to_parent</name>
                        </selectSet>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>VirtualMachine</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualApp</type>
                <path>vm</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>VirtualMachine</type>
                  <path>runtime.host</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ClusterComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>datastore</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>Datastore</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                        <selectSet>
                          <name>folder_to_parent</name>
                        </selectSet>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>VirtualMachine</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet>
                  <name>vm_to_respool</name>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>VirtualApp</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet>
                <name>vm_to_respool</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>datastoreFolder</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_content</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>VirtualMachine</type>
              <path>runtime.host</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>ClusterComputeResource</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>ComputeResource</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>HostSystem</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet>
              <name>vm_to_respool</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datastore</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet>
                <name>vm_to_respool</name>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>StoragePod</type>
              <path>childEntity</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>vm</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>VirtualMachine</type>
                  <path>runtime.host</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ClusterComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>ComputeResource</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>HostSystem</type>
                    <path>datastore</path>
                    <skip>false</skip>
                    <selectSet xsi:type="TraversalSpec">
                      <type>Datastore</type>
                      <path>parent</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                      </selectSet>
                      <selectSet xsi:type="TraversalSpec">
                        <type>StoragePod</type>
                        <path>childEntity</path>
                        <skip>false</skip>
                        <selectSet>
                          <name>folder_to_parent</name>
                        </selectSet>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet>
                  <name>vm_to_respool</name>
                </selectSet>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>Datacenter</type>
            <path>hostFolder</path>
            <skip>false</skip>
            <selectSet>
              <name>folder_to_content</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>ClusterComputeResource</type>
            <path>host</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>vm</path>
              <skip>false</skip>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>datastore</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>ComputeResource</type>
            <path>host</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>vm</path>
              <skip>false</skip>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>datastore</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>configManager.storageSystem</path>
              <skip>false</skip>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>VirtualMachine</type>
            <path>runtime.host</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>parent</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>ClusterComputeResource</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>ComputeResource</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>HostSystem</type>
              <path>datastore</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>StoragePod</type>
                  <path>childEntity</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>VirtualMachine</type>
            <path>datastore</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <type>Datastore</type>
              <path>parent</path>
              <skip>false</skip>
              <selectSet>
                <name>folder_to_parent</name>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>StoragePod</type>
                <path>childEntity</path>
                <skip>false</skip>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>StoragePod</type>
                <path>childEntity</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <name>vm_to_respool</name>
            <type>VirtualMachine</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet xsi:type="TraversalSpec">
              <name>respool_parent</name>
              <type>ResourcePool</type>
              <path>parent</path>
              <skip>false</skip>
              <selectSet>
                <name>respool_parent</name>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>ComputeResource</type>
                <path>parent</path>
                <skip>false</skip>
                <selectSet>
                  <name>folder_to_parent</name>
                </selectSet>
              </selectSet>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>VirtualMachine</type>
            <path>parent</path>
            <skip>false</skip>
            <selectSet>
              <name>folder_to_parent</name>
            </selectSet>
          </selectSet>
          <selectSet xsi:type="TraversalSpec">
            <type>VirtualApp</type>
            <path>resourcePool</path>
            <skip>false</skip>
            <selectSet>
              <name>resourcepool</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>ResourcePool</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>VirtualApp</type>
              <path>vm</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>runtime.host</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ClusterComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>ComputeResource</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
                <selectSet xsi:type="TraversalSpec">
                  <type>HostSystem</type>
                  <path>datastore</path>
                  <skip>false</skip>
                  <selectSet xsi:type="TraversalSpec">
                    <type>Datastore</type>
                    <path>parent</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                    </selectSet>
                    <selectSet xsi:type="TraversalSpec">
                      <type>StoragePod</type>
                      <path>childEntity</path>
                      <skip>false</skip>
                      <selectSet>
                        <name>folder_to_parent</name>
                      </selectSet>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet xsi:type="TraversalSpec">
                <type>VirtualMachine</type>
                <path>datastore</path>
                <skip>false</skip>
                <selectSet xsi:type="TraversalSpec">
                  <type>Datastore</type>
                  <path>parent</path>
                  <skip>false</skip>
                  <selectSet>
                    <name>folder_to_parent</name>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                  </selectSet>
                  <selectSet xsi:type="TraversalSpec">
                    <type>StoragePod</type>
                    <path>childEntity</path>
                    <skip>false</skip>
                    <selectSet>
                      <name>folder_to_parent</name>
                    </selectSet>
                  </selectSet>
                </selectSet>
              </selectSet>
              <selectSet>
                <name>vm_to_respool</name>
              </selectSet>
            </selectSet>
          </selectSet>
        </objectSet>
      </spec>
      <partialUpdates>false</partialUpdates>
    </CreateFilter>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.CreateFilterResponse[0].returnval[0]._);
    })).toPromise.apply( this, arguments );
  }


  /**
   * Ticket
   */

  acquireNFCTicket(credential, host, port, esxiHost, datastore): Promise<any> {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:vim="urn:internalvim25">
  <SOAP-ENV:Body>
    <vim:NfcFileManagement xsi:type="vim:NfcFileManagementRequestType">
      <vim:_this xsi:type="vim:ManagedObjectReference" type="NfcService">nfcService</vim:_this>
      <vim:ds xsi:type="vim:ManagedObjectReference" type="Datastore">${datastore}</vim:ds>
      <vim:hostForAccess xsi:type="vim:ManagedObjectReference" type="HostSystem">${esxiHost}</vim:hostForAccess>
    </vim:NfcFileManagement>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.NfcFileManagementResponse[0].returnval[0]);
    })).toPromise.apply( this, arguments );
  }

  /**
   * Host
   */



  getHostStorageSystem(credential, host, port, esxiHost): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>configManager.storageSystem</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise.apply( this, arguments );
  }

  getHostFirewallSystem(credential, host, port, esxiHost): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>configManager.firewallSystem</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise.apply( this, arguments );
  }

  getHostFirewallRules(credential, host, port, esxiHost): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>config.firewall</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]));
    })).toPromise.apply( this, arguments );
  }

  getHostStorageSystemData(credential, host, port, storageSystem): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostStorageSystem</type>
          <all>false</all>
          <pathSet>storageDeviceInfo</pathSet>
          <pathSet>fileSystemVolumeInfo</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostStorageSystem">${storageSystem}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise.apply( this, arguments );
  }

  getHostConnectionState(credential, host, port, esxiHost): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>runtime.connectionState</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise.apply( this, arguments );
  }

  // Gets networkSystem from ESXi host
  // return vmwareFactory.getHostConfigManagerNetworkSystem('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01',
  // '443', 'host-10');
  getHostConfigManagerNetworkSystem(credential, host, port, esxiHost): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>configManager.networkSystem</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise.apply( this, arguments );
  }

  // Gets datastoreSystem from ESXi host
  // return vmwareFactory.getHostConfigManagerDatastoreSystem('adee0997-62ec-470e-aa81-045a446ceec5',
  // 'mvcenter01', '443', 'host-10');
  getHostConfigManagerDatastoreSystem(credential, host, port, esxiHost): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostSystem</type>
          <all>false</all>
          <pathSet>configManager.datastoreSystem</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostSystem">${esxiHost}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(data.RetrievePropertiesResponse[0].returnval[0].propSet[0].val[0]._);
    })).toPromise.apply( this, arguments );
  }

  // Gets networkSystem Virtual NICS
  // vmwareFactory.getHostNetworkInfoVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443',
  // 'networkSystem-10');
  getHostNetworkInfoVnic(credential, host, port, networkSystem): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostNetworkSystem</type>
          <pathSet>networkInfo.vnic</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostNetworkSystem">${networkSystem}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise.apply( this, arguments );
  }

  // Gets networkSystem Console Virtual NICS
  // vmwareFactory.getHostNetworkInfoConsoleVnic('adee0997-62ec-470e-aa81-045a446ceec5', 'mvcenter01', '443',
  // 'networkSystem-10');
  getHostNetworkInfoConsoleVnic(credential, host, port, networkSystem): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>HostNetworkSystem</type>
          <pathSet>networkInfo.consoleVnic</pathSet>
        </propSet>
        <objectSet>
          <obj type="HostNetworkSystem">${networkSystem}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise.apply( this, arguments );
  }

  /**
   * Datastore
   */
  getDatastores(credential, host, port, datacenterFolder): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet xsi:type="PropertyFilterSpec">
        <propSet xsi:type="PropertySpec">
          <type xsi:type="xsd:string">Datastore</type>
          <all xsi:type="xsd:boolean">true</all>
        </propSet>
        <objectSet xsi:type="ObjectSpec">
          <obj type="Folder" xsi:type="ManagedObjectReference">${datacenterFolder}</obj>
          <skip xsi:type="xsd:boolean">true</skip>
          <selectSet xsi:type="TraversalSpec">
            <type xsi:type="xsd:string">Folder</type>
            <path xsi:type="xsd:string">childEntity</path>
            <skip xsi:type="xsd:boolean">true</skip>
            <selectSet xsi:type="TraversalSpec">
              <type xsi:type="xsd:string">Datacenter</type>
              <path xsi:type="xsd:string">datastore</path>
              <skip xsi:type="xsd:boolean">false</skip>
            </selectSet>
          </selectSet>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise.apply( this, arguments );
  }

  getDatastoresWithVMsData(credential, host, port, datacenterFolder): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>Datastore</type>
          <all>false</all>
          <pathSet>info</pathSet>
          <pathSet>host</pathSet>
          <pathSet>vm</pathSet>
        </propSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>config</pathSet>
          <pathSet>layout</pathSet>
          <pathSet>runtime</pathSet>
        </propSet>
        <objectSet>
          <obj type="Folder">${datacenterFolder}</obj>
          <skip>true</skip>
          <selectSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TraversalSpec">
            <name>visitFolders</name>
            <type>Folder</type>
            <path>childEntity</path>
            <skip>true</skip>
            <selectSet>
              <name>visitFolders</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>datastore</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>vm</path>
                <skip>false</skip>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datastore</type>
              <path>vm</path>
              <skip>false</skip>
            </selectSet>
          </selectSet>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise.apply( this, arguments );
  }

  getDatastoreProps(credential, host, port, datastore): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>Datastore</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="Datastore">${datastore}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    })).toPromise.apply( this, arguments );
  }

  /**
   *  VM
   */
  getVMs(credential, host, port, datacenterFolder): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="Folder">${datacenterFolder}</obj>
          <skip>true</skip>
          <selectSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TraversalSpec">
            <name>visitFolders</name>
            <type>Folder</type>
            <path>childEntity</path>
            <skip>true</skip>
            <selectSet>
              <name>visitFolders</name>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datacenter</type>
              <path>datastore</path>
              <skip>false</skip>
              <selectSet xsi:type="TraversalSpec">
                <type>Datastore</type>
                <path>vm</path>
                <skip>false</skip>
              </selectSet>
            </selectSet>
            <selectSet xsi:type="TraversalSpec">
              <type>Datastore</type>
              <path>vm</path>
              <skip>false</skip>
            </selectSet>
          </selectSet>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise.apply( this, arguments );
  }

  getVMState(credential, host, port, vm, getAll): Promise<any> {
    let xml;

    if (getAll) {
      xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>true</all>
        </propSet>
        <objectSet>
          <obj type="VirtualMachine">${vm}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    } else {
      xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>name</pathSet>
          <pathSet>guest</pathSet>
          <pathSet>runtime.powerState</pathSet>
          <pathSet>summary.config</pathSet>
          <pathSet>summary.quickStats</pathSet>
          <pathSet>guestHeartbeatStatus</pathSet>
        </propSet>
        <objectSet>
          <obj type="VirtualMachine">${vm}</obj>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    }

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    })).toPromise.apply( this, arguments );
  }

  getVMPath(credential, host, port, vm): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>config.files.vmPathName</pathSet>
        </propSet>
        <objectSet>
          <obj type="VirtualMachine">${vm}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    })).toPromise.apply( this, arguments );
  }

  getVMRuntime(credential, host, port, vm): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>runtime</pathSet>
        </propSet>
        <objectSet>
          <obj type="VirtualMachine">${vm}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;

    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      return this.validResponse(this.parseVMwareObject(data.RetrievePropertiesResponse[0].returnval[0]));
    })).toPromise.apply( this, arguments );
  }

  /**
   * Snapshot
   */

  getVMSnapshots(credential, host, port, vm): Promise<any> {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      <specSet>
        <propSet>
          <type>VirtualMachine</type>
          <all>false</all>
          <pathSet>snapshot</pathSet>
        </propSet>
        <objectSet>
          <obj type="VirtualMachine">${vm}</obj>
          <skip>false</skip>
        </objectSet>
      </specSet>
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.doCallSoap(credential, host, port, 'urn:vim25/6.0', xml).pipe(map((data: any) => {
      const res = [];

      data.RetrievePropertiesResponse[0].returnval.forEach(value => {
        res.push(this.parseVMwareObject(value));
      });

      return this.validResponse(res);
    })).toPromise.apply( this, arguments );
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
