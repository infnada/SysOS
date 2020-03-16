import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';
import {ManagedObjectReference} from './data/managed-object-reference';
import {ClusterEnterMaintenanceResult} from './data/cluster-enter-maintenance-result';
import {ClusterRuleInfo} from './data/cluster-rule-info';
import {ClusterResourceUsageSummary} from './data/cluster-resource-usage-summary';
import {PlacementResult} from './data/placement-result';
import {ClusterHostRecommendation} from './data/cluster-host-recommendation';
import {ClusterDasAdvancedRuntimeInfo} from './data/cluster-das-advanced-runtime-info';
import {ClusterComputeResourceValidationResultBase} from './data/cluster-compute-resource-validation-result-base';
import {VsanPolicySatisfiability} from './data/vsan-policy-satisfiability';
import {HostVsanInternalSystemDeleteVsanObjectsResult} from './data/host-vsan-internal-system-delete-vsan-objects-result';
import {HostVsanInternalSystemVsanPhysicalDiskDiagnosticsResult} from './data/host-vsan-internal-system-vsan-physical-disk-diagnostics-result';
import {HostVsanInternalSystemVsanObjectOperationResult} from './data/host-vsan-internal-system-vsan-object-operation-result';
import {AlarmState} from './data/alarm-state';
import {HostServiceTicket} from './data/host-service-ticket';
import {HostConnectInfo} from './data/host-connect-info';
import {HostTpmAttestationReport} from './data/host-tpm-attestation-report';
import {SessionManagerGenericServiceTicket} from './data/session-manager-generic-service-ticket';
import {SessionManagerLocalTicket} from './data/session-manager-local-ticket';
import {UserSession} from './data/user-session';
import {GuestAuthentication} from './data/guest-authentication';
import {VirtualMachineMksTicket} from './data/virtual-machine-mks-ticket';
import {VirtualMachineTicket} from './data/virtual-machine-ticket';
import {DiskChangeInfo} from './data/disk-change-info';
import {MethodFault} from './faults/method-fault';
import {UserPrivilegeResult} from './data/user-privilege-result';
import {EntityPrivilege} from './data/entity-privilege';
import {Permission} from './data/permission';
import {CustomFieldDef} from './data/custom-field-def';
import {VsanHostDiskResult} from './data/vsan-host-disk-result';
import {VsanHostClusterStatus} from './data/vsan-host-cluster-status';
import {DistributedVirtualPort} from './data/distributed-virtual-port';
import {HealthUpdateInfo} from './data/health-update-info';
import {HealthUpdate} from './data/health-update';
import {GuestAliases} from './data/guest-aliases';
import {GuestMappedAliases} from './data/guest-mapped-aliases';
import {HostDiskPartitionInfo} from './data/host-disk-partition-info';
import {HostVffsVolume} from './data/host-vffs-volume';
import {HostVmfsVolume} from './data/host-vmfs-volume';
import {HostScsiDisk} from './data/host-scsi-disk';
import {HostNasVolumeUserInfo} from './data/host-nas-volume-user-info';
import {HostPathSelectionPolicyOption} from './data/host-path-selection-policy-option';
import {HostStorageArrayTypePolicyOption} from './data/host-storage-array-type-policy-option';
import {HostUnresolvedVmfsVolume} from './data/host-unresolved-vmfs-volume';
import {VmfsConfigOption} from './data/vmfs-config-option';
import {HostUnresolvedVmfsResolutionResult} from './data/host-unresolved-vmfs-resolution-result';
import {CryptoKeyResult} from './data/crypto-key-result';
import {CryptoKeyId} from './data/crypto-key-id';
import {LicenseManagerLicenseInfo} from './data/license-manager-license-info';
import {LicenseAvailabilityInfo} from './data/license-availability-info';
import {LicenseUsageInfo} from './data/license-usage-info';
import {LicenseFeatureInfo} from './data/license-feature-info';
import {PhysicalNicHintInfo} from './data/physical-nic-hint-info';
import {HostNetworkConfigResult} from './data/host-network-config-result';
import {IpPoolManagerIpAllocation} from './data/ip-pool-manager-ip-allocation';
import {IpPool} from './data/ip-pool';
import {ApplyProfile} from './data/apply-profile';
import {HostProfileManagerConfigTaskList} from './data/host-profile-manager-config-task-list';
import {AnswerFileStatusResult} from './data/answer-file-status-result';
import {ProfileMetadata} from './data/profile-metadata';
import {ProfileProfileStructure} from './data/profile-profile-structure';
import {AnswerFile} from './data/answer-file';
import {StructuredCustomizations} from './data/structured-customizations';
import {StoragePerformanceSummary} from './data/storage-performance-summary';
import {StorageIORMConfigOption} from './data/storage-i-o-r-m-config-option';
import {StoragePlacementResult} from './data/storage-placement-result';
import {ProfileDescription} from './data/profile-description';
import {VslmTagEntry} from './data/vslm-tag-entry';
import {ID} from './data/i-d';
import {VStorageObject} from './data/v-storage-object';
import {VStorageObjectSnapshotInfo} from './data/v-storage-object-snapshot-info';
import {vslmInfrastructureObjectPolicy} from './data/vslm-infrastructure-object-policy';
import {VStorageObjectAssociations} from './data/v-storage-object-associations';
import {VStorageObjectStateInfo} from './data/v-storage-object-state-info';
import {DatacenterBasicConnectInfo} from './data/datacenter-basic-connect-info';
import {VirtualMachineConfigOptionDescriptor} from './data/virtual-machine-config-option-descriptor';
import {IscsiPortInfo} from './data/iscsi-port-info';
import {IscsiMigrationDependency} from './data/iscsi-migration-dependency';
import {IscsiStatus} from './data/iscsi-status';
import {DiagnosticManagerLogHeader} from './data/diagnostic-manager-log-header';
import {DiagnosticManagerLogDescriptor} from './data/diagnostic-manager-log-descriptor';
import {UpdateSet} from './data/update-set';
import {RetrieveResult} from './data/retrieve-result';
import {ObjectContent} from './data/object-content';
import {HostAccessControlEntry} from './data/host-access-control-entry';
import {FileTransferInformation} from './data/file-transfer-information';
import {GuestListFileInfo} from './data/guest-list-file-info';
import {ComplianceResult} from './data/compliance-result';
import {ProfileExpressionMetadata} from './data/profile-expression-metadata';
import {CustomizationSpecItem} from './data/customization-spec-item';
import {SystemEventInfo} from './data/system-event-info';
import {VmfsDatastoreOption} from './data/vmfs-datastore-option';
import {VchaClusterConfigInfo} from './data/vcha-cluster-config-info';
import {VirtualDiskVFlashCacheConfigInfo} from './data/virtual-disk-v-flash-cache-config-info';
import {HostDiskDimensionsChs} from './data/host-disk-dimensions-chs';
import {ResourceConfigOption} from './data/resource-config-option';
import {Event} from './data/event';
import {EventArgDesc} from './data/event-arg-desc';
import {TaskInfo} from './data/task-info';
import {OvfCreateDescriptorResult} from './data/ovf-create-descriptor-result';
import {OvfCreateImportSpecResult} from './data/ovf-create-import-spec-result';
import {OvfParseDescriptorResult} from './data/ovf-parse-descriptor-result';
import {OvfValidateHostResult} from './data/ovf-validate-host-result';
import {HostDiagnosticPartition} from './data/host-diagnostic-partition';
import {HostDiagnosticPartitionCreateDescription} from './data/host-diagnostic-partition-create-description';
import {HostDiagnosticPartitionCreateOption} from './data/host-diagnostic-partition-create-option';
import {PerfMetricId} from './data/perf-metric-id';
import {PerfEntityMetricBase} from './data/perf-entity-metric-base';
import {PerfCompositeMetric} from './data/perf-composite-metric';
import {PerfCounterInfo} from './data/perf-counter-info';
import {PerfProviderSummary} from './data/perf-provider-summary';
import {ProfilePolicyMetadata} from './data/profile-policy-metadata';
import {GuestRegKeyRecordSpec} from './data/guest-reg-key-record-spec';
import {GuestRegValueSpec} from './data/guest-reg-value-spec';
import {HostVMotionCompatibility} from './data/host-v-motion-compatibility';
import {ProductComponentInfo} from './data/product-component-info';
import {ServiceContent} from './data/service-content';
import {HostSpecification} from './data/host-specification';
import {VirtualNicManagerNetConfig} from './data/virtual-nic-manager-net-config';
import {DistributedVirtualSwitchProductSpec} from './data/distributed-virtual-switch-product-spec';
import {DistributedVirtualSwitchManagerCompatibilityResult} from './data/distributed-virtual-switch-manager-compatibility-result';
import {DistributedVirtualSwitchHostProductSpec} from './data/distributed-virtual-switch-host-product-spec';
import {DVSManagerDvsConfigTarget} from './data/d-v-s-manager-dvs-config-target';
import {DVSFeatureCapability} from './data/d-v-s-feature-capability';
import {DatabaseSizeEstimate} from './data/database-size-estimate';
import {ProfileExecuteResult} from './data/profile-execute-result';
import {SoftwarePackage} from './data/software-package';
import {HostImageProfileSummary} from './data/host-image-profile-summary';
import {Extension} from './data/extension';
import {ExtensionManagerIpAllocationUsage} from './data/extension-manager-ip-allocation-usage';
import {KmipClusterInfo} from './data/kmip-cluster-info';
import {CryptoManagerKmipCryptoKeyStatus} from './data/crypto-manager-kmip-crypto-key-status';
import {CryptoManagerKmipServerCertInfo} from './data/crypto-manager-kmip-server-cert-info';
import {VchaClusterHealth} from './data/vcha-cluster-health';
import {KeyValue} from './data/key-value';
import {HttpNfcLeaseManifestEntry} from './data/http-nfc-lease-manifest-entry';
import {VirtualDiskId} from './data/virtual-disk-id';
import {ClusterIoFilterInfo} from './data/cluster-io-filter-info';
import {IoFilterQueryIssueResult} from './data/io-filter-query-issue-result';
import {GuestProcessInfo} from './data/guest-process-info';
import {VsanUpgradeSystemPreflightCheckResult} from './data/vsan-upgrade-system-preflight-check-result';
import {VsanUpgradeSystemUpgradeStatus} from './data/vsan-upgrade-system-upgrade-status';
import {LicenseAssignmentManagerLicenseAssignment} from './data/license-assignment-manager-license-assignment';
import {HostDateTimeSystemTimeZone} from './data/host-date-time-system-time-zone';
import {HostBootDeviceInfo} from './data/host-boot-device-info';
import {VirtualMachineConfigOption} from './data/virtual-machine-config-option';
import {ConfigTarget} from './data/config-target';
import {HostCapability} from './data/host-capability';
import {KernelModuleInfo} from './data/kernel-module-info';
import {OptionValue} from './data/option-value';
import {ServiceManagerServiceInfo} from './data/service-manager-service-info';
import {UserSearchResult} from './data/user-search-result';
import {InvalidState} from './faults/invalid-state';
import {RuntimeFault} from './faults/runtime-fault';
import {AgentInstallFailed} from './faults/agent-install-failed';
import {AlreadyBeingManaged} from './faults/already-being-managed';
import {AlreadyConnected} from './faults/already-connected';
import {DuplicateName} from './faults/duplicate-name';
import {GatewayConnectFault} from './faults/gateway-connect-fault';
import {GatewayHostNotReachable} from './faults/gateway-host-not-reachable';
import {GatewayNotFound} from './faults/gateway-not-found';
import {GatewayNotReachable} from './faults/gateway-not-reachable';
import {GatewayOperationRefused} from './faults/gateway-operation-refused';
import {GatewayToHostAuthFault} from './faults/gateway-to-host-auth-fault';
import {GatewayToHostTrustVerifyFault} from './faults/gateway-to-host-trust-verify-fault';
import {HostConnectFault} from './faults/host-connect-fault';
import {InvalidLogin} from './faults/invalid-login';
import {NoHost} from './faults/no-host';
import {NoPermission} from './faults/no-permission';
import {NotEnoughLicenses} from './faults/not-enough-licenses';
import {NotSupportedHost} from './faults/not-supported-host';
import {SSLVerifyFault} from './faults/s-s-l-verify-fault';
import {TooManyHosts} from './faults/too-many-hosts';
import {InvalidArgument} from './faults/invalid-argument';
import {DisallowedOperationOnFailoverHost} from './faults/disallowed-operation-on-failover-host';
import {NotSupported} from './faults/not-supported';
import {CannotDisableDrsOnClustersWithVApps} from './faults/cannot-disable-drs-on-clusters-with-v-apps';
import {VimFault} from './faults/vim-fault';
import {VsanFault} from './faults/vsan-fault';
import {InvalidRequest} from './faults/invalid-request';
import {ManagedObjectNotFound} from './faults/managed-object-not-found';
import {InvalidName} from './faults/invalid-name';
import {AdminDisabled} from './faults/admin-disabled';
import {DisableAdminNotSupported} from './faults/disable-admin-not-supported';
import {HostConfigFault} from './faults/host-config-fault';
import {RequestCanceled} from './faults/request-canceled';
import {Timedout} from './faults/timedout';
import {AdminNotDisabled} from './faults/admin-not-disabled';
import {HostPowerOpFailed} from './faults/host-power-op-failed';
import {DasConfigFault} from './faults/das-config-fault';
import {InvalidIpmiLoginInfo} from './faults/invalid-ipmi-login-info';
import {InvalidIpmiMacAddress} from './faults/invalid-ipmi-mac-address';
import {FileNotFound} from './faults/file-not-found';
import {TaskInProgress} from './faults/task-in-progress';
import {NotAuthenticated} from './faults/not-authenticated';
import {InvalidLocale} from './faults/invalid-locale';
import {SSPIChallenge} from './faults/s-s-p-i-challenge';
import {NoClientCertificate} from './faults/no-client-certificate';
import {InvalidClientCertificate} from './faults/invalid-client-certificate';
import {NoSubjectName} from './faults/no-subject-name';
import {NotFound} from './faults/not-found';
import {GuestAuthenticationChallenge} from './faults/guest-authentication-challenge';
import {GuestComponentsOutOfDate} from './faults/guest-components-out-of-date';
import {GuestOperationsFault} from './faults/guest-operations-fault';
import {GuestOperationsUnavailable} from './faults/guest-operations-unavailable';
import {InvalidGuestLogin} from './faults/invalid-guest-login';
import {InvalidPowerState} from './faults/invalid-power-state';
import {OperationDisabledByGuest} from './faults/operation-disabled-by-guest';
import {OperationNotSupportedByGuest} from './faults/operation-not-supported-by-guest';
import {TooManyGuestLogons} from './faults/too-many-guest-logons';
import {ConcurrentAccess} from './faults/concurrent-access';
import {DeviceUnsupportedForVmVersion} from './faults/device-unsupported-for-vm-version';
import {FileFault} from './faults/file-fault';
import {InvalidController} from './faults/invalid-controller';
import {InvalidDatastore} from './faults/invalid-datastore';
import {MissingController} from './faults/missing-controller';
import {VmConfigFault} from './faults/vm-config-fault';
import {CustomizationFault} from './faults/customization-fault';
import {InsufficientResourcesFault} from './faults/insufficient-resources-fault';
import {MigrationFault} from './faults/migration-fault';
import {VmFaultToleranceIssue} from './faults/vm-fault-tolerance-issue';
import {SnapshotFault} from './faults/snapshot-fault';
import {InvalidVmState} from './faults/invalid-vm-state';
import {DisallowedMigrationDeviceAttached} from './faults/disallowed-migration-device-attached';
import {NoActiveHostInCluster} from './faults/no-active-host-in-cluster';
import {VmToolsUpgradeFault} from './faults/vm-tools-upgrade-fault';
import {ToolsUnavailable} from './faults/tools-unavailable';
import {CpuHotPlugNotSupported} from './faults/cpu-hot-plug-not-supported';
import {MemoryHotPlugNotSupported} from './faults/memory-hot-plug-not-supported';
import {TooManyDevices} from './faults/too-many-devices';
import {VmWwnConflict} from './faults/vm-wwn-conflict';
import {AlreadyExists} from './faults/already-exists';
import {HostIncompatibleForRecordReplay} from './faults/host-incompatible-for-record-replay';
import {RecordReplayDisabled} from './faults/record-replay-disabled';
import {VmConfigIncompatibleForRecordReplay} from './faults/vm-config-incompatible-for-record-replay';
import {AlreadyUpgraded} from './faults/already-upgraded';
import {NoDiskFound} from './faults/no-disk-found';
import {AuthMinimumAdminPermission} from './faults/auth-minimum-admin-permission';
import {RemoveFailed} from './faults/remove-failed';
import {UserNotFound} from './faults/user-not-found';
import {InvalidPrivilege} from './faults/invalid-privilege';
import {DvsFault} from './faults/dvs-fault';
import {DvsNotAuthorized} from './faults/dvs-not-authorized';
import {ConflictingConfiguration} from './faults/conflicting-configuration';
import {ResourceInUse} from './faults/resource-in-use';
import {RollbackFailure} from './faults/rollback-failure';
import {InvalidHostState} from './faults/invalid-host-state';
import {LimitExceeded} from './faults/limit-exceeded';
import {ResourceNotAvailable} from './faults/resource-not-available';
import {VspanDestPortConflict} from './faults/vspan-dest-port-conflict';
import {VspanPortConflict} from './faults/vspan-port-conflict';
import {VspanPromiscuousPortNotSupported} from './faults/vspan-promiscuous-port-not-supported';
import {VspanSameSessionPortConflict} from './faults/vspan-same-session-port-conflict';
import {GuestMultipleMappings} from './faults/guest-multiple-mappings';
import {GuestPermissionDenied} from './faults/guest-permission-denied';
import {FcoeFaultPnicHasNoPortSet} from './faults/fcoe-fault-pnic-has-no-port-set';
import {CannotAccessLocalSource} from './faults/cannot-access-local-source';
import {InvalidLicense} from './faults/invalid-license';
import {LicenseServerUnavailable} from './faults/license-server-unavailable';
import {HostInDomain} from './faults/host-in-domain';
import {FileAlreadyExists} from './faults/file-already-exists';
import {OutOfBounds} from './faults/out-of-bounds';
import {InvalidFolder} from './faults/invalid-folder';
import {VmAlreadyExistsInDatacenter} from './faults/vm-already-exists-in-datacenter';
import {HostConfigFailed} from './faults/host-config-failed';
import {InvalidProfileReferenceHost} from './faults/invalid-profile-reference-host';
import {AnswerFileUpdateFailed} from './faults/answer-file-update-failed';
import {InaccessibleDatastore} from './faults/inaccessible-datastore';
import {IORMNotSupportedHostOnDatastore} from './faults/i-o-r-m-not-supported-host-on-datastore';
import {SecurityError} from './faults/security-error';
import {InvalidType} from './faults/invalid-type';
import {InvalidBundle} from './faults/invalid-bundle';
import {MismatchedBundle} from './faults/mismatched-bundle';
import {SSLDisabledFault} from './faults/s-s-l-disabled-fault';
import {IscsiFault} from './faults/iscsi-fault';
import {IscsiFaultInvalidVnic} from './faults/iscsi-fault-invalid-vnic';
import {IscsiFaultVnicAlreadyBound} from './faults/iscsi-fault-vnic-already-bound';
import {IscsiFaultVnicHasMultipleUplinks} from './faults/iscsi-fault-vnic-has-multiple-uplinks';
import {IscsiFaultVnicHasNoUplinks} from './faults/iscsi-fault-vnic-has-no-uplinks';
import {IscsiFaultVnicHasWrongUplink} from './faults/iscsi-fault-vnic-has-wrong-uplink';
import {IscsiFaultVnicNotFound} from './faults/iscsi-fault-vnic-not-found';
import {PlatformConfigFault} from './faults/platform-config-fault';
import {IscsiFaultVnicHasActivePaths} from './faults/iscsi-fault-vnic-has-active-paths';
import {IscsiFaultVnicIsLastPath} from './faults/iscsi-fault-vnic-is-last-path';
import {IscsiFaultVnicNotBound} from './faults/iscsi-fault-vnic-not-bound';
import {CannotAccessFile} from './faults/cannot-access-file';
import {LogBundlingFailed} from './faults/log-bundling-failed';
import {InvalidProperty} from './faults/invalid-property';
import {InvalidCollectorVersion} from './faults/invalid-collector-version';
import {SystemError} from './faults/system-error';
import {NotADirectory} from './faults/not-a-directory';
import {NotAFile} from './faults/not-a-file';
import {FileLocked} from './faults/file-locked';
import {NoDiskSpace} from './faults/no-disk-space';
import {CannotDeleteFile} from './faults/cannot-delete-file';
import {CannotCreateFile} from './faults/cannot-create-file';
import {EVCConfigFault} from './faults/e-v-c-config-fault';
import {DatacenterMismatch} from './faults/datacenter-mismatch';
import {MissingLinuxCustResources} from './faults/missing-linux-cust-resources';
import {MissingWindowsCustResources} from './faults/missing-windows-cust-resources';
import {UncustomizableGuest} from './faults/uncustomizable-guest';
import {CannotDecryptPasswords} from './faults/cannot-decrypt-passwords';
import {PatchBinariesNotFound} from './faults/patch-binaries-not-found';
import {PatchInstallFailed} from './faults/patch-install-failed';
import {PatchMetadataInvalid} from './faults/patch-metadata-invalid';
import {PatchNotApplicable} from './faults/patch-not-applicable';
import {RebootRequired} from './faults/reboot-required';
import {MissingPowerOffConfiguration} from './faults/missing-power-off-configuration';
import {VAppConfigFault} from './faults/v-app-config-fault';
import {MissingNetworkIpConfig} from './faults/missing-network-ip-config';
import {InvalidIndexArgument} from './faults/invalid-index-argument';
import {NoGateway} from './faults/no-gateway';
import {NoVirtualNic} from './faults/no-virtual-nic';
import {VmfsAmbiguousMount} from './faults/vmfs-ambiguous-mount';
import {DatastoreNotWritableOnHost} from './faults/datastore-not-writable-on-host';
import {InaccessibleVFlashSource} from './faults/inaccessible-v-flash-source';
import {InvalidDatastorePath} from './faults/invalid-datastore-path';
import {InvalidDiskFormat} from './faults/invalid-disk-format';
import {InvalidEvent} from './faults/invalid-event';
import {RestrictedByAdministrator} from './faults/restricted-by-administrator';
import {GuestRegistryKeyAlreadyExists} from './faults/guest-registry-key-already-exists';
import {GuestRegistryKeyInvalid} from './faults/guest-registry-key-invalid';
import {GuestRegistryKeyParentVolatile} from './faults/guest-registry-key-parent-volatile';
import {GuestRegistryKeyHasSubkeys} from './faults/guest-registry-key-has-subkeys';
import {GuestRegistryValueNotFound} from './faults/guest-registry-value-not-found';
import {HostSpecificationOperationFailed} from './faults/host-specification-operation-failed';
import {ActiveDirectoryFault} from './faults/active-directory-fault';
import {InvalidCAMServer} from './faults/invalid-c-a-m-server';
import {BlockedByFirewall} from './faults/blocked-by-firewall';
import {ClockSkew} from './faults/clock-skew';
import {DomainNotFound} from './faults/domain-not-found';
import {InvalidHostName} from './faults/invalid-host-name';
import {NoPermissionOnAD} from './faults/no-permission-on-a-d';
import {CAMServerRefusedConnection} from './faults/c-a-m-server-refused-connection';
import {InvalidCAMCertificate} from './faults/invalid-c-a-m-certificate';
import {NonADUserRequired} from './faults/non-a-d-user-required';
import {BackupBlobWriteFailure} from './faults/backup-blob-write-failure';
import {ProfileUpdateFailed} from './faults/profile-update-failed';
import {KeyNotFound} from './faults/key-not-found';
import {HttpFault} from './faults/http-fault';
import {FilterInUse} from './faults/filter-in-use';
import {GuestProcessNotFound} from './faults/guest-process-not-found';
import {LicenseEntityNotFound} from './faults/license-entity-not-found';

export type VmwareSdkFunctionsOutput<Action> =
  Action extends 'AbandonHciWorkflow' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'AddHost_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AgentInstallFailed | AlreadyBeingManaged | AlreadyConnected | DuplicateName | GatewayConnectFault | GatewayHostNotReachable | GatewayNotFound | GatewayNotReachable | GatewayOperationRefused | GatewayToHostAuthFault | GatewayToHostTrustVerifyFault | HostConnectFault | InvalidLogin | NoHost | NoPermission | NotEnoughLicenses | NotSupportedHost | RuntimeFault | SSLVerifyFault | TooManyHosts } :
  Action extends 'ApplyRecommendation' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'CancelRecommendation' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ClusterEnterMaintenanceMode' ? BackendResponse & { status: 'ok'; data: ClusterEnterMaintenanceResult } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ConfigureHCI_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'EvcManager' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ClusterEVCManager'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ExtendHCI_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FindRulesForVm' ? BackendResponse & { status: 'ok'; data: ClusterRuleInfo[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'GetResourceUsage' ? BackendResponse & { status: 'ok'; data: ClusterResourceUsageSummary } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'MoveHostInto_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | RuntimeFault | TooManyHosts } :
  Action extends 'MoveInto_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DisallowedOperationOnFailoverHost | DuplicateName | InvalidArgument | InvalidState | RuntimeFault | TooManyHosts } :
  Action extends 'PlaceVm' ? BackendResponse & { status: 'ok'; data: PlacementResult } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | RuntimeFault } :
  Action extends 'RecommendHostsForVm' ? BackendResponse & { status: 'ok'; data: ClusterHostRecommendation[] } | BackendResponse & { status: 'error'; data: InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'ReconfigureCluster_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: CannotDisableDrsOnClustersWithVApps | RuntimeFault } :
  Action extends 'RefreshRecommendation' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveDasAdvancedRuntimeInfo' ? BackendResponse & { status: 'ok'; data: ClusterDasAdvancedRuntimeInfo } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'StampAllRulesWithUuid_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ValidateHCIConfiguration' ? BackendResponse & { status: 'ok'; data: ClusterComputeResourceValidationResultBase[] } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'AbdicateDomOwnership' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CanProvisionObjects' ? BackendResponse & { status: 'ok'; data: VsanPolicySatisfiability[] } | BackendResponse & { status: 'error'; data: RuntimeFault | VimFault } :
  Action extends 'DeleteVsanObjects' ? BackendResponse & { status: 'ok'; data: HostVsanInternalSystemDeleteVsanObjectsResult[] } | BackendResponse & { status: 'error'; data: RuntimeFault | VimFault } :
  Action extends 'GetVsanObjExtAttrs' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault | VimFault } :
  Action extends 'QueryCmmds' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryObjectsOnPhysicalVsanDisk' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryPhysicalVsanDisks' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QuerySyncingVsanObjects' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryVsanObjects' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryVsanObjectUuidsByFilter' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: RuntimeFault | VsanFault } :
  Action extends 'QueryVsanStatistics' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ReconfigurationSatisfiable' ? BackendResponse & { status: 'ok'; data: VsanPolicySatisfiability[] } | BackendResponse & { status: 'error'; data: RuntimeFault | VimFault } :
  Action extends 'ReconfigureDomObject' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RunVsanPhysicalDiskDiagnostics' ? BackendResponse & { status: 'ok'; data: HostVsanInternalSystemVsanPhysicalDiskDiagnosticsResult[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpgradeVsanObjects' ? BackendResponse & { status: 'ok'; data: HostVsanInternalSystemVsanObjectOperationResult[] } | BackendResponse & { status: 'error'; data: RuntimeFault | VsanFault } :
  Action extends 'AcknowledgeAlarm' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidRequest | ManagedObjectNotFound | RuntimeFault } :
  Action extends 'AreAlarmActionsEnabled' ? BackendResponse & { status: 'ok'; data: boolean } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ClearTriggeredAlarms' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CreateAlarm' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Alarm'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidArgument | InvalidName | RuntimeFault } :
  Action extends 'EnableAlarmActions' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'GetAlarm' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Alarm[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'GetAlarmState' ? BackendResponse & { status: 'ok'; data: AlarmState[] } | BackendResponse & { status: 'error'; data: InvalidRequest | ManagedObjectNotFound | RuntimeFault } :
  Action extends 'AcquireCimServicesTicket' ? BackendResponse & { status: 'ok'; data: HostServiceTicket } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ConfigureCryptoKey' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'DisconnectHost_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: NotSupported | RuntimeFault } :
  Action extends 'EnableCrypto' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'EnterLockdownMode' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AdminDisabled | DisableAdminNotSupported | HostConfigFault | RuntimeFault } :
  Action extends 'EnterMaintenanceMode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RequestCanceled | RuntimeFault | Timedout } :
  Action extends 'ExitLockdownMode' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AdminNotDisabled | DisableAdminNotSupported | HostConfigFault | RuntimeFault } :
  Action extends 'ExitMaintenanceMode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | Timedout } :
  Action extends 'PowerDownHostToStandBy_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostPowerOpFailed | InvalidState | NotSupported | RequestCanceled | RuntimeFault | Timedout } :
  Action extends 'PowerUpHostFromStandBy_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostPowerOpFailed | InvalidState | NotSupported | RequestCanceled | RuntimeFault | Timedout } :
  Action extends 'PrepareCrypto' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'QueryHostConnectionInfo' ? BackendResponse & { status: 'ok'; data: HostConnectInfo } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryMemoryOverhead' ? BackendResponse & { status: 'ok'; data: number } | BackendResponse & { status: 'error'; data: NotSupported | RuntimeFault } :
  Action extends 'QueryMemoryOverheadEx' ? BackendResponse & { status: 'ok'; data: number } | BackendResponse & { status: 'error'; data: NotSupported | RuntimeFault } :
  Action extends 'QueryProductLockerLocation' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'QueryTpmAttestationReport' ? BackendResponse & { status: 'ok'; data: HostTpmAttestationReport } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RebootHost_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | NotSupported | RuntimeFault } :
  Action extends 'ReconfigureHostForDAS_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DasConfigFault | NotSupported | RuntimeFault } :
  Action extends 'ReconnectHost_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AlreadyBeingManaged | GatewayConnectFault | GatewayHostNotReachable | GatewayNotFound | GatewayNotReachable | GatewayOperationRefused | GatewayToHostAuthFault | GatewayToHostTrustVerifyFault | HostConnectFault | InvalidLogin | InvalidName | InvalidState | NoHost | NotEnoughLicenses | NotSupported | NotSupportedHost | RuntimeFault | SSLVerifyFault } :
  Action extends 'RetrieveHardwareUptime' ? BackendResponse & { status: 'ok'; data: number } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ShutdownHost_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | NotSupported | RuntimeFault } :
  Action extends 'UpdateFlags' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateIpmi' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidIpmiLoginInfo | InvalidIpmiMacAddress | RuntimeFault } :
  Action extends 'UpdateProductLockerLocation_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileNotFound | HostConfigFault | InvalidArgument | RuntimeFault | TaskInProgress } :
  Action extends 'UpdateSystemResources' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'UpdateSystemSwapConfiguration' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'AcquireCloneTicket' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: NotAuthenticated | RuntimeFault } :
  Action extends 'AcquireGenericServiceTicket' ? BackendResponse & { status: 'ok'; data: SessionManagerGenericServiceTicket } | BackendResponse & { status: 'error'; data: InvalidArgument | NoPermission | NotAuthenticated | RuntimeFault } :
  Action extends 'AcquireLocalTicket' ? BackendResponse & { status: 'ok'; data: SessionManagerLocalTicket } | BackendResponse & { status: 'error'; data: InvalidLogin | NoPermission | NotSupported | RuntimeFault } :
  Action extends 'CloneSession' ? BackendResponse & { status: 'ok'; data: UserSession } | BackendResponse & { status: 'error'; data: InvalidLogin | NotSupported | RuntimeFault } :
  Action extends 'ImpersonateUser' ? BackendResponse & { status: 'ok'; data: UserSession } | BackendResponse & { status: 'error'; data: InvalidLocale | InvalidLogin | RuntimeFault } :
  Action extends 'Login' ? BackendResponse & { status: 'ok'; data: UserSession } | BackendResponse & { status: 'error'; data: InvalidLocale | InvalidLogin | NoPermission | RuntimeFault } :
  Action extends 'LoginBySSPI' ? BackendResponse & { status: 'ok'; data: UserSession } | BackendResponse & { status: 'error'; data: InvalidLocale | InvalidLogin | NoPermission | NotSupported | RuntimeFault | SSPIChallenge } :
  Action extends 'LoginByToken' ? BackendResponse & { status: 'ok'; data: UserSession } | BackendResponse & { status: 'error'; data: InvalidLocale | InvalidLogin | NoPermission | RuntimeFault } :
  Action extends 'LoginExtensionByCertificate' ? BackendResponse & { status: 'ok'; data: UserSession } | BackendResponse & { status: 'error'; data: InvalidLocale | InvalidLogin | NoClientCertificate | RuntimeFault } :
  Action extends 'LoginExtensionBySubjectName' ? BackendResponse & { status: 'ok'; data: UserSession } | BackendResponse & { status: 'error'; data: InvalidClientCertificate | InvalidLocale | InvalidLogin | NoClientCertificate | NoSubjectName | NotFound | RuntimeFault } :
  Action extends 'Logout' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'SessionIsActive' ? BackendResponse & { status: 'ok'; data: boolean } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'SetLocale' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidLocale | RuntimeFault } :
  Action extends 'TerminateSession' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'UpdateServiceMessage' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'AcquireCredentialsInGuest' ? BackendResponse & { status: 'ok'; data: GuestAuthentication } | BackendResponse & { status: 'error'; data: GuestAuthenticationChallenge | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress | TooManyGuestLogons } :
  Action extends 'ReleaseCredentialsInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'ValidateCredentialsInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'AcquireMksTicket' ? BackendResponse & { status: 'ok'; data: VirtualMachineMksTicket } | BackendResponse & { status: 'error'; data: NotSupported | RuntimeFault } :
  Action extends 'AcquireTicket' ? BackendResponse & { status: 'ok'; data: VirtualMachineTicket } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'AnswerVM' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: ConcurrentAccess | InvalidArgument | RuntimeFault } :
  Action extends 'ApplyEvcModeVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | RuntimeFault } :
  Action extends 'AttachDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DeviceUnsupportedForVmVersion | FileFault | InvalidController | InvalidDatastore | InvalidState | MissingController | NotFound | RuntimeFault | VmConfigFault } :
  Action extends 'CheckCustomizationSpec' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: CustomizationFault | RuntimeFault } :
  Action extends 'CloneVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: CustomizationFault | FileFault | InsufficientResourcesFault | InvalidArgument | InvalidDatastore | InvalidState | MigrationFault | NoPermission | NotSupported | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'ConsolidateVMDisks_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidState | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'CreateScreenshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidPowerState | InvalidState | RuntimeFault | TaskInProgress } :
  Action extends 'CreateSecondaryVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InsufficientResourcesFault | InvalidState | ManagedObjectNotFound | NotSupported | RuntimeFault | TaskInProgress | VmConfigFault | VmFaultToleranceIssue } :
  Action extends 'CreateSecondaryVMEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InsufficientResourcesFault | InvalidState | ManagedObjectNotFound | NotSupported | RuntimeFault | TaskInProgress | VmConfigFault | VmFaultToleranceIssue } :
  Action extends 'CreateSnapshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidName | InvalidPowerState | InvalidState | NotSupported | RuntimeFault | SnapshotFault | TaskInProgress | VmConfigFault } :
  Action extends 'CreateSnapshotEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidArgument | InvalidName | InvalidPowerState | InvalidState | NotSupported | RuntimeFault | SnapshotFault | TaskInProgress | VmConfigFault } :
  Action extends 'CryptoUnlock_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | InvalidVmState | NotSupported | RuntimeFault } :
  Action extends 'CustomizeVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: CustomizationFault | RuntimeFault } :
  Action extends 'DefragmentAllDisks' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | InvalidPowerState | InvalidState | RuntimeFault | TaskInProgress } :
  Action extends 'DetachDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidState | NotFound | RuntimeFault | VmConfigFault } :
  Action extends 'DisableSecondaryVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | TaskInProgress | VmFaultToleranceIssue } :
  Action extends 'EnableSecondaryVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | ManagedObjectNotFound | RuntimeFault | TaskInProgress | VmConfigFault | VmFaultToleranceIssue } :
  Action extends 'EstimateStorageForConsolidateSnapshots_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidState | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'ExportVm' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'HttpNfcLease'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidPowerState | InvalidState | RuntimeFault | TaskInProgress } :
  Action extends 'ExtractOvfEnvironment' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'InstantClone_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DisallowedMigrationDeviceAttached | FileFault | InsufficientResourcesFault | InvalidArgument | InvalidDatastore | InvalidState | RuntimeFault | TaskInProgress } :
  Action extends 'MakePrimaryVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | TaskInProgress | VmFaultToleranceIssue } :
  Action extends 'MarkAsTemplate' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | InvalidPowerState | InvalidState | NotSupported | RuntimeFault | VmConfigFault } :
  Action extends 'MarkAsVirtualMachine' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotSupported | RuntimeFault | VmConfigFault } :
  Action extends 'MigrateVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InsufficientResourcesFault | InvalidArgument | InvalidPowerState | InvalidState | MigrationFault | NoActiveHostInCluster | NoPermission | NotSupported | RuntimeFault | Timedout | VmConfigFault } :
  Action extends 'MountToolsInstaller' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | VmConfigFault | VmToolsUpgradeFault } :
  Action extends 'PowerOffVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | NotSupported | RuntimeFault | TaskInProgress } :
  Action extends 'PowerOnVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DisallowedOperationOnFailoverHost | FileFault | InsufficientResourcesFault | InvalidPowerState | InvalidState | NotEnoughLicenses | NotSupported | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'PromoteDisks_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | NotSupported | RuntimeFault | TaskInProgress } :
  Action extends 'PutUsbScanCodes' ? BackendResponse & { status: 'ok'; data: number } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryChangedDiskAreas' ? BackendResponse & { status: 'ok'; data: DiskChangeInfo } | BackendResponse & { status: 'error'; data: FileFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'QueryFaultToleranceCompatibility' ? BackendResponse & { status: 'ok'; data: MethodFault[] } | BackendResponse & { status: 'error'; data: InvalidState | NotSupported | RuntimeFault | VmConfigFault } :
  Action extends 'QueryFaultToleranceCompatibilityEx' ? BackendResponse & { status: 'ok'; data: MethodFault[] } | BackendResponse & { status: 'error'; data: InvalidState | NotSupported | RuntimeFault | VmConfigFault } :
  Action extends 'QueryUnownedFiles' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RebootGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | RuntimeFault | TaskInProgress | ToolsUnavailable } :
  Action extends 'ReconfigVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ConcurrentAccess | CpuHotPlugNotSupported | DuplicateName | FileFault | InsufficientResourcesFault | InvalidDatastore | InvalidName | InvalidPowerState | InvalidState | MemoryHotPlugNotSupported | NoPermission | RuntimeFault | TaskInProgress | TooManyDevices | VmConfigFault | VmWwnConflict } :
  Action extends 'RefreshStorageInfo' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'reloadVirtualMachineFromPath_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AlreadyExists | FileFault | InvalidPowerState | InvalidState | NotSupported | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'RelocateVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DisallowedOperationOnFailoverHost | FileFault | InsufficientResourcesFault | InvalidArgument | InvalidDatastore | InvalidState | MigrationFault | NotSupported | RuntimeFault | Timedout | VmConfigFault } :
  Action extends 'RemoveAllSnapshots_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | NotSupported | RuntimeFault | SnapshotFault | TaskInProgress } :
  Action extends 'ResetGuestInformation' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | NotSupported | RuntimeFault } :
  Action extends 'ResetVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | NotEnoughLicenses | NotSupported | RuntimeFault | TaskInProgress } :
  Action extends 'RevertToCurrentSnapshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DisallowedOperationOnFailoverHost | InsufficientResourcesFault | InvalidPowerState | InvalidState | NotFound | NotSupported | RuntimeFault | SnapshotFault | TaskInProgress | VmConfigFault } :
  Action extends 'SendNMI' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'SetDisplayTopology' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | NotSupported | RuntimeFault | ToolsUnavailable } :
  Action extends 'SetScreenResolution' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | NotSupported | RuntimeFault | ToolsUnavailable } :
  Action extends 'ShutdownGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | RuntimeFault | TaskInProgress | ToolsUnavailable } :
  Action extends 'StandbyGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | RuntimeFault | TaskInProgress | ToolsUnavailable } :
  Action extends 'StartRecording_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | HostIncompatibleForRecordReplay | InvalidName | InvalidPowerState | InvalidState | NotSupported | RecordReplayDisabled | RuntimeFault | SnapshotFault | TaskInProgress | VmConfigFault | VmConfigIncompatibleForRecordReplay } :
  Action extends 'StartReplaying_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | HostIncompatibleForRecordReplay | InvalidArgument | InvalidPowerState | InvalidState | NotFound | NotSupported | RecordReplayDisabled | RuntimeFault | SnapshotFault | TaskInProgress | VmConfigFault | VmConfigIncompatibleForRecordReplay } :
  Action extends 'StopRecording_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidPowerState | InvalidState | NotSupported | RuntimeFault | SnapshotFault | TaskInProgress } :
  Action extends 'StopReplaying_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidPowerState | InvalidState | NotSupported | RuntimeFault | SnapshotFault | TaskInProgress } :
  Action extends 'SuspendVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | NotSupported | RuntimeFault | TaskInProgress } :
  Action extends 'TerminateFaultTolerantVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | TaskInProgress | VmFaultToleranceIssue } :
  Action extends 'TerminateVM' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | NotSupported | RuntimeFault | TaskInProgress } :
  Action extends 'TurnOffFaultToleranceForVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | TaskInProgress | VmFaultToleranceIssue } :
  Action extends 'UnmountToolsInstaller' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | VmConfigFault } :
  Action extends 'UnregisterVM' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidPowerState | RuntimeFault | TaskInProgress } :
  Action extends 'UpgradeTools_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | NotSupported | RuntimeFault | TaskInProgress | ToolsUnavailable | VmConfigFault | VmToolsUpgradeFault } :
  Action extends 'UpgradeVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AlreadyUpgraded | InvalidPowerState | InvalidState | NoDiskFound | RuntimeFault | TaskInProgress } :
  Action extends 'AddAuthorizationRole' ? BackendResponse & { status: 'ok'; data: number } | BackendResponse & { status: 'error'; data: AlreadyExists | InvalidArgument | InvalidName | RuntimeFault } :
  Action extends 'FetchUserPrivilegeOnEntities' ? BackendResponse & { status: 'ok'; data: UserPrivilegeResult[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'HasPrivilegeOnEntities' ? BackendResponse & { status: 'ok'; data: EntityPrivilege[] } | BackendResponse & { status: 'error'; data: ManagedObjectNotFound | RuntimeFault } :
  Action extends 'HasPrivilegeOnEntity' ? BackendResponse & { status: 'ok'; data: boolean[] } | BackendResponse & { status: 'error'; data: ManagedObjectNotFound | RuntimeFault } :
  Action extends 'HasUserPrivilegeOnEntities' ? BackendResponse & { status: 'ok'; data: EntityPrivilege[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'MergePermissions' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AuthMinimumAdminPermission | InvalidArgument | NoPermission | NotFound | RuntimeFault } :
  Action extends 'RemoveAuthorizationRole' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotFound | RemoveFailed | RuntimeFault } :
  Action extends 'RemoveEntityPermission' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AuthMinimumAdminPermission | InvalidArgument | NoPermission | NotFound | RuntimeFault } :
  Action extends 'ResetEntityPermissions' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AuthMinimumAdminPermission | InvalidArgument | ManagedObjectNotFound | NoPermission | NotFound | RuntimeFault | UserNotFound } :
  Action extends 'RetrieveAllPermissions' ? BackendResponse & { status: 'ok'; data: Permission[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveEntityPermissions' ? BackendResponse & { status: 'ok'; data: Permission[] } | BackendResponse & { status: 'error'; data: ManagedObjectNotFound | RuntimeFault } :
  Action extends 'RetrieveRolePermissions' ? BackendResponse & { status: 'ok'; data: Permission[] } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'SetEntityPermissions' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AuthMinimumAdminPermission | InvalidArgument | ManagedObjectNotFound | NoPermission | NotFound | RuntimeFault | UserNotFound } :
  Action extends 'UpdateAuthorizationRole' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | InvalidArgument | InvalidName | NoPermission | NotFound | RuntimeFault } :
  Action extends 'AddCustomFieldDef' ? BackendResponse & { status: 'ok'; data: CustomFieldDef } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidPrivilege | RuntimeFault } :
  Action extends 'RemoveCustomFieldDef' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'RenameCustomFieldDef' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidArgument | RuntimeFault } :
  Action extends 'SetField' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'AddDisks_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'EvacuateVsanNode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RequestCanceled | RuntimeFault | Timedout | VsanFault } :
  Action extends 'InitializeDisks_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryDisksForVsan' ? BackendResponse & { status: 'ok'; data: VsanHostDiskResult[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryHostStatus' ? BackendResponse & { status: 'ok'; data: VsanHostClusterStatus } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RecommissionVsanNode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | VsanFault } :
  Action extends 'RemoveDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RequestCanceled | RuntimeFault } :
  Action extends 'RemoveDiskMapping_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RequestCanceled | RuntimeFault } :
  Action extends 'UnmountDiskMapping_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | VsanFault } :
  Action extends 'UpdateVsan_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'AddDVPortgroup_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DuplicateName | DvsFault | DvsNotAuthorized | InvalidName | NotSupported | RuntimeFault } :
  Action extends 'AddNetworkResourcePool' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DvsFault | DvsNotAuthorized | InvalidName | NotSupported | RuntimeFault } :
  Action extends 'CreateDVPortgroup_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DuplicateName | DvsFault | InvalidName | RuntimeFault } :
  Action extends 'DvsReconfigureVmVnicNetworkResourcePool_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ConcurrentAccess | ConflictingConfiguration | DvsFault | DvsNotAuthorized | InvalidName | NotFound | NotSupported | ResourceInUse | RuntimeFault } :
  Action extends 'DVSRollback_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DvsFault | RollbackFailure | RuntimeFault } :
  Action extends 'EnableNetworkResourceManagement' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DvsFault | DvsNotAuthorized | NotSupported | RuntimeFault } :
  Action extends 'FetchDVPortKeys' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FetchDVPorts' ? BackendResponse & { status: 'ok'; data: DistributedVirtualPort[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'LookupDvPortGroup' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'DistributedVirtualPortgroup'; } } | BackendResponse & { status: 'error'; data: NotFound | NotSupported | RuntimeFault } :
  Action extends 'MergeDvs_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DvsFault | DvsNotAuthorized | InvalidHostState | NotFound | NotSupported | ResourceInUse | RuntimeFault } :
  Action extends 'MoveDVPort_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ConcurrentAccess | DvsFault | DvsNotAuthorized | NotFound | NotSupported | RuntimeFault } :
  Action extends 'PerformDvsProductSpecOperation_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DvsFault | DvsNotAuthorized | InvalidState | NotSupported | RuntimeFault | TaskInProgress } :
  Action extends 'QueryUsedVlanIdInDvs' ? BackendResponse & { status: 'ok'; data: number[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ReconfigureDVPort_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ConcurrentAccess | DvsFault | DvsNotAuthorized | InvalidArgument | NotFound | NotSupported | ResourceInUse | RuntimeFault } :
  Action extends 'ReconfigureDvs_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AlreadyExists | ConcurrentAccess | DuplicateName | DvsFault | DvsNotAuthorized | InvalidName | InvalidState | LimitExceeded | NotFound | NotSupported | ResourceInUse | ResourceNotAvailable | RuntimeFault | VspanDestPortConflict | VspanPortConflict | VspanPromiscuousPortNotSupported | VspanSameSessionPortConflict } :
  Action extends 'RectifyDvsHost_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DvsFault | NotFound | RuntimeFault } :
  Action extends 'RefreshDVPortState' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DvsFault | NotFound | RuntimeFault } :
  Action extends 'RemoveNetworkResourcePool' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DvsFault | DvsNotAuthorized | InvalidName | NotFound | NotSupported | ResourceInUse | RuntimeFault } :
  Action extends 'UpdateDvsCapability' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DvsFault | DvsNotAuthorized | NotSupported | RuntimeFault } :
  Action extends 'UpdateDVSHealthCheckConfig_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DvsFault | NotSupported | RuntimeFault } :
  Action extends 'UpdateNetworkResourcePool' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: ConcurrentAccess | DvsFault | DvsNotAuthorized | InvalidName | NotFound | NotSupported | RuntimeFault } :
  Action extends 'AddFilter' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'AddFilterEntities' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'AddMonitoredEntities' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotFound | NotSupported | RuntimeFault } :
  Action extends 'HasMonitoredEntity' ? BackendResponse & { status: 'ok'; data: boolean } | BackendResponse & { status: 'error'; data: InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'HasProvider' ? BackendResponse & { status: 'ok'; data: boolean } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'PostHealthUpdates' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotFound | NotSupported | RuntimeFault } :
  Action extends 'QueryFilterEntities' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity[]'; } } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryFilterInfoIds' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryFilterList' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryFilterName' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryHealthUpdateInfos' ? BackendResponse & { status: 'ok'; data: HealthUpdateInfo[] } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryHealthUpdates' ? BackendResponse & { status: 'ok'; data: HealthUpdate[] } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryMonitoredEntities' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity[]'; } } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryProviderList' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryProviderName' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryUnmonitoredHosts' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'HostSystem[]'; } } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'RegisterHealthUpdateProvider' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'RemoveFilter' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'RemoveFilterEntities' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'RemoveMonitoredEntities' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | NotFound | NotSupported | RuntimeFault } :
  Action extends 'UnregisterHealthUpdateProvider' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | NotFound | RuntimeFault } :
  Action extends 'AddGuestAlias' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestMultipleMappings | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidArgument | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'ListGuestAliases' ? BackendResponse & { status: 'ok'; data: GuestAliases[] } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'ListGuestMappedAliases' ? BackendResponse & { status: 'ok'; data: GuestMappedAliases[] } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'RemoveGuestAlias' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidArgument | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'RemoveGuestAliasByCert' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidArgument | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'AddInternetScsiSendTargets' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'AddInternetScsiStaticTargets' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'AttachScsiLun' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidState | NotFound | RuntimeFault } :
  Action extends 'AttachScsiLunEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'AttachVmfsExtent' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'ChangeNFSUserPassword' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'ClearNFSUser' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'ComputeDiskPartitionInfo' ? BackendResponse & { status: 'ok'; data: HostDiskPartitionInfo } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'ComputeDiskPartitionInfoForResize' ? BackendResponse & { status: 'ok'; data: HostDiskPartitionInfo } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'DeleteScsiLunState' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'DeleteVffsVolumeState' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'DeleteVmfsVolumeState' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'DestroyVffs' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'DetachScsiLun' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidState | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'DetachScsiLunEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'DisableMultipathPath' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'DiscoverFcoeHbas' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FcoeFaultPnicHasNoPortSet | HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'EnableMultipathPath' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'ExpandVmfsExtent' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'ExtendVffs' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'FormatVffs' ? BackendResponse & { status: 'ok'; data: HostVffsVolume } | BackendResponse & { status: 'error'; data: AlreadyExists | HostConfigFault | InvalidArgument | ResourceInUse | RuntimeFault } :
  Action extends 'FormatVmfs' ? BackendResponse & { status: 'ok'; data: HostVmfsVolume } | BackendResponse & { status: 'error'; data: AlreadyExists | HostConfigFault | InvalidArgument | RuntimeFault } :
  Action extends 'MarkAsLocal_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'MarkAsNonLocal_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'MarkAsNonSsd_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'MarkAsSsd_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'MarkForRemoval' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'MarkPerenniallyReserved' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'MarkPerenniallyReservedEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'MountVffsVolume' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidState | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'MountVmfsVolume' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidState | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'MountVmfsVolumeEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'QueryAvailableSsds' ? BackendResponse & { status: 'ok'; data: HostScsiDisk[] } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'QueryNFSUser' ? BackendResponse & { status: 'ok'; data: HostNasVolumeUserInfo } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'QueryPathSelectionPolicyOptions' ? BackendResponse & { status: 'ok'; data: HostPathSelectionPolicyOption[] } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'QueryStorageArrayTypePolicyOptions' ? BackendResponse & { status: 'ok'; data: HostStorageArrayTypePolicyOption[] } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'QueryUnresolvedVmfsVolume' ? BackendResponse & { status: 'ok'; data: HostUnresolvedVmfsVolume[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryVmfsConfigOption' ? BackendResponse & { status: 'ok'; data: VmfsConfigOption[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RefreshStorageSystem' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RemoveInternetScsiSendTargets' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'RemoveInternetScsiStaticTargets' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'RescanAllHba' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'RescanHba' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'RescanVffs' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'RescanVmfs' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'ResolveMultipleUnresolvedVmfsVolumes' ? BackendResponse & { status: 'ok'; data: HostUnresolvedVmfsResolutionResult[] } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'ResolveMultipleUnresolvedVmfsVolumesEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'RetrieveDiskPartitionInfo' ? BackendResponse & { status: 'ok'; data: HostDiskPartitionInfo[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'SetMultipathLunPolicy' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'SetNFSUser' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'TurnDiskLocatorLedOff_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'TurnDiskLocatorLedOn_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'UnmapVmfsVolumeEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'UnmountForceMountedVmfsVolume' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'UnmountVffsVolume' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidState | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'UnmountVmfsVolume' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidState | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'UnmountVmfsVolumeEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'UpdateDiskPartitions' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'UpdateInternetScsiAdvancedOptions' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'UpdateInternetScsiAlias' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'UpdateInternetScsiAuthenticationProperties' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'UpdateInternetScsiDigestProperties' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'UpdateInternetScsiDiscoveryProperties' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'UpdateInternetScsiIPProperties' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'UpdateInternetScsiName' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'UpdateScsiLunDisplayName' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DuplicateName | HostConfigFault | InvalidName | NotFound | RuntimeFault } :
  Action extends 'UpdateSoftwareInternetScsiEnabled' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'UpdateVmfsUnmapBandwidth' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateVmfsUnmapPriority' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpgradeVmfs' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'UpgradeVmLayout' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'AddKey' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | InvalidArgument | InvalidState | RuntimeFault } :
  Action extends 'AddKeys' ? BackendResponse & { status: 'ok'; data: CryptoKeyResult[] } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'ListKeys' ? BackendResponse & { status: 'ok'; data: CryptoKeyId[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RemoveKey' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | ResourceInUse | RuntimeFault } :
  Action extends 'RemoveKeys' ? BackendResponse & { status: 'ok'; data: CryptoKeyResult[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'AddLicense' ? BackendResponse & { status: 'ok'; data: LicenseManagerLicenseInfo } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CheckLicenseFeature' ? BackendResponse & { status: 'ok'; data: boolean } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | RuntimeFault } :
  Action extends 'ConfigureLicenseSource' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: CannotAccessLocalSource | InvalidLicense | LicenseServerUnavailable | NotEnoughLicenses | RuntimeFault } :
  Action extends 'DecodeLicense' ? BackendResponse & { status: 'ok'; data: LicenseManagerLicenseInfo } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'DisableFeature' ? BackendResponse & { status: 'ok'; data: boolean } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | LicenseServerUnavailable | RuntimeFault } :
  Action extends 'EnableFeature' ? BackendResponse & { status: 'ok'; data: boolean } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | LicenseServerUnavailable | RuntimeFault } :
  Action extends 'QueryLicenseSourceAvailability' ? BackendResponse & { status: 'ok'; data: LicenseAvailabilityInfo[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryLicenseUsage' ? BackendResponse & { status: 'ok'; data: LicenseUsageInfo } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QuerySupportedFeatures' ? BackendResponse & { status: 'ok'; data: LicenseFeatureInfo[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RemoveLicense' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RemoveLicenseLabel' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'SetLicenseEdition' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | LicenseServerUnavailable | RuntimeFault } :
  Action extends 'UpdateLicense' ? BackendResponse & { status: 'ok'; data: LicenseManagerLicenseInfo } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateLicenseLabel' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'AddPortGroup' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'AddServiceConsoleVirtualNic' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'AddVirtualNic' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: AlreadyExists | HostConfigFault | InvalidArgument | InvalidState | RuntimeFault } :
  Action extends 'AddVirtualSwitch' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | HostConfigFault | InvalidArgument | ResourceInUse | RuntimeFault } :
  Action extends 'QueryNetworkHint' ? BackendResponse & { status: 'ok'; data: PhysicalNicHintInfo[] } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | NotSupported | RuntimeFault } :
  Action extends 'RefreshNetworkSystem' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RemovePortGroup' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'RemoveServiceConsoleVirtualNic' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | NotSupported | ResourceInUse | RuntimeFault } :
  Action extends 'RemoveVirtualNic' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'RemoveVirtualSwitch' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'RestartServiceConsoleVirtualNic' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | NotSupported | RuntimeFault } :
  Action extends 'UpdateConsoleIpRouteConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'UpdateDnsConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | HostInDomain | InvalidArgument | NotFound | NotSupported | RuntimeFault } :
  Action extends 'UpdateIpRouteConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | InvalidState | NotSupported | RuntimeFault } :
  Action extends 'UpdateIpRouteTableConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'UpdateNetworkConfig' ? BackendResponse & { status: 'ok'; data: HostNetworkConfigResult } | BackendResponse & { status: 'error'; data: AlreadyExists | HostConfigFault | InvalidArgument | NotFound | NotSupported | ResourceInUse | RuntimeFault } :
  Action extends 'UpdatePhysicalNicLinkSpeed' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | NotSupported | RuntimeFault } :
  Action extends 'UpdatePortGroup' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'UpdateServiceConsoleVirtualNic' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | NotSupported | ResourceInUse | RuntimeFault } :
  Action extends 'UpdateVirtualNic' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | InvalidState | NotFound | RuntimeFault } :
  Action extends 'UpdateVirtualSwitch' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | NotSupported | ResourceInUse | RuntimeFault } :
  Action extends 'AddStandaloneHost_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AgentInstallFailed | AlreadyBeingManaged | AlreadyConnected | DuplicateName | GatewayConnectFault | GatewayHostNotReachable | GatewayNotFound | GatewayNotReachable | GatewayOperationRefused | GatewayToHostAuthFault | GatewayToHostTrustVerifyFault | HostConnectFault | InvalidArgument | InvalidLogin | NoHost | NoPermission | NotEnoughLicenses | NotSupported | NotSupportedHost | RuntimeFault | SSLVerifyFault } :
  Action extends 'BatchAddHostsToCluster_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'BatchAddStandaloneHosts_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CreateCluster' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ClusterComputeResource'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidArgument | InvalidName | NotSupported | RuntimeFault } :
  Action extends 'CreateClusterEx' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ClusterComputeResource'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidArgument | InvalidName | NotSupported | RuntimeFault } :
  Action extends 'CreateDatacenter' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Datacenter'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidName | NotSupported | RuntimeFault } :
  Action extends 'CreateDVS_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DuplicateName | DvsFault | DvsNotAuthorized | InvalidName | NotFound | NotSupported | RuntimeFault } :
  Action extends 'CreateFolder' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Folder'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidName | RuntimeFault } :
  Action extends 'CreateStoragePod' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'StoragePod'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidName | NotSupported | RuntimeFault } :
  Action extends 'CreateVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AlreadyExists | DuplicateName | FileAlreadyExists | FileFault | InsufficientResourcesFault | InvalidDatastore | InvalidName | InvalidState | NoPermission | NotSupported | OutOfBounds | RuntimeFault | VmConfigFault | VmWwnConflict } :
  Action extends 'MoveIntoFolder_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DisallowedOperationOnFailoverHost | DuplicateName | InvalidFolder | InvalidState | NotSupported | RuntimeFault | VmAlreadyExistsInDatacenter } :
  Action extends 'RegisterVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AlreadyExists | DuplicateName | FileFault | InsufficientResourcesFault | InvalidArgument | InvalidDatastore | InvalidName | InvalidState | NotFound | NotSupported | OutOfBounds | RuntimeFault | VmConfigFault } :
  Action extends 'UnregisterAndDestroy_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ConcurrentAccess | InvalidState | NotSupported | RuntimeFault } :
  Action extends 'AllocateIpv4Address' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'AllocateIpv6Address' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'CreateIpPool' ? BackendResponse & { status: 'ok'; data: number } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'DestroyIpPool' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'QueryIPAllocations' ? BackendResponse & { status: 'ok'; data: IpPoolManagerIpAllocation[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryIpPools' ? BackendResponse & { status: 'ok'; data: IpPool[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ReleaseIpAllocation' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'UpdateIpPool' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ApplyEntitiesConfig_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ApplyHostConfig_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFailed | InvalidState | RuntimeFault } :
  Action extends 'CheckAnswerFileStatus_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidProfileReferenceHost | RuntimeFault } :
  Action extends 'CompositeHostProfile_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CreateDefaultProfile' ? BackendResponse & { status: 'ok'; data: ApplyProfile } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidProfileReferenceHost | RuntimeFault } :
  Action extends 'ExportAnswerFile_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'GenerateConfigTaskList' ? BackendResponse & { status: 'ok'; data: HostProfileManagerConfigTaskList } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'GenerateHostConfigTaskSpec_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'GenerateHostProfileTaskList_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryAnswerFileStatus' ? BackendResponse & { status: 'ok'; data: AnswerFileStatusResult[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryHostProfileMetadata' ? BackendResponse & { status: 'ok'; data: ProfileMetadata[] } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidProfileReferenceHost | RuntimeFault } :
  Action extends 'QueryProfileStructure' ? BackendResponse & { status: 'ok'; data: ProfileProfileStructure } | BackendResponse & { status: 'error'; data: InvalidProfileReferenceHost | RuntimeFault } :
  Action extends 'RetrieveAnswerFile' ? BackendResponse & { status: 'ok'; data: AnswerFile } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveAnswerFileForProfile' ? BackendResponse & { status: 'ok'; data: AnswerFile } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveHostCustomizations' ? BackendResponse & { status: 'ok'; data: StructuredCustomizations[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveHostCustomizationsForProfile' ? BackendResponse & { status: 'ok'; data: StructuredCustomizations[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateAnswerFile_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AnswerFileUpdateFailed | InvalidArgument | RuntimeFault } :
  Action extends 'UpdateHostCustomizations_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ValidateHostProfileComposition_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ApplyStorageDrsRecommendation_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ApplyStorageDrsRecommendationToPod_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'CancelStorageDrsRecommendation' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ConfigureDatastoreIORM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InaccessibleDatastore | InvalidArgument | IORMNotSupportedHostOnDatastore | NotSupported | RuntimeFault } :
  Action extends 'ConfigureStorageDrsForPod_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryDatastorePerformanceSummary' ? BackendResponse & { status: 'ok'; data: StoragePerformanceSummary[] } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryIORMConfigOption' ? BackendResponse & { status: 'ok'; data: StorageIORMConfigOption } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RecommendDatastores' ? BackendResponse & { status: 'ok'; data: StoragePlacementResult } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RefreshStorageDrsRecommendation' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RefreshStorageDrsRecommendationsForPod_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ValidateStoragePodConfig' ? BackendResponse & { status: 'ok'; data: MethodFault } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'AssignUserToGroup' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | RuntimeFault | UserNotFound } :
  Action extends 'ChangePassword' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidLogin | RuntimeFault } :
  Action extends 'CreateGroup' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | InvalidArgument | RuntimeFault } :
  Action extends 'CreateUser' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | InvalidArgument | RuntimeFault } :
  Action extends 'RemoveGroup' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault | UserNotFound } :
  Action extends 'RemoveUser' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault | SecurityError | UserNotFound } :
  Action extends 'UnassignUserFromGroup' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NoPermission | RuntimeFault | UserNotFound } :
  Action extends 'UpdateUser' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | InvalidArgument | RuntimeFault | UserNotFound } :
  Action extends 'AssociateProfile' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidType | RuntimeFault } :
  Action extends 'CheckProfileCompliance_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidProfileReferenceHost | RuntimeFault } :
  Action extends 'DestroyProfile' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'DissociateProfile' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ExportProfile' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveDescription' ? BackendResponse & { status: 'ok'; data: ProfileDescription } | BackendResponse & { status: 'error'; data: InvalidProfileReferenceHost | RuntimeFault } :
  Action extends 'AttachTagToVStorageObject' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'ClearVStorageObjectControlFlags' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'CloneVStorageObject_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'CreateDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'CreateDiskFromSnapshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'DeleteSnapshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'DeleteVStorageObject_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault | TaskInProgress } :
  Action extends 'DetachTagFromVStorageObject' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'ExtendDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault | TaskInProgress } :
  Action extends 'InflateDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault | TaskInProgress } :
  Action extends 'ListTagsAttachedToVStorageObject' ? BackendResponse & { status: 'ok'; data: VslmTagEntry[] } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'ListVStorageObject' ? BackendResponse & { status: 'ok'; data: ID[] } | BackendResponse & { status: 'error'; data: InvalidDatastore | RuntimeFault } :
  Action extends 'ListVStorageObjectsAttachedToTag' ? BackendResponse & { status: 'ok'; data: ID[] } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'ReconcileDatastoreInventory_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'RegisterDisk' ? BackendResponse & { status: 'ok'; data: VStorageObject } | BackendResponse & { status: 'error'; data: AlreadyExists | FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'RelocateVStorageObject_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'RenameVStorageObject' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'RetrieveSnapshotInfo' ? BackendResponse & { status: 'ok'; data: VStorageObjectSnapshotInfo } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'RetrieveVStorageInfrastructureObjectPolicy' ? BackendResponse & { status: 'ok'; data: vslmInfrastructureObjectPolicy[] } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'RetrieveVStorageObject' ? BackendResponse & { status: 'ok'; data: VStorageObject } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'RetrieveVStorageObjectAssociations' ? BackendResponse & { status: 'ok'; data: VStorageObjectAssociations[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveVStorageObjectState' ? BackendResponse & { status: 'ok'; data: VStorageObjectStateInfo } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'RevertVStorageObject_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'ScheduleReconcileDatastoreInventory' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'SetVStorageObjectControlFlags' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'UpdateVStorageInfrastructureObjectPolicy_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidState | NotFound | RuntimeFault | TaskInProgress } :
  Action extends 'UpdateVStorageObjectPolicy_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | NotFound | RuntimeFault | TaskInProgress } :
  Action extends 'VStorageObjectCreateSnapshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'AutoStartPowerOff' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'AutoStartPowerOn' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ReconfigureAutostart' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'BackupFirmwareConfiguration' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryFirmwareConfigUploadURL' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ResetFirmwareToFactoryDefaults' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'RestoreFirmwareConfiguration' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | InvalidBundle | InvalidState | MismatchedBundle | RuntimeFault } :
  Action extends 'BatchQueryConnectInfo' ? BackendResponse & { status: 'ok'; data: DatacenterBasicConnectInfo[] } | BackendResponse & { status: 'error'; data: NotSupported | RuntimeFault } :
  Action extends 'PowerOnMultiVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryConnectionInfo' ? BackendResponse & { status: 'ok'; data: HostConnectInfo } | BackendResponse & { status: 'error'; data: AlreadyConnected | HostConnectFault | InvalidLogin | NoHost | NotSupported | NotSupportedHost | RuntimeFault | SSLDisabledFault | SSLVerifyFault } :
  Action extends 'QueryConnectionInfoViaSpec' ? BackendResponse & { status: 'ok'; data: HostConnectInfo } | BackendResponse & { status: 'error'; data: GatewayConnectFault | GatewayHostNotReachable | GatewayNotFound | GatewayNotReachable | GatewayOperationRefused | GatewayToHostAuthFault | GatewayToHostTrustVerifyFault | HostConnectFault | InvalidArgument | InvalidLogin | RuntimeFault } :
  Action extends 'queryDatacenterConfigOptionDescriptor' ? BackendResponse & { status: 'ok'; data: VirtualMachineConfigOptionDescriptor[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ReconfigureDatacenter_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'BindVnic' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: IscsiFault | IscsiFaultInvalidVnic | IscsiFaultVnicAlreadyBound | IscsiFaultVnicHasMultipleUplinks | IscsiFaultVnicHasNoUplinks | IscsiFaultVnicHasWrongUplink | IscsiFaultVnicNotFound | NotFound | PlatformConfigFault | RuntimeFault } :
  Action extends 'QueryBoundVnics' ? BackendResponse & { status: 'ok'; data: IscsiPortInfo[] } | BackendResponse & { status: 'error'; data: IscsiFault | NotFound | RuntimeFault } :
  Action extends 'QueryCandidateNics' ? BackendResponse & { status: 'ok'; data: IscsiPortInfo[] } | BackendResponse & { status: 'error'; data: IscsiFault | NotFound | RuntimeFault } :
  Action extends 'QueryMigrationDependencies' ? BackendResponse & { status: 'ok'; data: IscsiMigrationDependency } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryPnicStatus' ? BackendResponse & { status: 'ok'; data: IscsiStatus } | BackendResponse & { status: 'error'; data: IscsiFault | RuntimeFault } :
  Action extends 'QueryVnicStatus' ? BackendResponse & { status: 'ok'; data: IscsiStatus } | BackendResponse & { status: 'error'; data: IscsiFault | RuntimeFault } :
  Action extends 'UnbindVnic' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: IscsiFault | IscsiFaultVnicHasActivePaths | IscsiFaultVnicIsLastPath | IscsiFaultVnicNotBound | NotFound | PlatformConfigFault | RuntimeFault } :
  Action extends 'BrowseDiagnosticLog' ? BackendResponse & { status: 'ok'; data: DiagnosticManagerLogHeader } | BackendResponse & { status: 'error'; data: CannotAccessFile | InvalidArgument | RuntimeFault } :
  Action extends 'GenerateLogBundles_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: LogBundlingFailed | RuntimeFault | TaskInProgress } :
  Action extends 'QueryDescriptions' ? BackendResponse & { status: 'ok'; data: DiagnosticManagerLogDescriptor[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'CancelRetrievePropertiesEx' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidProperty | RuntimeFault } :
  Action extends 'CancelWaitForUpdates' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CheckForUpdates' ? BackendResponse & { status: 'ok'; data: UpdateSet } | BackendResponse & { status: 'error'; data: InvalidCollectorVersion | RequestCanceled | RuntimeFault } :
  Action extends 'ContinueRetrievePropertiesEx' ? BackendResponse & { status: 'ok'; data: RetrieveResult } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidProperty | RuntimeFault } :
  Action extends 'CreateFilter' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'PropertyFilter'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidProperty | InvalidType | ManagedObjectNotFound | RuntimeFault } :
  Action extends 'CreatePropertyCollector' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'PropertyCollector'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'DestroyPropertyCollector' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NotSupported | RuntimeFault } :
  Action extends 'RetrieveProperties' ? BackendResponse & { status: 'ok'; data: ObjectContent[] } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidProperty | InvalidType | ManagedObjectNotFound | RuntimeFault } :
  Action extends 'RetrievePropertiesEx' ? BackendResponse & { status: 'ok'; data: RetrieveResult } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidProperty | InvalidType | ManagedObjectNotFound | RuntimeFault } :
  Action extends 'WaitForUpdates' ? BackendResponse & { status: 'ok'; data: UpdateSet } | BackendResponse & { status: 'error'; data: InvalidCollectorVersion | RequestCanceled | RuntimeFault } :
  Action extends 'WaitForUpdatesEx' ? BackendResponse & { status: 'ok'; data: UpdateSet } | BackendResponse & { status: 'error'; data: InvalidCollectorVersion | RequestCanceled | RuntimeFault } :
  Action extends 'CancelTask' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | NotSupported | RuntimeFault } :
  Action extends 'SetTaskDescription' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'SetTaskState' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'UpdateProgress' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | OutOfBounds | RuntimeFault } :
  Action extends 'CertMgrRefreshCACertificatesAndCRLs_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault | SystemError } :
  Action extends 'CertMgrRefreshCertificates_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault | SystemError } :
  Action extends 'CertMgrRevokeCertificates_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault | SystemError } :
  Action extends 'ChangeAccessMode' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AuthMinimumAdminPermission | InvalidArgument | RuntimeFault | SecurityError | UserNotFound } :
  Action extends 'ChangeLockdownMode' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AuthMinimumAdminPermission | NoPermission | RuntimeFault } :
  Action extends 'QueryLockdownExceptions' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QuerySystemUsers' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveHostAccessControlEntries' ? BackendResponse & { status: 'ok'; data: HostAccessControlEntry[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateLockdownExceptions' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AuthMinimumAdminPermission | RuntimeFault | UserNotFound } :
  Action extends 'UpdateSystemUsers' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault | UserNotFound } :
  Action extends 'ChangeFileAttributesInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'CreateTemporaryDirectoryInGuest' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'CreateTemporaryFileInGuest' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'DeleteDirectoryInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | NotADirectory | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'DeleteFileInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | NotAFile | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'InitiateFileTransferFromGuest' ? BackendResponse & { status: 'ok'; data: FileTransferInformation } | BackendResponse & { status: 'error'; data: FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'InitiateFileTransferToGuest' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'ListFilesInGuest' ? BackendResponse & { status: 'ok'; data: GuestListFileInfo } | BackendResponse & { status: 'error'; data: FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidArgument | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'MakeDirectoryInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileAlreadyExists | FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'MoveDirectoryInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'MoveFileInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'ChangeKey_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'CryptoManagerHostEnable' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | InvalidState | RuntimeFault } :
  Action extends 'CryptoManagerHostPrepare' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'ChangeOwner' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault | UserNotFound } :
  Action extends 'CopyDatastoreFile_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: CannotAccessFile | FileAlreadyExists | FileFault | FileLocked | FileNotFound | InvalidDatastore | NoDiskSpace | RuntimeFault } :
  Action extends 'DeleteDatastoreFile_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: CannotDeleteFile | FileFault | FileLocked | FileNotFound | InvalidDatastore | RuntimeFault } :
  Action extends 'MakeDirectory' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: CannotCreateFile | FileAlreadyExists | FileFault | FileNotFound | InvalidDatastore | RuntimeFault } :
  Action extends 'MoveDatastoreFile_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: CannotAccessFile | FileAlreadyExists | FileFault | FileLocked | FileNotFound | InvalidDatastore | NoDiskSpace | RuntimeFault } :
  Action extends 'CheckAddHostEvc_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: GatewayConnectFault | HostConnectFault | InvalidLogin | RuntimeFault } :
  Action extends 'CheckConfigureEvcMode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ConfigureEvcMode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: EVCConfigFault | RuntimeFault } :
  Action extends 'DisableEvcMode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CheckClone_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | RuntimeFault } :
  Action extends 'CheckInstantClone_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | RuntimeFault } :
  Action extends 'CheckMigrate_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidPowerState | InvalidState | RuntimeFault } :
  Action extends 'CheckRelocate_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | NotSupported | RuntimeFault } :
  Action extends 'QueryVMotionCompatibilityEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CheckCompatibility_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DatacenterMismatch | InvalidArgument | InvalidState | RuntimeFault } :
  Action extends 'CheckPowerOn_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DatacenterMismatch | InvalidArgument | RuntimeFault } :
  Action extends 'CheckVmConfig_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DatacenterMismatch | InvalidArgument | RuntimeFault } :
  Action extends 'CheckCompliance_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ClearComplianceStatus' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryComplianceStatus' ? BackendResponse & { status: 'ok'; data: ComplianceResult[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryExpressionMetadata' ? BackendResponse & { status: 'ok'; data: ProfileExpressionMetadata[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'CheckCustomizationResources' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: CustomizationFault | MissingLinuxCustResources | MissingWindowsCustResources | RuntimeFault | UncustomizableGuest } :
  Action extends 'CreateCustomizationSpec' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | CannotDecryptPasswords | CustomizationFault | RuntimeFault } :
  Action extends 'CustomizationSpecItemToXml' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'DeleteCustomizationSpec' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'DoesCustomizationSpecExist' ? BackendResponse & { status: 'ok'; data: boolean } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'DuplicateCustomizationSpec' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | NotFound | RuntimeFault } :
  Action extends 'GetCustomizationSpec' ? BackendResponse & { status: 'ok'; data: CustomizationSpecItem } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'OverwriteCustomizationSpec' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: CannotDecryptPasswords | ConcurrentAccess | CustomizationFault | NotFound | RuntimeFault } :
  Action extends 'RenameCustomizationSpec' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: AlreadyExists | NotFound | RuntimeFault } :
  Action extends 'XmlToCustomizationSpecItem' ? BackendResponse & { status: 'ok'; data: CustomizationSpecItem } | BackendResponse & { status: 'error'; data: CustomizationFault | RuntimeFault } :
  Action extends 'CheckHostPatch_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | PlatformConfigFault | RequestCanceled | RuntimeFault | TaskInProgress } :
  Action extends 'InstallHostPatch_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | NoDiskSpace | PatchBinariesNotFound | PatchInstallFailed | PatchMetadataInvalid | PatchNotApplicable | RebootRequired | RuntimeFault | TaskInProgress } :
  Action extends 'InstallHostPatchV2_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | PlatformConfigFault | RequestCanceled | RuntimeFault | TaskInProgress } :
  Action extends 'QueryHostPatch_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | PlatformConfigFault | RequestCanceled | RuntimeFault | TaskInProgress } :
  Action extends 'ScanHostPatch_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: PatchMetadataInvalid | PlatformConfigFault | RequestCanceled | RuntimeFault } :
  Action extends 'ScanHostPatchV2_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | PlatformConfigFault | RequestCanceled | RuntimeFault | TaskInProgress } :
  Action extends 'StageHostPatch_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | PlatformConfigFault | RequestCanceled | RuntimeFault | TaskInProgress } :
  Action extends 'UninstallHostPatch_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | PlatformConfigFault | RuntimeFault | TaskInProgress } :
  Action extends 'ClearSystemEventLog' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FetchSystemEventLog' ? BackendResponse & { status: 'ok'; data: SystemEventInfo[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RefreshHealthStatusSystem' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ResetSystemHealthInfo' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CloneVApp_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InsufficientResourcesFault | InvalidDatastore | InvalidPowerState | InvalidState | MigrationFault | NotSupported | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'ExportVApp' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'HttpNfcLease'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidPowerState | InvalidState | RuntimeFault | TaskInProgress } :
  Action extends 'PowerOffVApp_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | MissingPowerOffConfiguration | RuntimeFault | TaskInProgress | VAppConfigFault } :
  Action extends 'PowerOnVApp_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InsufficientResourcesFault | InvalidPowerState | InvalidState | MissingNetworkIpConfig | NotEnoughLicenses | NotSupported | RuntimeFault | TaskInProgress | VAppConfigFault | VmConfigFault } :
  Action extends 'SuspendVApp_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidPowerState | InvalidState | RuntimeFault | TaskInProgress | VAppConfigFault } :
  Action extends 'unregisterVApp_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ConcurrentAccess | InvalidPowerState | InvalidState | RuntimeFault } :
  Action extends 'UpdateLinkedChildren' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: ConcurrentAccess | InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'UpdateVAppConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: ConcurrentAccess | DuplicateName | FileFault | InsufficientResourcesFault | InvalidArgument | InvalidDatastore | InvalidIndexArgument | InvalidName | InvalidPowerState | InvalidState | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'CloseInventoryViewFolder' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'OpenInventoryViewFolder' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ConfigureDatastorePrincipal' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | InvalidState | NotSupported | RuntimeFault } :
  Action extends 'CreateLocalDatastore' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Datastore'; } } | BackendResponse & { status: 'error'; data: DuplicateName | FileNotFound | HostConfigFault | InvalidName | RuntimeFault } :
  Action extends 'CreateNasDatastore' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Datastore'; } } | BackendResponse & { status: 'error'; data: AlreadyExists | DuplicateName | HostConfigFault | InvalidArgument | NoGateway | NoVirtualNic | RuntimeFault } :
  Action extends 'CreateVmfsDatastore' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Datastore'; } } | BackendResponse & { status: 'error'; data: DuplicateName | HostConfigFault | InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'CreateVvolDatastore' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Datastore'; } } | BackendResponse & { status: 'error'; data: DuplicateName | HostConfigFault | InvalidName | NotFound | RuntimeFault } :
  Action extends 'ExpandVmfsDatastore' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Datastore'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | NotSupported | RuntimeFault } :
  Action extends 'ExtendVmfsDatastore' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Datastore'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | NotSupported | RuntimeFault } :
  Action extends 'QueryAvailableDisksForVmfs' ? BackendResponse & { status: 'ok'; data: HostScsiDisk[] } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | NotSupported | RuntimeFault } :
  Action extends 'QueryUnresolvedVmfsVolumes' ? BackendResponse & { status: 'ok'; data: HostUnresolvedVmfsVolume[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryVmfsDatastoreCreateOptions' ? BackendResponse & { status: 'ok'; data: VmfsDatastoreOption[] } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | NotSupported | RuntimeFault } :
  Action extends 'QueryVmfsDatastoreExpandOptions' ? BackendResponse & { status: 'ok'; data: VmfsDatastoreOption[] } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | NotSupported | RuntimeFault } :
  Action extends 'QueryVmfsDatastoreExtendOptions' ? BackendResponse & { status: 'ok'; data: VmfsDatastoreOption[] } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | NotSupported | RuntimeFault } :
  Action extends 'RemoveDatastore' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'RemoveDatastoreEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'ResignatureUnresolvedVmfsVolume_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault | VmfsAmbiguousMount } :
  Action extends 'UpdateLocalSwapDatastore' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DatastoreNotWritableOnHost | InaccessibleDatastore | NotSupported | RuntimeFault } :
  Action extends 'ConfigureHostCache_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault | SystemError } :
  Action extends 'ConfigurePowerPolicy' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | RuntimeFault } :
  Action extends 'configureVcha_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'createPassiveNode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'createWitnessNode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'deployVcha_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'destroyVcha_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'getVchaConfig' ? BackendResponse & { status: 'ok'; data: VchaClusterConfigInfo } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'prepareVcha_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ConfigureVFlashResourceEx_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'HostConfigureVFlashResource' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | ResourceInUse | RuntimeFault } :
  Action extends 'HostConfigVFlashCache' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InaccessibleVFlashSource | ResourceInUse | RuntimeFault } :
  Action extends 'HostGetVFlashModuleDefaultConfig' ? BackendResponse & { status: 'ok'; data: VirtualDiskVFlashCacheConfigInfo } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'HostRemoveVFlashResource' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | ResourceInUse | RuntimeFault } :
  Action extends 'ConvertNamespacePathToUuidPath' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidDatastorePath | RuntimeFault } :
  Action extends 'CreateDirectory' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: CannotCreateFile | FileAlreadyExists | InvalidDatastore | RuntimeFault } :
  Action extends 'DeleteDirectory' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | FileNotFound | InvalidDatastore | InvalidDatastorePath | RuntimeFault } :
  Action extends 'CopyVirtualDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidDiskFormat | RuntimeFault } :
  Action extends 'CreateVirtualDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'DefragmentVirtualDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'DeleteVirtualDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'EagerZeroVirtualDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'ExtendVirtualDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'ImportUnmanagedSnapshot' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'InflateVirtualDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'MoveVirtualDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'QueryVirtualDiskFragmentation' ? BackendResponse & { status: 'ok'; data: number } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'QueryVirtualDiskGeometry' ? BackendResponse & { status: 'ok'; data: HostDiskDimensionsChs } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'QueryVirtualDiskUuid' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'ReleaseManagedSnapshot' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileNotFound | InvalidDatastore | RuntimeFault } :
  Action extends 'SetVirtualDiskUuid' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'ShrinkVirtualDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'ZeroFillVirtualDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'CreateChildVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileAlreadyExists | FileFault | InsufficientResourcesFault | InvalidDatastore | InvalidName | NotSupported | OutOfBounds | RuntimeFault | VmConfigFault | VmWwnConflict } :
  Action extends 'CreateResourcePool' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ResourcePool'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InsufficientResourcesFault | InvalidArgument | InvalidName | NotSupported | RuntimeFault } :
  Action extends 'CreateVApp' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'VirtualApp'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InsufficientResourcesFault | InvalidArgument | InvalidName | InvalidState | NotSupported | RuntimeFault | VmConfigFault } :
  Action extends 'DestroyChildren' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ImportVApp' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'HttpNfcLease'; } } | BackendResponse & { status: 'error'; data: DuplicateName | FileAlreadyExists | FileFault | InsufficientResourcesFault | InvalidDatastore | InvalidName | NotSupported | OutOfBounds | RuntimeFault | VmConfigFault | VmWwnConflict } :
  Action extends 'MoveIntoResourcePool' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DuplicateName | InsufficientResourcesFault | InvalidArgument | RuntimeFault } :
  Action extends 'QueryResourceConfigOption' ? BackendResponse & { status: 'ok'; data: ResourceConfigOption } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RefreshRuntime' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RegisterChildVM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AlreadyExists | FileFault | InsufficientResourcesFault | InvalidArgument | InvalidDatastore | InvalidName | NotFound | NotSupported | OutOfBounds | RuntimeFault | VmConfigFault } :
  Action extends 'UpdateChildResourceConfiguration' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InsufficientResourcesFault | InvalidArgument | InvalidState | RuntimeFault } :
  Action extends 'UpdateConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: ConcurrentAccess | DuplicateName | InsufficientResourcesFault | InvalidArgument | InvalidName | RuntimeFault } :
  Action extends 'CreateCollectorForEvents' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'EventHistoryCollector'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | RuntimeFault } :
  Action extends 'LogUserEvent' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'PostEvent' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidEvent | RuntimeFault } :
  Action extends 'QueryEvents' ? BackendResponse & { status: 'ok'; data: Event[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'RetrieveArgumentDescription' ? BackendResponse & { status: 'ok'; data: EventArgDesc[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CreateCollectorForTasks' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'TaskHistoryCollector'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | RuntimeFault } :
  Action extends 'CreateTask' ? BackendResponse & { status: 'ok'; data: TaskInfo } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CreateContainerView' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ContainerView'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CreateInventoryView' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'InventoryView'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CreateListView' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ListView'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CreateListViewFromView' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ListView'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CreateDescriptor' ? BackendResponse & { status: 'ok'; data: OvfCreateDescriptorResult } | BackendResponse & { status: 'error'; data: ConcurrentAccess | FileFault | InvalidState | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'CreateImportSpec' ? BackendResponse & { status: 'ok'; data: OvfCreateImportSpecResult } | BackendResponse & { status: 'error'; data: ConcurrentAccess | FileFault | InvalidDatastore | InvalidState | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'ParseDescriptor' ? BackendResponse & { status: 'ok'; data: OvfParseDescriptorResult } | BackendResponse & { status: 'error'; data: ConcurrentAccess | FileFault | InvalidState | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'ValidateHost' ? BackendResponse & { status: 'ok'; data: OvfValidateHostResult } | BackendResponse & { status: 'error'; data: ConcurrentAccess | FileFault | InvalidState | RuntimeFault | TaskInProgress } :
  Action extends 'CreateDiagnosticPartition' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | NotSupported | RuntimeFault } :
  Action extends 'QueryAvailablePartition' ? BackendResponse & { status: 'ok'; data: HostDiagnosticPartition[] } | BackendResponse & { status: 'error'; data: HostConfigFault | NotSupported | RuntimeFault } :
  Action extends 'QueryPartitionCreateDesc' ? BackendResponse & { status: 'ok'; data: HostDiagnosticPartitionCreateDescription } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | NotSupported | RuntimeFault } :
  Action extends 'QueryPartitionCreateOptions' ? BackendResponse & { status: 'ok'; data: HostDiagnosticPartitionCreateOption[] } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'SelectActivePartition' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | NotSupported | RuntimeFault } :
  Action extends 'CreateNvdimmNamespace_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AlreadyExists | HostConfigFault | InvalidArgument | InvalidHostState | NotSupported | RuntimeFault | SystemError } :
  Action extends 'CreateNvdimmPMemNamespace_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AlreadyExists | HostConfigFault | InvalidArgument | InvalidHostState | NotSupported | RuntimeFault | SystemError } :
  Action extends 'DeleteNvdimmBlockNamespaces_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | InvalidHostState | NotFound | NotSupported | RuntimeFault | SystemError } :
  Action extends 'DeleteNvdimmNamespace_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | InvalidHostState | NotFound | NotSupported | RuntimeFault | SystemError } :
  Action extends 'CreateObjectScheduledTask' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ScheduledTask'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidArgument | InvalidName | RuntimeFault } :
  Action extends 'CreateScheduledTask' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ScheduledTask'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidArgument | InvalidName | RuntimeFault } :
  Action extends 'RetrieveEntityScheduledTask' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ScheduledTask[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveObjectScheduledTask' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ScheduledTask[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'CreatePerfInterval' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryAvailablePerfMetric' ? BackendResponse & { status: 'ok'; data: PerfMetricId[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryPerf' ? BackendResponse & { status: 'ok'; data: PerfEntityMetricBase[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RestrictedByAdministrator | RuntimeFault } :
  Action extends 'QueryPerfComposite' ? BackendResponse & { status: 'ok'; data: PerfCompositeMetric } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryPerfCounter' ? BackendResponse & { status: 'ok'; data: PerfCounterInfo[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryPerfCounterByLevel' ? BackendResponse & { status: 'ok'; data: PerfCounterInfo[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryPerfProviderSummary' ? BackendResponse & { status: 'ok'; data: PerfProviderSummary } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RemovePerfInterval' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ResetCounterLevelMapping' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'UpdateCounterLevelMapping' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'UpdatePerfInterval' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'CreateProfile' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Profile'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidProfileReferenceHost | RuntimeFault } :
  Action extends 'FindAssociatedProfile' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Profile[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryPolicyMetadata' ? BackendResponse & { status: 'ok'; data: ProfilePolicyMetadata[] } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidProfileReferenceHost | RuntimeFault } :
  Action extends 'CreateRegistryKeyInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | GuestRegistryKeyAlreadyExists | GuestRegistryKeyInvalid | GuestRegistryKeyParentVolatile | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'DeleteRegistryKeyInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | GuestRegistryKeyHasSubkeys | GuestRegistryKeyInvalid | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'DeleteRegistryValueInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | GuestRegistryKeyInvalid | GuestRegistryValueNotFound | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'ListRegistryKeysInGuest' ? BackendResponse & { status: 'ok'; data: GuestRegKeyRecordSpec[] } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | GuestRegistryKeyInvalid | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'ListRegistryValuesInGuest' ? BackendResponse & { status: 'ok'; data: GuestRegValueSpec[] } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | GuestRegistryKeyInvalid | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'SetRegistryValueInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | GuestRegistryKeyInvalid | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'CurrentTime' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryVMotionCompatibility' ? BackendResponse & { status: 'ok'; data: HostVMotionCompatibility[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveProductComponents' ? BackendResponse & { status: 'ok'; data: ProductComponentInfo[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveServiceContent' ? BackendResponse & { status: 'ok'; data: ServiceContent } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ValidateMigration' ? BackendResponse & { status: 'ok'; data: Event[] } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidPowerState | InvalidState | NoActiveHostInCluster | RuntimeFault } :
  Action extends 'DatastoreEnterMaintenanceMode' ? BackendResponse & { status: 'ok'; data: StoragePlacementResult } | BackendResponse & { status: 'error'; data: InvalidState | RequestCanceled | RuntimeFault } :
  Action extends 'DatastoreExitMaintenanceMode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'DestroyDatastore' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: ResourceInUse | RuntimeFault } :
  Action extends 'RefreshDatastore' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'RefreshDatastoreStorageInfo' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RenameDatastore' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidName | RuntimeFault } :
  Action extends 'UpdateVirtualMachineFiles_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidDatastore | NotSupported | PlatformConfigFault | ResourceInUse | RuntimeFault | TaskInProgress } :
  Action extends 'UpdateVVolVirtualMachineFiles_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidDatastore | NotSupported | PlatformConfigFault | RuntimeFault | TaskInProgress } :
  Action extends 'DeleteFile' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: CannotDeleteFile | FileFault | FileNotFound | InvalidArgument | InvalidDatastore | RuntimeFault } :
  Action extends 'SearchDatastore_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | FileNotFound | InvalidArgument | InvalidDatastore | RuntimeFault } :
  Action extends 'SearchDatastoreSubFolders_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | FileNotFound | InvalidArgument | InvalidDatastore | RuntimeFault } :
  Action extends 'DeleteHostSpecification' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostSpecificationOperationFailed | RuntimeFault } :
  Action extends 'DeleteHostSubSpecification' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostSpecificationOperationFailed | RuntimeFault } :
  Action extends 'HostSpecGetUpdatedHosts' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'HostSystem[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveHostSpecification' ? BackendResponse & { status: 'ok'; data: HostSpecification } | BackendResponse & { status: 'error'; data: HostSpecificationOperationFailed | RuntimeFault } :
  Action extends 'UpdateHostSpecification' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostSpecificationOperationFailed | RuntimeFault } :
  Action extends 'UpdateHostSubSpecification' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostSpecificationOperationFailed | RuntimeFault } :
  Action extends 'DeselectVnic' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'SelectVnic' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | RuntimeFault } :
  Action extends 'UpdateIpConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'DeselectVnicForNicType' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | RuntimeFault } :
  Action extends 'QueryNetConfig' ? BackendResponse & { status: 'ok'; data: VirtualNicManagerNetConfig } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | RuntimeFault } :
  Action extends 'SelectVnicForNicType' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | RuntimeFault } :
  Action extends 'Destroy_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault | VimFault } :
  Action extends 'Reload' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'Rename_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidName | RuntimeFault } :
  Action extends 'DestroyCollector' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ResetCollector' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RewindCollector' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'SetCollectorPageSize' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'DestroyNetwork' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: ResourceInUse | RuntimeFault } :
  Action extends 'DestroyPropertyFilter' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'DestroyView' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'DisableHyperThreading' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NotSupported | RuntimeFault } :
  Action extends 'EnableHyperThreading' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NotSupported | RuntimeFault } :
  Action extends 'DisableRuleset' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'EnableRuleset' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'RefreshFirewall' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateDefaultPolicy' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateRuleset' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | NotFound | RuntimeFault } :
  Action extends 'DisableSmartCardAuthentication' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: ActiveDirectoryFault | HostConfigFault | RuntimeFault } :
  Action extends 'EnableSmartCardAuthentication' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: ActiveDirectoryFault | HostConfigFault | RuntimeFault } :
  Action extends 'ImportCertificateForCAM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ActiveDirectoryFault | FileNotFound | InvalidCAMServer | RuntimeFault } :
  Action extends 'InstallSmartCardTrustAnchor' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'JoinDomain_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ActiveDirectoryFault | BlockedByFirewall | ClockSkew | DomainNotFound | HostConfigFault | InvalidHostName | InvalidLogin | InvalidState | NoPermissionOnAD | RuntimeFault | TaskInProgress } :
  Action extends 'JoinDomainWithCAM_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ActiveDirectoryFault | BlockedByFirewall | CAMServerRefusedConnection | ClockSkew | DomainNotFound | HostConfigFault | InvalidCAMCertificate | InvalidCAMServer | InvalidHostName | InvalidState | RuntimeFault | TaskInProgress } :
  Action extends 'LeaveCurrentDomain_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ActiveDirectoryFault | AuthMinimumAdminPermission | InvalidState | NonADUserRequired | RuntimeFault | TaskInProgress } :
  Action extends 'ListSmartCardTrustAnchors' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'RemoveSmartCardTrustAnchor' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'RemoveSmartCardTrustAnchorByFingerprint' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'ReplaceSmartCardTrustAnchors' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'DVPortgroupRollback_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DvsFault | RollbackFailure | RuntimeFault } :
  Action extends 'ReconfigureDVPortgroup_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: ConcurrentAccess | DuplicateName | DvsFault | DvsNotAuthorized | InvalidName | NotSupported | RuntimeFault } :
  Action extends 'DVSManagerExportEntity_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: BackupBlobWriteFailure | NotFound | RuntimeFault } :
  Action extends 'DVSManagerImportEntity_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DvsFault | NotFound | RuntimeFault } :
  Action extends 'DVSManagerLookupDvPortGroup' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'DistributedVirtualPortgroup'; } } | BackendResponse & { status: 'error'; data: NotFound | NotSupported | RuntimeFault } :
  Action extends 'QueryAvailableDvsSpec' ? BackendResponse & { status: 'ok'; data: DistributedVirtualSwitchProductSpec[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryCompatibleHostForExistingDvs' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'HostSystem[]'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryCompatibleHostForNewDvs' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'HostSystem[]'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryDvsByUuid' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'DistributedVirtualSwitch'; } } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryDvsCheckCompatibility' ? BackendResponse & { status: 'ok'; data: DistributedVirtualSwitchManagerCompatibilityResult[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryDvsCompatibleHostSpec' ? BackendResponse & { status: 'ok'; data: DistributedVirtualSwitchHostProductSpec[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryDvsConfigTarget' ? BackendResponse & { status: 'ok'; data: DVSManagerDvsConfigTarget } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryDvsFeatureCapability' ? BackendResponse & { status: 'ok'; data: DVSFeatureCapability } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'RectifyDvsOnHost_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DvsFault | RuntimeFault } :
  Action extends 'EstimateDatabaseSize' ? BackendResponse & { status: 'ok'; data: DatabaseSizeEstimate } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'EsxAgentHostManagerUpdateConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'ExecuteHostProfile' ? BackendResponse & { status: 'ok'; data: ProfileExecuteResult } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'HostProfileResetValidationState' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateHostProfile' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DuplicateName | ProfileUpdateFailed | RuntimeFault } :
  Action extends 'UpdateReferenceHost' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ExecuteSimpleCommand' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ExportSnapshot' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'HttpNfcLease'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidState | RuntimeFault | TaskInProgress } :
  Action extends 'RemoveSnapshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault | TaskInProgress } :
  Action extends 'RenameSnapshot' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidName | InvalidPowerState | InvalidState | NotSupported | RuntimeFault | TaskInProgress } :
  Action extends 'RevertToSnapshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InsufficientResourcesFault | InvalidPowerState | InvalidState | NotSupported | RuntimeFault | TaskInProgress | VmConfigFault } :
  Action extends 'fetchSoftwarePackages' ? BackendResponse & { status: 'ok'; data: SoftwarePackage[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'HostImageConfigGetAcceptance' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'HostImageConfigGetProfile' ? BackendResponse & { status: 'ok'; data: HostImageProfileSummary } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'installDate' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateHostImageAcceptanceLevel' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'FindAllByDnsName' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FindAllByIp' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FindAllByUuid' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FindByDatastorePath' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'VirtualMachine'; } } | BackendResponse & { status: 'error'; data: InvalidDatastore | RuntimeFault } :
  Action extends 'FindByDnsName' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FindByInventoryPath' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FindByIp' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FindByUuid' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FindChild' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'FindExtension' ? BackendResponse & { status: 'ok'; data: Extension } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'GetPublicKey' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryExtensionIpAllocationUsage' ? BackendResponse & { status: 'ok'; data: ExtensionManagerIpAllocationUsage[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryManagedBy' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'ManagedEntity[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RegisterExtension' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'SetExtensionCertificate' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NoClientCertificate | NotFound | RuntimeFault } :
  Action extends 'SetPublicKey' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'UnregisterExtension' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'UpdateExtension' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'GenerateCertificateSigningRequest' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'GenerateCertificateSigningRequestByDn' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'InstallServerCertificate' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'ListCACertificateRevocationLists' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'ListCACertificates' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'ReplaceCACertificatesAndCRLs' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'GenerateClientCsr' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'GenerateKey' ? BackendResponse & { status: 'ok'; data: CryptoKeyResult } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'GenerateSelfSignedClientCert' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ListKmipServers' ? BackendResponse & { status: 'ok'; data: KmipClusterInfo[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'MarkDefault' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryCryptoKeyStatus' ? BackendResponse & { status: 'ok'; data: CryptoManagerKmipCryptoKeyStatus[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RegisterKmipServer' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'RemoveKmipServer' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'RetrieveClientCert' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveClientCsr' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveKmipServerCert' ? BackendResponse & { status: 'ok'; data: CryptoManagerKmipServerCertInfo } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveKmipServersStatus_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RetrieveSelfSignedClientCert' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateKmipServer' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'UpdateKmsSignedCsrClientCert' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateSelfSignedClientCert' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UploadClientCert' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UploadKmipServerCert' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'getClusterMode' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'GetVchaClusterHealth' ? BackendResponse & { status: 'ok'; data: VchaClusterHealth } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'initiateFailover_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'setClusterMode_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'HostClearVStorageObjectControlFlags' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HostCloneVStorageObject_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'HostCreateDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'HostDeleteVStorageObject_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault | TaskInProgress } :
  Action extends 'HostExtendDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault | TaskInProgress } :
  Action extends 'HostInflateDisk_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault | TaskInProgress } :
  Action extends 'HostListVStorageObject' ? BackendResponse & { status: 'ok'; data: ID[] } | BackendResponse & { status: 'error'; data: InvalidDatastore | RuntimeFault } :
  Action extends 'HostReconcileDatastoreInventory_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'HostRegisterDisk' ? BackendResponse & { status: 'ok'; data: VStorageObject } | BackendResponse & { status: 'error'; data: AlreadyExists | FileFault | InvalidDatastore | RuntimeFault } :
  Action extends 'HostRelocateVStorageObject_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HostRenameVStorageObject' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'HostRetrieveVStorageInfrastructureObjectPolicy' ? BackendResponse & { status: 'ok'; data: vslmInfrastructureObjectPolicy[] } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HostRetrieveVStorageObject' ? BackendResponse & { status: 'ok'; data: VStorageObject } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'HostRetrieveVStorageObjectMetadata' ? BackendResponse & { status: 'ok'; data: KeyValue[] } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HostRetrieveVStorageObjectMetadataValue' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidState | KeyNotFound | NotFound | RuntimeFault } :
  Action extends 'HostRetrieveVStorageObjectState' ? BackendResponse & { status: 'ok'; data: VStorageObjectStateInfo } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'HostScheduleReconcileDatastoreInventory' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidDatastore | NotFound | RuntimeFault } :
  Action extends 'HostSetVStorageObjectControlFlags' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HostUpdateVStorageObjectMetadata_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HostVStorageObjectCreateDiskFromSnapshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HostVStorageObjectCreateSnapshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HostVStorageObjectDeleteSnapshot_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HostVStorageObjectRetrieveSnapshotInfo' ? BackendResponse & { status: 'ok'; data: VStorageObjectSnapshotInfo } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HostVStorageObjectRevert_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FileFault | InvalidDatastore | InvalidState | NotFound | RuntimeFault } :
  Action extends 'HttpNfcLeaseAbort' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | Timedout } :
  Action extends 'HttpNfcLeaseComplete' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | Timedout } :
  Action extends 'HttpNfcLeaseGetManifest' ? BackendResponse & { status: 'ok'; data: HttpNfcLeaseManifestEntry[] } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault | Timedout } :
  Action extends 'HttpNfcLeaseProgress' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault | Timedout } :
  Action extends 'HttpNfcLeasePullFromUrls_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: HttpFault | InvalidState | RuntimeFault | SSLVerifyFault } :
  Action extends 'HttpNfcLeaseSetManifestChecksumType' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'InstallIoFilter_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: AlreadyExists | InvalidArgument | RuntimeFault } :
  Action extends 'QueryDisksUsingFilter' ? BackendResponse & { status: 'ok'; data: VirtualDiskId[] } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryIoFilterInfo' ? BackendResponse & { status: 'ok'; data: ClusterIoFilterInfo[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryIoFilterIssues' ? BackendResponse & { status: 'ok'; data: IoFilterQueryIssueResult } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'ResolveInstallationErrorsOnCluster_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'ResolveInstallationErrorsOnHost_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'UninstallIoFilter_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: FilterInUse | InvalidArgument | InvalidState | NotFound | RuntimeFault } :
  Action extends 'UpgradeIoFilter_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidState | NotFound | RuntimeFault } :
  Action extends 'IsSharedGraphicsActive' ? BackendResponse & { status: 'ok'; data: boolean } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RefreshGraphicsManager' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateGraphicsConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ListProcessesInGuest' ? BackendResponse & { status: 'ok'; data: GuestProcessInfo[] } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'ReadEnvironmentVariableInGuest' ? BackendResponse & { status: 'ok'; data: string[] } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'StartProgramInGuest' ? BackendResponse & { status: 'ok'; data: number } | BackendResponse & { status: 'error'; data: CannotAccessFile | FileFault | FileNotFound | GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'TerminateProcessInGuest' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: GuestComponentsOutOfDate | GuestOperationsFault | GuestOperationsUnavailable | GuestPermissionDenied | GuestProcessNotFound | InvalidGuestLogin | InvalidPowerState | InvalidState | OperationDisabledByGuest | OperationNotSupportedByGuest | RuntimeFault | TaskInProgress } :
  Action extends 'LookupVmOverheadMemory' ? BackendResponse & { status: 'ok'; data: number } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidType | ManagedObjectNotFound | NotFound | RuntimeFault } :
  Action extends 'ModifyListView' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ResetListView' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ResetListViewFromView' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'PerformVsanUpgrade_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: RuntimeFault | VsanFault } :
  Action extends 'PerformVsanUpgradePreflightCheck' ? BackendResponse & { status: 'ok'; data: VsanUpgradeSystemPreflightCheckResult } | BackendResponse & { status: 'error'; data: RuntimeFault | VsanFault } :
  Action extends 'QueryVsanUpgradeStatus' ? BackendResponse & { status: 'ok'; data: VsanUpgradeSystemUpgradeStatus } | BackendResponse & { status: 'error'; data: RuntimeFault | VsanFault } :
  Action extends 'QueryAssignedLicenses' ? BackendResponse & { status: 'ok'; data: LicenseAssignmentManagerLicenseAssignment[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RemoveAssignedLicense' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: LicenseEntityNotFound | RuntimeFault } :
  Action extends 'UpdateAssignedLicense' ? BackendResponse & { status: 'ok'; data: LicenseManagerLicenseInfo } | BackendResponse & { status: 'error'; data: LicenseEntityNotFound | RuntimeFault } :
  Action extends 'QueryAvailableTimeZones' ? BackendResponse & { status: 'ok'; data: HostDateTimeSystemTimeZone[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryDateTime' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RefreshDateTimeSystem' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateDateTime' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'UpdateDateTimeConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'QueryBootDevices' ? BackendResponse & { status: 'ok'; data: HostBootDeviceInfo } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateBootDevice' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NotSupported | RuntimeFault } :
  Action extends 'QueryConfigOption' ? BackendResponse & { status: 'ok'; data: VirtualMachineConfigOption } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryConfigOptionDescriptor' ? BackendResponse & { status: 'ok'; data: VirtualMachineConfigOptionDescriptor[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryConfigOptionEx' ? BackendResponse & { status: 'ok'; data: VirtualMachineConfigOption } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryConfigTarget' ? BackendResponse & { status: 'ok'; data: ConfigTarget } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryTargetCapabilities' ? BackendResponse & { status: 'ok'; data: HostCapability } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'QueryConfiguredModuleOptionString' ? BackendResponse & { status: 'ok'; data: string } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryModules' ? BackendResponse & { status: 'ok'; data: KernelModuleInfo[] } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdateModuleOptionString' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: NotFound | RuntimeFault } :
  Action extends 'QueryHostsWithAttachedLun' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'HostSystem[]'; } } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'QueryOptions' ? BackendResponse & { status: 'ok'; data: OptionValue[] } | BackendResponse & { status: 'error'; data: InvalidName | RuntimeFault } :
  Action extends 'UpdateOptions' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | InvalidName | RuntimeFault } :
  Action extends 'QueryServiceList' ? BackendResponse & { status: 'ok'; data: ServiceManagerServiceInfo[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ReadNextEvents' ? BackendResponse & { status: 'ok'; data: Event[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ReadPreviousEvents' ? BackendResponse & { status: 'ok'; data: Event[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ReadNextTasks' ? BackendResponse & { status: 'ok'; data: TaskInfo[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ReadPreviousTasks' ? BackendResponse & { status: 'ok'; data: TaskInfo[] } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'ReconfigureAlarm' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidArgument | InvalidName | RuntimeFault } :
  Action extends 'RemoveAlarm' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'ReconfigureComputeResource_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: CannotDisableDrsOnClustersWithVApps | RuntimeFault } :
  Action extends 'ReconfigureScheduledTask' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DuplicateName | InvalidArgument | InvalidName | InvalidState | RuntimeFault } :
  Action extends 'RemoveScheduledTask' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'RunScheduledTask' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidState | RuntimeFault } :
  Action extends 'ReconfigureServiceConsoleReservation' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'ReconfigureVirtualMachineReservation' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | NotSupported | RuntimeFault } :
  Action extends 'ReconfigureSnmpAgent' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InsufficientResourcesFault | NotFound | RuntimeFault } :
  Action extends 'SendTestNotification' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InsufficientResourcesFault | NotFound | RuntimeFault } :
  Action extends 'Refresh' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'UpdatePassthruConfig' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | RuntimeFault } :
  Action extends 'RefreshServices' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: RuntimeFault } :
  Action extends 'RestartService' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidState | NotFound | RuntimeFault } :
  Action extends 'StartService' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidState | NotFound | RuntimeFault } :
  Action extends 'StopService' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidState | NotFound | RuntimeFault } :
  Action extends 'UninstallService' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | NotSupported | RuntimeFault } :
  Action extends 'UpdateServicePolicy' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: HostConfigFault | InvalidArgument | NotFound | RuntimeFault } :
  Action extends 'RetrieveUserGroups' ? BackendResponse & { status: 'ok'; data: UserSearchResult[] } | BackendResponse & { status: 'error'; data: NotFound | NotSupported | RuntimeFault } :
  Action extends 'setCustomValue' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: InvalidArgument | RuntimeFault } :
  Action extends 'UpdateClusterProfile' ? BackendResponse & { status: 'ok'; data: void } | BackendResponse & { status: 'error'; data: DuplicateName | RuntimeFault } :
  Action extends 'UpdateDVSLacpGroupConfig_Task' ? BackendResponse & { status: 'ok'; data: ManagedObjectReference & { $type: 'Task'; } } | BackendResponse & { status: 'error'; data: DvsFault | NotSupported | RuntimeFault } :
  never;
