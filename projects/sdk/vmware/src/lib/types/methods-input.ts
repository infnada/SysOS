import {AbandonHciWorkflow} from './methods/abandon-hci-workflow';
import {AddHost_Task} from './methods/add-host_task';
import {ApplyRecommendation} from './methods/apply-recommendation';
import {CancelRecommendation} from './methods/cancel-recommendation';
import {ClusterEnterMaintenanceMode} from './methods/cluster-enter-maintenance-mode';
import {ConfigureHCI_Task} from './methods/configure-h-c-i_task';
import {EvcManager} from './methods/evc-manager';
import {ExtendHCI_Task} from './methods/extend-h-c-i_task';
import {FindRulesForVm} from './methods/find-rules-for-vm';
import {GetResourceUsage} from './methods/get-resource-usage';
import {MoveHostInto_Task} from './methods/move-host-into_task';
import {MoveInto_Task} from './methods/move-into_task';
import {PlaceVm} from './methods/place-vm';
import {RecommendHostsForVm} from './methods/recommend-hosts-for-vm';
import {ReconfigureCluster_Task} from './methods/reconfigure-cluster_task';
import {RefreshRecommendation} from './methods/refresh-recommendation';
import {RetrieveDasAdvancedRuntimeInfo} from './methods/retrieve-das-advanced-runtime-info';
import {StampAllRulesWithUuid_Task} from './methods/stamp-all-rules-with-uuid_task';
import {ValidateHCIConfiguration} from './methods/validate-h-c-i-configuration';
import {AbdicateDomOwnership} from './methods/abdicate-dom-ownership';
import {CanProvisionObjects} from './methods/can-provision-objects';
import {DeleteVsanObjects} from './methods/delete-vsan-objects';
import {GetVsanObjExtAttrs} from './methods/get-vsan-obj-ext-attrs';
import {QueryCmmds} from './methods/query-cmmds';
import {QueryObjectsOnPhysicalVsanDisk} from './methods/query-objects-on-physical-vsan-disk';
import {QueryPhysicalVsanDisks} from './methods/query-physical-vsan-disks';
import {QuerySyncingVsanObjects} from './methods/query-syncing-vsan-objects';
import {QueryVsanObjects} from './methods/query-vsan-objects';
import {QueryVsanObjectUuidsByFilter} from './methods/query-vsan-object-uuids-by-filter';
import {QueryVsanStatistics} from './methods/query-vsan-statistics';
import {ReconfigurationSatisfiable} from './methods/reconfiguration-satisfiable';
import {ReconfigureDomObject} from './methods/reconfigure-dom-object';
import {RunVsanPhysicalDiskDiagnostics} from './methods/run-vsan-physical-disk-diagnostics';
import {UpgradeVsanObjects} from './methods/upgrade-vsan-objects';
import {AcknowledgeAlarm} from './methods/acknowledge-alarm';
import {AreAlarmActionsEnabled} from './methods/are-alarm-actions-enabled';
import {ClearTriggeredAlarms} from './methods/clear-triggered-alarms';
import {CreateAlarm} from './methods/create-alarm';
import {EnableAlarmActions} from './methods/enable-alarm-actions';
import {GetAlarm} from './methods/get-alarm';
import {GetAlarmState} from './methods/get-alarm-state';
import {AcquireCimServicesTicket} from './methods/acquire-cim-services-ticket';
import {ConfigureCryptoKey} from './methods/configure-crypto-key';
import {DisconnectHost_Task} from './methods/disconnect-host_task';
import {EnableCrypto} from './methods/enable-crypto';
import {EnterLockdownMode} from './methods/enter-lockdown-mode';
import {EnterMaintenanceMode_Task} from './methods/enter-maintenance-mode_task';
import {ExitLockdownMode} from './methods/exit-lockdown-mode';
import {ExitMaintenanceMode_Task} from './methods/exit-maintenance-mode_task';
import {PowerDownHostToStandBy_Task} from './methods/power-down-host-to-stand-by_task';
import {PowerUpHostFromStandBy_Task} from './methods/power-up-host-from-stand-by_task';
import {PrepareCrypto} from './methods/prepare-crypto';
import {QueryHostConnectionInfo} from './methods/query-host-connection-info';
import {QueryMemoryOverhead} from './methods/query-memory-overhead';
import {QueryMemoryOverheadEx} from './methods/query-memory-overhead-ex';
import {QueryProductLockerLocation} from './methods/query-product-locker-location';
import {QueryTpmAttestationReport} from './methods/query-tpm-attestation-report';
import {RebootHost_Task} from './methods/reboot-host_task';
import {ReconfigureHostForDAS_Task} from './methods/reconfigure-host-for-d-a-s_task';
import {ReconnectHost_Task} from './methods/reconnect-host_task';
import {RetrieveHardwareUptime} from './methods/retrieve-hardware-uptime';
import {ShutdownHost_Task} from './methods/shutdown-host_task';
import {UpdateFlags} from './methods/update-flags';
import {UpdateIpmi} from './methods/update-ipmi';
import {UpdateProductLockerLocation_Task} from './methods/update-product-locker-location_task';
import {UpdateSystemResources} from './methods/update-system-resources';
import {UpdateSystemSwapConfiguration} from './methods/update-system-swap-configuration';
import {AcquireCloneTicket} from './methods/acquire-clone-ticket';
import {AcquireGenericServiceTicket} from './methods/acquire-generic-service-ticket';
import {AcquireLocalTicket} from './methods/acquire-local-ticket';
import {CloneSession} from './methods/clone-session';
import {ImpersonateUser} from './methods/impersonate-user';
import {Login} from './methods/login';
import {LoginBySSPI} from './methods/login-by-s-s-p-i';
import {LoginByToken} from './methods/login-by-token';
import {LoginExtensionByCertificate} from './methods/login-extension-by-certificate';
import {LoginExtensionBySubjectName} from './methods/login-extension-by-subject-name';
import {Logout} from './methods/logout';
import {SessionIsActive} from './methods/session-is-active';
import {SetLocale} from './methods/set-locale';
import {TerminateSession} from './methods/terminate-session';
import {UpdateServiceMessage} from './methods/update-service-message';
import {AcquireCredentialsInGuest} from './methods/acquire-credentials-in-guest';
import {ReleaseCredentialsInGuest} from './methods/release-credentials-in-guest';
import {ValidateCredentialsInGuest} from './methods/validate-credentials-in-guest';
import {AcquireMksTicket} from './methods/acquire-mks-ticket';
import {AcquireTicket} from './methods/acquire-ticket';
import {AnswerVM} from './methods/answer-v-m';
import {ApplyEvcModeVM_Task} from './methods/apply-evc-mode-v-m_task';
import {AttachDisk_Task} from './methods/attach-disk_task';
import {CheckCustomizationSpec} from './methods/check-customization-spec';
import {CloneVM_Task} from './methods/clone-v-m_task';
import {ConsolidateVMDisks_Task} from './methods/consolidate-v-m-disks_task';
import {CreateScreenshot_Task} from './methods/create-screenshot_task';
import {CreateSecondaryVM_Task} from './methods/create-secondary-v-m_task';
import {CreateSecondaryVMEx_Task} from './methods/create-secondary-v-m-ex_task';
import {CreateSnapshot_Task} from './methods/create-snapshot_task';
import {CreateSnapshotEx_Task} from './methods/create-snapshot-ex_task';
import {CryptoUnlock_Task} from './methods/crypto-unlock_task';
import {CustomizeVM_Task} from './methods/customize-v-m_task';
import {DefragmentAllDisks} from './methods/defragment-all-disks';
import {DetachDisk_Task} from './methods/detach-disk_task';
import {DisableSecondaryVM_Task} from './methods/disable-secondary-v-m_task';
import {EnableSecondaryVM_Task} from './methods/enable-secondary-v-m_task';
import {EstimateStorageForConsolidateSnapshots_Task} from './methods/estimate-storage-for-consolidate-snapshots_task';
import {ExportVm} from './methods/export-vm';
import {ExtractOvfEnvironment} from './methods/extract-ovf-environment';
import {InstantClone_Task} from './methods/instant-clone_task';
import {MakePrimaryVM_Task} from './methods/make-primary-v-m_task';
import {MarkAsTemplate} from './methods/mark-as-template';
import {MarkAsVirtualMachine} from './methods/mark-as-virtual-machine';
import {MigrateVM_Task} from './methods/migrate-v-m_task';
import {MountToolsInstaller} from './methods/mount-tools-installer';
import {PowerOffVM_Task} from './methods/power-off-v-m_task';
import {PowerOnVM_Task} from './methods/power-on-v-m_task';
import {PromoteDisks_Task} from './methods/promote-disks_task';
import {PutUsbScanCodes} from './methods/put-usb-scan-codes';
import {QueryChangedDiskAreas} from './methods/query-changed-disk-areas';
import {QueryFaultToleranceCompatibility} from './methods/query-fault-tolerance-compatibility';
import {QueryFaultToleranceCompatibilityEx} from './methods/query-fault-tolerance-compatibility-ex';
import {QueryUnownedFiles} from './methods/query-unowned-files';
import {RebootGuest} from './methods/reboot-guest';
import {ReconfigVM_Task} from './methods/reconfig-v-m_task';
import {RefreshStorageInfo} from './methods/refresh-storage-info';
import {reloadVirtualMachineFromPath_Task} from './methods/reload-virtual-machine-from-path_task';
import {RelocateVM_Task} from './methods/relocate-v-m_task';
import {RemoveAllSnapshots_Task} from './methods/remove-all-snapshots_task';
import {ResetGuestInformation} from './methods/reset-guest-information';
import {ResetVM_Task} from './methods/reset-v-m_task';
import {RevertToCurrentSnapshot_Task} from './methods/revert-to-current-snapshot_task';
import {SendNMI} from './methods/send-n-m-i';
import {SetDisplayTopology} from './methods/set-display-topology';
import {SetScreenResolution} from './methods/set-screen-resolution';
import {ShutdownGuest} from './methods/shutdown-guest';
import {StandbyGuest} from './methods/standby-guest';
import {StartRecording_Task} from './methods/start-recording_task';
import {StartReplaying_Task} from './methods/start-replaying_task';
import {StopRecording_Task} from './methods/stop-recording_task';
import {StopReplaying_Task} from './methods/stop-replaying_task';
import {SuspendVM_Task} from './methods/suspend-v-m_task';
import {TerminateFaultTolerantVM_Task} from './methods/terminate-fault-tolerant-v-m_task';
import {TerminateVM} from './methods/terminate-v-m';
import {TurnOffFaultToleranceForVM_Task} from './methods/turn-off-fault-tolerance-for-v-m_task';
import {UnmountToolsInstaller} from './methods/unmount-tools-installer';
import {UnregisterVM} from './methods/unregister-v-m';
import {UpgradeTools_Task} from './methods/upgrade-tools_task';
import {UpgradeVM_Task} from './methods/upgrade-v-m_task';
import {AddAuthorizationRole} from './methods/add-authorization-role';
import {FetchUserPrivilegeOnEntities} from './methods/fetch-user-privilege-on-entities';
import {HasPrivilegeOnEntities} from './methods/has-privilege-on-entities';
import {HasPrivilegeOnEntity} from './methods/has-privilege-on-entity';
import {HasUserPrivilegeOnEntities} from './methods/has-user-privilege-on-entities';
import {MergePermissions} from './methods/merge-permissions';
import {RemoveAuthorizationRole} from './methods/remove-authorization-role';
import {RemoveEntityPermission} from './methods/remove-entity-permission';
import {ResetEntityPermissions} from './methods/reset-entity-permissions';
import {RetrieveAllPermissions} from './methods/retrieve-all-permissions';
import {RetrieveEntityPermissions} from './methods/retrieve-entity-permissions';
import {RetrieveRolePermissions} from './methods/retrieve-role-permissions';
import {SetEntityPermissions} from './methods/set-entity-permissions';
import {UpdateAuthorizationRole} from './methods/update-authorization-role';
import {AddCustomFieldDef} from './methods/add-custom-field-def';
import {RemoveCustomFieldDef} from './methods/remove-custom-field-def';
import {RenameCustomFieldDef} from './methods/rename-custom-field-def';
import {SetField} from './methods/set-field';
import {AddDisks_Task} from './methods/add-disks_task';
import {EvacuateVsanNode_Task} from './methods/evacuate-vsan-node_task';
import {InitializeDisks_Task} from './methods/initialize-disks_task';
import {QueryDisksForVsan} from './methods/query-disks-for-vsan';
import {QueryHostStatus} from './methods/query-host-status';
import {RecommissionVsanNode_Task} from './methods/recommission-vsan-node_task';
import {RemoveDisk_Task} from './methods/remove-disk_task';
import {RemoveDiskMapping_Task} from './methods/remove-disk-mapping_task';
import {UnmountDiskMapping_Task} from './methods/unmount-disk-mapping_task';
import {UpdateVsan_Task} from './methods/update-vsan_task';
import {AddDVPortgroup_Task} from './methods/add-d-v-portgroup_task';
import {AddNetworkResourcePool} from './methods/add-network-resource-pool';
import {CreateDVPortgroup_Task} from './methods/create-d-v-portgroup_task';
import {DvsReconfigureVmVnicNetworkResourcePool_Task} from './methods/dvs-reconfigure-vm-vnic-network-resource-pool_task';
import {DVSRollback_Task} from './methods/d-v-s-rollback_task';
import {EnableNetworkResourceManagement} from './methods/enable-network-resource-management';
import {FetchDVPortKeys} from './methods/fetch-d-v-port-keys';
import {FetchDVPorts} from './methods/fetch-d-v-ports';
import {LookupDvPortGroup} from './methods/lookup-dv-port-group';
import {MergeDvs_Task} from './methods/merge-dvs_task';
import {MoveDVPort_Task} from './methods/move-d-v-port_task';
import {PerformDvsProductSpecOperation_Task} from './methods/perform-dvs-product-spec-operation_task';
import {QueryUsedVlanIdInDvs} from './methods/query-used-vlan-id-in-dvs';
import {ReconfigureDVPort_Task} from './methods/reconfigure-d-v-port_task';
import {ReconfigureDvs_Task} from './methods/reconfigure-dvs_task';
import {RectifyDvsHost_Task} from './methods/rectify-dvs-host_task';
import {RefreshDVPortState} from './methods/refresh-d-v-port-state';
import {RemoveNetworkResourcePool} from './methods/remove-network-resource-pool';
import {UpdateDvsCapability} from './methods/update-dvs-capability';
import {UpdateDVSHealthCheckConfig_Task} from './methods/update-d-v-s-health-check-config_task';
import {UpdateNetworkResourcePool} from './methods/update-network-resource-pool';
import {AddFilter} from './methods/add-filter';
import {AddFilterEntities} from './methods/add-filter-entities';
import {AddMonitoredEntities} from './methods/add-monitored-entities';
import {HasMonitoredEntity} from './methods/has-monitored-entity';
import {HasProvider} from './methods/has-provider';
import {PostHealthUpdates} from './methods/post-health-updates';
import {QueryFilterEntities} from './methods/query-filter-entities';
import {QueryFilterInfoIds} from './methods/query-filter-info-ids';
import {QueryFilterList} from './methods/query-filter-list';
import {QueryFilterName} from './methods/query-filter-name';
import {QueryHealthUpdateInfos} from './methods/query-health-update-infos';
import {QueryHealthUpdates} from './methods/query-health-updates';
import {QueryMonitoredEntities} from './methods/query-monitored-entities';
import {QueryProviderList} from './methods/query-provider-list';
import {QueryProviderName} from './methods/query-provider-name';
import {QueryUnmonitoredHosts} from './methods/query-unmonitored-hosts';
import {RegisterHealthUpdateProvider} from './methods/register-health-update-provider';
import {RemoveFilter} from './methods/remove-filter';
import {RemoveFilterEntities} from './methods/remove-filter-entities';
import {RemoveMonitoredEntities} from './methods/remove-monitored-entities';
import {UnregisterHealthUpdateProvider} from './methods/unregister-health-update-provider';
import {AddGuestAlias} from './methods/add-guest-alias';
import {ListGuestAliases} from './methods/list-guest-aliases';
import {ListGuestMappedAliases} from './methods/list-guest-mapped-aliases';
import {RemoveGuestAlias} from './methods/remove-guest-alias';
import {RemoveGuestAliasByCert} from './methods/remove-guest-alias-by-cert';
import {AddInternetScsiSendTargets} from './methods/add-internet-scsi-send-targets';
import {AddInternetScsiStaticTargets} from './methods/add-internet-scsi-static-targets';
import {AttachScsiLun} from './methods/attach-scsi-lun';
import {AttachScsiLunEx_Task} from './methods/attach-scsi-lun-ex_task';
import {AttachVmfsExtent} from './methods/attach-vmfs-extent';
import {ChangeNFSUserPassword} from './methods/change-n-f-s-user-password';
import {ClearNFSUser} from './methods/clear-n-f-s-user';
import {ComputeDiskPartitionInfo} from './methods/compute-disk-partition-info';
import {ComputeDiskPartitionInfoForResize} from './methods/compute-disk-partition-info-for-resize';
import {DeleteScsiLunState} from './methods/delete-scsi-lun-state';
import {DeleteVffsVolumeState} from './methods/delete-vffs-volume-state';
import {DeleteVmfsVolumeState} from './methods/delete-vmfs-volume-state';
import {DestroyVffs} from './methods/destroy-vffs';
import {DetachScsiLun} from './methods/detach-scsi-lun';
import {DetachScsiLunEx_Task} from './methods/detach-scsi-lun-ex_task';
import {DisableMultipathPath} from './methods/disable-multipath-path';
import {DiscoverFcoeHbas} from './methods/discover-fcoe-hbas';
import {EnableMultipathPath} from './methods/enable-multipath-path';
import {ExpandVmfsExtent} from './methods/expand-vmfs-extent';
import {ExtendVffs} from './methods/extend-vffs';
import {FormatVffs} from './methods/format-vffs';
import {FormatVmfs} from './methods/format-vmfs';
import {MarkAsLocal_Task} from './methods/mark-as-local_task';
import {MarkAsNonLocal_Task} from './methods/mark-as-non-local_task';
import {MarkAsNonSsd_Task} from './methods/mark-as-non-ssd_task';
import {MarkAsSsd_Task} from './methods/mark-as-ssd_task';
import {MarkForRemoval} from './methods/mark-for-removal';
import {MarkPerenniallyReserved} from './methods/mark-perennially-reserved';
import {MarkPerenniallyReservedEx_Task} from './methods/mark-perennially-reserved-ex_task';
import {MountVffsVolume} from './methods/mount-vffs-volume';
import {MountVmfsVolume} from './methods/mount-vmfs-volume';
import {MountVmfsVolumeEx_Task} from './methods/mount-vmfs-volume-ex_task';
import {QueryAvailableSsds} from './methods/query-available-ssds';
import {QueryNFSUser} from './methods/query-n-f-s-user';
import {QueryPathSelectionPolicyOptions} from './methods/query-path-selection-policy-options';
import {QueryStorageArrayTypePolicyOptions} from './methods/query-storage-array-type-policy-options';
import {QueryUnresolvedVmfsVolume} from './methods/query-unresolved-vmfs-volume';
import {QueryVmfsConfigOption} from './methods/query-vmfs-config-option';
import {RefreshStorageSystem} from './methods/refresh-storage-system';
import {RemoveInternetScsiSendTargets} from './methods/remove-internet-scsi-send-targets';
import {RemoveInternetScsiStaticTargets} from './methods/remove-internet-scsi-static-targets';
import {RescanAllHba} from './methods/rescan-all-hba';
import {RescanHba} from './methods/rescan-hba';
import {RescanVffs} from './methods/rescan-vffs';
import {RescanVmfs} from './methods/rescan-vmfs';
import {ResolveMultipleUnresolvedVmfsVolumes} from './methods/resolve-multiple-unresolved-vmfs-volumes';
import {ResolveMultipleUnresolvedVmfsVolumesEx_Task} from './methods/resolve-multiple-unresolved-vmfs-volumes-ex_task';
import {RetrieveDiskPartitionInfo} from './methods/retrieve-disk-partition-info';
import {SetMultipathLunPolicy} from './methods/set-multipath-lun-policy';
import {SetNFSUser} from './methods/set-n-f-s-user';
import {TurnDiskLocatorLedOff_Task} from './methods/turn-disk-locator-led-off_task';
import {TurnDiskLocatorLedOn_Task} from './methods/turn-disk-locator-led-on_task';
import {UnmapVmfsVolumeEx_Task} from './methods/unmap-vmfs-volume-ex_task';
import {UnmountForceMountedVmfsVolume} from './methods/unmount-force-mounted-vmfs-volume';
import {UnmountVffsVolume} from './methods/unmount-vffs-volume';
import {UnmountVmfsVolume} from './methods/unmount-vmfs-volume';
import {UnmountVmfsVolumeEx_Task} from './methods/unmount-vmfs-volume-ex_task';
import {UpdateDiskPartitions} from './methods/update-disk-partitions';
import {UpdateInternetScsiAdvancedOptions} from './methods/update-internet-scsi-advanced-options';
import {UpdateInternetScsiAlias} from './methods/update-internet-scsi-alias';
import {UpdateInternetScsiAuthenticationProperties} from './methods/update-internet-scsi-authentication-properties';
import {UpdateInternetScsiDigestProperties} from './methods/update-internet-scsi-digest-properties';
import {UpdateInternetScsiDiscoveryProperties} from './methods/update-internet-scsi-discovery-properties';
import {UpdateInternetScsiIPProperties} from './methods/update-internet-scsi-i-p-properties';
import {UpdateInternetScsiName} from './methods/update-internet-scsi-name';
import {UpdateScsiLunDisplayName} from './methods/update-scsi-lun-display-name';
import {UpdateSoftwareInternetScsiEnabled} from './methods/update-software-internet-scsi-enabled';
import {UpdateVmfsUnmapBandwidth} from './methods/update-vmfs-unmap-bandwidth';
import {UpdateVmfsUnmapPriority} from './methods/update-vmfs-unmap-priority';
import {UpgradeVmfs} from './methods/upgrade-vmfs';
import {UpgradeVmLayout} from './methods/upgrade-vm-layout';
import {AddKey} from './methods/add-key';
import {AddKeys} from './methods/add-keys';
import {ListKeys} from './methods/list-keys';
import {RemoveKey} from './methods/remove-key';
import {RemoveKeys} from './methods/remove-keys';
import {AddLicense} from './methods/add-license';
import {CheckLicenseFeature} from './methods/check-license-feature';
import {ConfigureLicenseSource} from './methods/configure-license-source';
import {DecodeLicense} from './methods/decode-license';
import {DisableFeature} from './methods/disable-feature';
import {EnableFeature} from './methods/enable-feature';
import {QueryLicenseSourceAvailability} from './methods/query-license-source-availability';
import {QueryLicenseUsage} from './methods/query-license-usage';
import {QuerySupportedFeatures} from './methods/query-supported-features';
import {RemoveLicense} from './methods/remove-license';
import {RemoveLicenseLabel} from './methods/remove-license-label';
import {SetLicenseEdition} from './methods/set-license-edition';
import {UpdateLicense} from './methods/update-license';
import {UpdateLicenseLabel} from './methods/update-license-label';
import {AddPortGroup} from './methods/add-port-group';
import {AddServiceConsoleVirtualNic} from './methods/add-service-console-virtual-nic';
import {AddVirtualNic} from './methods/add-virtual-nic';
import {AddVirtualSwitch} from './methods/add-virtual-switch';
import {QueryNetworkHint} from './methods/query-network-hint';
import {RefreshNetworkSystem} from './methods/refresh-network-system';
import {RemovePortGroup} from './methods/remove-port-group';
import {RemoveServiceConsoleVirtualNic} from './methods/remove-service-console-virtual-nic';
import {RemoveVirtualNic} from './methods/remove-virtual-nic';
import {RemoveVirtualSwitch} from './methods/remove-virtual-switch';
import {RestartServiceConsoleVirtualNic} from './methods/restart-service-console-virtual-nic';
import {UpdateConsoleIpRouteConfig} from './methods/update-console-ip-route-config';
import {UpdateDnsConfig} from './methods/update-dns-config';
import {UpdateIpRouteConfig} from './methods/update-ip-route-config';
import {UpdateIpRouteTableConfig} from './methods/update-ip-route-table-config';
import {UpdateNetworkConfig} from './methods/update-network-config';
import {UpdatePhysicalNicLinkSpeed} from './methods/update-physical-nic-link-speed';
import {UpdatePortGroup} from './methods/update-port-group';
import {UpdateServiceConsoleVirtualNic} from './methods/update-service-console-virtual-nic';
import {UpdateVirtualNic} from './methods/update-virtual-nic';
import {UpdateVirtualSwitch} from './methods/update-virtual-switch';
import {AddStandaloneHost_Task} from './methods/add-standalone-host_task';
import {BatchAddHostsToCluster_Task} from './methods/batch-add-hosts-to-cluster_task';
import {BatchAddStandaloneHosts_Task} from './methods/batch-add-standalone-hosts_task';
import {CreateCluster} from './methods/create-cluster';
import {CreateClusterEx} from './methods/create-cluster-ex';
import {CreateDatacenter} from './methods/create-datacenter';
import {CreateDVS_Task} from './methods/create-d-v-s_task';
import {CreateFolder} from './methods/create-folder';
import {CreateStoragePod} from './methods/create-storage-pod';
import {CreateVM_Task} from './methods/create-v-m_task';
import {MoveIntoFolder_Task} from './methods/move-into-folder_task';
import {RegisterVM_Task} from './methods/register-v-m_task';
import {UnregisterAndDestroy_Task} from './methods/unregister-and-destroy_task';
import {AllocateIpv4Address} from './methods/allocate-ipv4address';
import {AllocateIpv6Address} from './methods/allocate-ipv6address';
import {CreateIpPool} from './methods/create-ip-pool';
import {DestroyIpPool} from './methods/destroy-ip-pool';
import {QueryIPAllocations} from './methods/query-i-p-allocations';
import {QueryIpPools} from './methods/query-ip-pools';
import {ReleaseIpAllocation} from './methods/release-ip-allocation';
import {UpdateIpPool} from './methods/update-ip-pool';
import {ApplyEntitiesConfig_Task} from './methods/apply-entities-config_task';
import {ApplyHostConfig_Task} from './methods/apply-host-config_task';
import {CheckAnswerFileStatus_Task} from './methods/check-answer-file-status_task';
import {CompositeHostProfile_Task} from './methods/composite-host-profile_task';
import {CreateDefaultProfile} from './methods/create-default-profile';
import {ExportAnswerFile_Task} from './methods/export-answer-file_task';
import {GenerateConfigTaskList} from './methods/generate-config-task-list';
import {GenerateHostConfigTaskSpec_Task} from './methods/generate-host-config-task-spec_task';
import {GenerateHostProfileTaskList_Task} from './methods/generate-host-profile-task-list_task';
import {QueryAnswerFileStatus} from './methods/query-answer-file-status';
import {QueryHostProfileMetadata} from './methods/query-host-profile-metadata';
import {QueryProfileStructure} from './methods/query-profile-structure';
import {RetrieveAnswerFile} from './methods/retrieve-answer-file';
import {RetrieveAnswerFileForProfile} from './methods/retrieve-answer-file-for-profile';
import {RetrieveHostCustomizations} from './methods/retrieve-host-customizations';
import {RetrieveHostCustomizationsForProfile} from './methods/retrieve-host-customizations-for-profile';
import {UpdateAnswerFile_Task} from './methods/update-answer-file_task';
import {UpdateHostCustomizations_Task} from './methods/update-host-customizations_task';
import {ValidateHostProfileComposition_Task} from './methods/validate-host-profile-composition_task';
import {ApplyStorageDrsRecommendation_Task} from './methods/apply-storage-drs-recommendation_task';
import {ApplyStorageDrsRecommendationToPod_Task} from './methods/apply-storage-drs-recommendation-to-pod_task';
import {CancelStorageDrsRecommendation} from './methods/cancel-storage-drs-recommendation';
import {ConfigureDatastoreIORM_Task} from './methods/configure-datastore-i-o-r-m_task';
import {ConfigureStorageDrsForPod_Task} from './methods/configure-storage-drs-for-pod_task';
import {QueryDatastorePerformanceSummary} from './methods/query-datastore-performance-summary';
import {QueryIORMConfigOption} from './methods/query-i-o-r-m-config-option';
import {RecommendDatastores} from './methods/recommend-datastores';
import {RefreshStorageDrsRecommendation} from './methods/refresh-storage-drs-recommendation';
import {RefreshStorageDrsRecommendationsForPod_Task} from './methods/refresh-storage-drs-recommendations-for-pod_task';
import {ValidateStoragePodConfig} from './methods/validate-storage-pod-config';
import {AssignUserToGroup} from './methods/assign-user-to-group';
import {ChangePassword} from './methods/change-password';
import {CreateGroup} from './methods/create-group';
import {CreateUser} from './methods/create-user';
import {RemoveGroup} from './methods/remove-group';
import {RemoveUser} from './methods/remove-user';
import {UnassignUserFromGroup} from './methods/unassign-user-from-group';
import {UpdateUser} from './methods/update-user';
import {AssociateProfile} from './methods/associate-profile';
import {CheckProfileCompliance_Task} from './methods/check-profile-compliance_task';
import {DestroyProfile} from './methods/destroy-profile';
import {DissociateProfile} from './methods/dissociate-profile';
import {ExportProfile} from './methods/export-profile';
import {RetrieveDescription} from './methods/retrieve-description';
import {AttachTagToVStorageObject} from './methods/attach-tag-to-v-storage-object';
import {ClearVStorageObjectControlFlags} from './methods/clear-v-storage-object-control-flags';
import {CloneVStorageObject_Task} from './methods/clone-v-storage-object_task';
import {CreateDisk_Task} from './methods/create-disk_task';
import {CreateDiskFromSnapshot_Task} from './methods/create-disk-from-snapshot_task';
import {DeleteSnapshot_Task} from './methods/delete-snapshot_task';
import {DeleteVStorageObject_Task} from './methods/delete-v-storage-object_task';
import {DetachTagFromVStorageObject} from './methods/detach-tag-from-v-storage-object';
import {ExtendDisk_Task} from './methods/extend-disk_task';
import {InflateDisk_Task} from './methods/inflate-disk_task';
import {ListTagsAttachedToVStorageObject} from './methods/list-tags-attached-to-v-storage-object';
import {ListVStorageObject} from './methods/list-v-storage-object';
import {ListVStorageObjectsAttachedToTag} from './methods/list-v-storage-objects-attached-to-tag';
import {ReconcileDatastoreInventory_Task} from './methods/reconcile-datastore-inventory_task';
import {RegisterDisk} from './methods/register-disk';
import {RelocateVStorageObject_Task} from './methods/relocate-v-storage-object_task';
import {RenameVStorageObject} from './methods/rename-v-storage-object';
import {RetrieveSnapshotInfo} from './methods/retrieve-snapshot-info';
import {RetrieveVStorageInfrastructureObjectPolicy} from './methods/retrieve-v-storage-infrastructure-object-policy';
import {RetrieveVStorageObject} from './methods/retrieve-v-storage-object';
import {RetrieveVStorageObjectAssociations} from './methods/retrieve-v-storage-object-associations';
import {RetrieveVStorageObjectState} from './methods/retrieve-v-storage-object-state';
import {RevertVStorageObject_Task} from './methods/revert-v-storage-object_task';
import {ScheduleReconcileDatastoreInventory} from './methods/schedule-reconcile-datastore-inventory';
import {SetVStorageObjectControlFlags} from './methods/set-v-storage-object-control-flags';
import {UpdateVStorageInfrastructureObjectPolicy_Task} from './methods/update-v-storage-infrastructure-object-policy_task';
import {UpdateVStorageObjectPolicy_Task} from './methods/update-v-storage-object-policy_task';
import {VStorageObjectCreateSnapshot_Task} from './methods/v-storage-object-create-snapshot_task';
import {AutoStartPowerOff} from './methods/auto-start-power-off';
import {AutoStartPowerOn} from './methods/auto-start-power-on';
import {ReconfigureAutostart} from './methods/reconfigure-autostart';
import {BackupFirmwareConfiguration} from './methods/backup-firmware-configuration';
import {QueryFirmwareConfigUploadURL} from './methods/query-firmware-config-upload-u-r-l';
import {ResetFirmwareToFactoryDefaults} from './methods/reset-firmware-to-factory-defaults';
import {RestoreFirmwareConfiguration} from './methods/restore-firmware-configuration';
import {BatchQueryConnectInfo} from './methods/batch-query-connect-info';
import {PowerOnMultiVM_Task} from './methods/power-on-multi-v-m_task';
import {QueryConnectionInfo} from './methods/query-connection-info';
import {QueryConnectionInfoViaSpec} from './methods/query-connection-info-via-spec';
import {queryDatacenterConfigOptionDescriptor} from './methods/query-datacenter-config-option-descriptor';
import {ReconfigureDatacenter_Task} from './methods/reconfigure-datacenter_task';
import {BindVnic} from './methods/bind-vnic';
import {QueryBoundVnics} from './methods/query-bound-vnics';
import {QueryCandidateNics} from './methods/query-candidate-nics';
import {QueryMigrationDependencies} from './methods/query-migration-dependencies';
import {QueryPnicStatus} from './methods/query-pnic-status';
import {QueryVnicStatus} from './methods/query-vnic-status';
import {UnbindVnic} from './methods/unbind-vnic';
import {BrowseDiagnosticLog} from './methods/browse-diagnostic-log';
import {GenerateLogBundles_Task} from './methods/generate-log-bundles_task';
import {QueryDescriptions} from './methods/query-descriptions';
import {CancelRetrievePropertiesEx} from './methods/cancel-retrieve-properties-ex';
import {CancelWaitForUpdates} from './methods/cancel-wait-for-updates';
import {CheckForUpdates} from './methods/check-for-updates';
import {ContinueRetrievePropertiesEx} from './methods/continue-retrieve-properties-ex';
import {CreateFilter} from './methods/create-filter';
import {CreatePropertyCollector} from './methods/create-property-collector';
import {DestroyPropertyCollector} from './methods/destroy-property-collector';
import {RetrieveProperties} from './methods/retrieve-properties';
import {RetrievePropertiesEx} from './methods/retrieve-properties-ex';
import {WaitForUpdates} from './methods/wait-for-updates';
import {WaitForUpdatesEx} from './methods/wait-for-updates-ex';
import {CancelTask} from './methods/cancel-task';
import {SetTaskDescription} from './methods/set-task-description';
import {SetTaskState} from './methods/set-task-state';
import {UpdateProgress} from './methods/update-progress';
import {CertMgrRefreshCACertificatesAndCRLs_Task} from './methods/cert-mgr-refresh-c-a-certificates-and-c-r-ls_task';
import {CertMgrRefreshCertificates_Task} from './methods/cert-mgr-refresh-certificates_task';
import {CertMgrRevokeCertificates_Task} from './methods/cert-mgr-revoke-certificates_task';
import {ChangeAccessMode} from './methods/change-access-mode';
import {ChangeLockdownMode} from './methods/change-lockdown-mode';
import {QueryLockdownExceptions} from './methods/query-lockdown-exceptions';
import {QuerySystemUsers} from './methods/query-system-users';
import {RetrieveHostAccessControlEntries} from './methods/retrieve-host-access-control-entries';
import {UpdateLockdownExceptions} from './methods/update-lockdown-exceptions';
import {UpdateSystemUsers} from './methods/update-system-users';
import {ChangeFileAttributesInGuest} from './methods/change-file-attributes-in-guest';
import {CreateTemporaryDirectoryInGuest} from './methods/create-temporary-directory-in-guest';
import {CreateTemporaryFileInGuest} from './methods/create-temporary-file-in-guest';
import {DeleteDirectoryInGuest} from './methods/delete-directory-in-guest';
import {DeleteFileInGuest} from './methods/delete-file-in-guest';
import {InitiateFileTransferFromGuest} from './methods/initiate-file-transfer-from-guest';
import {InitiateFileTransferToGuest} from './methods/initiate-file-transfer-to-guest';
import {ListFilesInGuest} from './methods/list-files-in-guest';
import {MakeDirectoryInGuest} from './methods/make-directory-in-guest';
import {MoveDirectoryInGuest} from './methods/move-directory-in-guest';
import {MoveFileInGuest} from './methods/move-file-in-guest';
import {ChangeKey_Task} from './methods/change-key_task';
import {CryptoManagerHostEnable} from './methods/crypto-manager-host-enable';
import {CryptoManagerHostPrepare} from './methods/crypto-manager-host-prepare';
import {ChangeOwner} from './methods/change-owner';
import {CopyDatastoreFile_Task} from './methods/copy-datastore-file_task';
import {DeleteDatastoreFile_Task} from './methods/delete-datastore-file_task';
import {MakeDirectory} from './methods/make-directory';
import {MoveDatastoreFile_Task} from './methods/move-datastore-file_task';
import {CheckAddHostEvc_Task} from './methods/check-add-host-evc_task';
import {CheckConfigureEvcMode_Task} from './methods/check-configure-evc-mode_task';
import {ConfigureEvcMode_Task} from './methods/configure-evc-mode_task';
import {DisableEvcMode_Task} from './methods/disable-evc-mode_task';
import {CheckClone_Task} from './methods/check-clone_task';
import {CheckInstantClone_Task} from './methods/check-instant-clone_task';
import {CheckMigrate_Task} from './methods/check-migrate_task';
import {CheckRelocate_Task} from './methods/check-relocate_task';
import {QueryVMotionCompatibilityEx_Task} from './methods/query-v-motion-compatibility-ex_task';
import {CheckCompatibility_Task} from './methods/check-compatibility_task';
import {CheckPowerOn_Task} from './methods/check-power-on_task';
import {CheckVmConfig_Task} from './methods/check-vm-config_task';
import {CheckCompliance_Task} from './methods/check-compliance_task';
import {ClearComplianceStatus} from './methods/clear-compliance-status';
import {QueryComplianceStatus} from './methods/query-compliance-status';
import {QueryExpressionMetadata} from './methods/query-expression-metadata';
import {CheckCustomizationResources} from './methods/check-customization-resources';
import {CreateCustomizationSpec} from './methods/create-customization-spec';
import {CustomizationSpecItemToXml} from './methods/customization-spec-item-to-xml';
import {DeleteCustomizationSpec} from './methods/delete-customization-spec';
import {DoesCustomizationSpecExist} from './methods/does-customization-spec-exist';
import {DuplicateCustomizationSpec} from './methods/duplicate-customization-spec';
import {GetCustomizationSpec} from './methods/get-customization-spec';
import {OverwriteCustomizationSpec} from './methods/overwrite-customization-spec';
import {RenameCustomizationSpec} from './methods/rename-customization-spec';
import {XmlToCustomizationSpecItem} from './methods/xml-to-customization-spec-item';
import {CheckHostPatch_Task} from './methods/check-host-patch_task';
import {InstallHostPatch_Task} from './methods/install-host-patch_task';
import {InstallHostPatchV2_Task} from './methods/install-host-patch-v2_task';
import {QueryHostPatch_Task} from './methods/query-host-patch_task';
import {ScanHostPatch_Task} from './methods/scan-host-patch_task';
import {ScanHostPatchV2_Task} from './methods/scan-host-patch-v2_task';
import {StageHostPatch_Task} from './methods/stage-host-patch_task';
import {UninstallHostPatch_Task} from './methods/uninstall-host-patch_task';
import {ClearSystemEventLog} from './methods/clear-system-event-log';
import {FetchSystemEventLog} from './methods/fetch-system-event-log';
import {RefreshHealthStatusSystem} from './methods/refresh-health-status-system';
import {ResetSystemHealthInfo} from './methods/reset-system-health-info';
import {CloneVApp_Task} from './methods/clone-v-app_task';
import {ExportVApp} from './methods/export-v-app';
import {PowerOffVApp_Task} from './methods/power-off-v-app_task';
import {PowerOnVApp_Task} from './methods/power-on-v-app_task';
import {SuspendVApp_Task} from './methods/suspend-v-app_task';
import {unregisterVApp_Task} from './methods/unregister-v-app_task';
import {UpdateLinkedChildren} from './methods/update-linked-children';
import {UpdateVAppConfig} from './methods/update-v-app-config';
import {CloseInventoryViewFolder} from './methods/close-inventory-view-folder';
import {OpenInventoryViewFolder} from './methods/open-inventory-view-folder';
import {ConfigureDatastorePrincipal} from './methods/configure-datastore-principal';
import {CreateLocalDatastore} from './methods/create-local-datastore';
import {CreateNasDatastore} from './methods/create-nas-datastore';
import {CreateVmfsDatastore} from './methods/create-vmfs-datastore';
import {CreateVvolDatastore} from './methods/create-vvol-datastore';
import {ExpandVmfsDatastore} from './methods/expand-vmfs-datastore';
import {ExtendVmfsDatastore} from './methods/extend-vmfs-datastore';
import {QueryAvailableDisksForVmfs} from './methods/query-available-disks-for-vmfs';
import {QueryUnresolvedVmfsVolumes} from './methods/query-unresolved-vmfs-volumes';
import {QueryVmfsDatastoreCreateOptions} from './methods/query-vmfs-datastore-create-options';
import {QueryVmfsDatastoreExpandOptions} from './methods/query-vmfs-datastore-expand-options';
import {QueryVmfsDatastoreExtendOptions} from './methods/query-vmfs-datastore-extend-options';
import {RemoveDatastore} from './methods/remove-datastore';
import {RemoveDatastoreEx_Task} from './methods/remove-datastore-ex_task';
import {ResignatureUnresolvedVmfsVolume_Task} from './methods/resignature-unresolved-vmfs-volume_task';
import {UpdateLocalSwapDatastore} from './methods/update-local-swap-datastore';
import {ConfigureHostCache_Task} from './methods/configure-host-cache_task';
import {ConfigurePowerPolicy} from './methods/configure-power-policy';
import {configureVcha_Task} from './methods/configure-vcha_task';
import {createPassiveNode_Task} from './methods/create-passive-node_task';
import {createWitnessNode_Task} from './methods/create-witness-node_task';
import {deployVcha_Task} from './methods/deploy-vcha_task';
import {destroyVcha_Task} from './methods/destroy-vcha_task';
import {getVchaConfig} from './methods/get-vcha-config';
import {prepareVcha_Task} from './methods/prepare-vcha_task';
import {ConfigureVFlashResourceEx_Task} from './methods/configure-v-flash-resource-ex_task';
import {HostConfigureVFlashResource} from './methods/host-configure-v-flash-resource';
import {HostConfigVFlashCache} from './methods/host-config-v-flash-cache';
import {HostGetVFlashModuleDefaultConfig} from './methods/host-get-v-flash-module-default-config';
import {HostRemoveVFlashResource} from './methods/host-remove-v-flash-resource';
import {ConvertNamespacePathToUuidPath} from './methods/convert-namespace-path-to-uuid-path';
import {CreateDirectory} from './methods/create-directory';
import {DeleteDirectory} from './methods/delete-directory';
import {CopyVirtualDisk_Task} from './methods/copy-virtual-disk_task';
import {CreateVirtualDisk_Task} from './methods/create-virtual-disk_task';
import {DefragmentVirtualDisk_Task} from './methods/defragment-virtual-disk_task';
import {DeleteVirtualDisk_Task} from './methods/delete-virtual-disk_task';
import {EagerZeroVirtualDisk_Task} from './methods/eager-zero-virtual-disk_task';
import {ExtendVirtualDisk_Task} from './methods/extend-virtual-disk_task';
import {ImportUnmanagedSnapshot} from './methods/import-unmanaged-snapshot';
import {InflateVirtualDisk_Task} from './methods/inflate-virtual-disk_task';
import {MoveVirtualDisk_Task} from './methods/move-virtual-disk_task';
import {QueryVirtualDiskFragmentation} from './methods/query-virtual-disk-fragmentation';
import {QueryVirtualDiskGeometry} from './methods/query-virtual-disk-geometry';
import {QueryVirtualDiskUuid} from './methods/query-virtual-disk-uuid';
import {ReleaseManagedSnapshot} from './methods/release-managed-snapshot';
import {SetVirtualDiskUuid} from './methods/set-virtual-disk-uuid';
import {ShrinkVirtualDisk_Task} from './methods/shrink-virtual-disk_task';
import {ZeroFillVirtualDisk_Task} from './methods/zero-fill-virtual-disk_task';
import {CreateChildVM_Task} from './methods/create-child-v-m_task';
import {CreateResourcePool} from './methods/create-resource-pool';
import {CreateVApp} from './methods/create-v-app';
import {DestroyChildren} from './methods/destroy-children';
import {ImportVApp} from './methods/import-v-app';
import {MoveIntoResourcePool} from './methods/move-into-resource-pool';
import {QueryResourceConfigOption} from './methods/query-resource-config-option';
import {RefreshRuntime} from './methods/refresh-runtime';
import {RegisterChildVM_Task} from './methods/register-child-v-m_task';
import {UpdateChildResourceConfiguration} from './methods/update-child-resource-configuration';
import {UpdateConfig} from './methods/update-config';
import {CreateCollectorForEvents} from './methods/create-collector-for-events';
import {LogUserEvent} from './methods/log-user-event';
import {PostEvent} from './methods/post-event';
import {QueryEvents} from './methods/query-events';
import {RetrieveArgumentDescription} from './methods/retrieve-argument-description';
import {CreateCollectorForTasks} from './methods/create-collector-for-tasks';
import {CreateTask} from './methods/create-task';
import {CreateContainerView} from './methods/create-container-view';
import {CreateInventoryView} from './methods/create-inventory-view';
import {CreateListView} from './methods/create-list-view';
import {CreateListViewFromView} from './methods/create-list-view-from-view';
import {CreateDescriptor} from './methods/create-descriptor';
import {CreateImportSpec} from './methods/create-import-spec';
import {ParseDescriptor} from './methods/parse-descriptor';
import {ValidateHost} from './methods/validate-host';
import {CreateDiagnosticPartition} from './methods/create-diagnostic-partition';
import {QueryAvailablePartition} from './methods/query-available-partition';
import {QueryPartitionCreateDesc} from './methods/query-partition-create-desc';
import {QueryPartitionCreateOptions} from './methods/query-partition-create-options';
import {SelectActivePartition} from './methods/select-active-partition';
import {CreateNvdimmNamespace_Task} from './methods/create-nvdimm-namespace_task';
import {CreateNvdimmPMemNamespace_Task} from './methods/create-nvdimm-p-mem-namespace_task';
import {DeleteNvdimmBlockNamespaces_Task} from './methods/delete-nvdimm-block-namespaces_task';
import {DeleteNvdimmNamespace_Task} from './methods/delete-nvdimm-namespace_task';
import {CreateObjectScheduledTask} from './methods/create-object-scheduled-task';
import {CreateScheduledTask} from './methods/create-scheduled-task';
import {RetrieveEntityScheduledTask} from './methods/retrieve-entity-scheduled-task';
import {RetrieveObjectScheduledTask} from './methods/retrieve-object-scheduled-task';
import {CreatePerfInterval} from './methods/create-perf-interval';
import {QueryAvailablePerfMetric} from './methods/query-available-perf-metric';
import {QueryPerf} from './methods/query-perf';
import {QueryPerfComposite} from './methods/query-perf-composite';
import {QueryPerfCounter} from './methods/query-perf-counter';
import {QueryPerfCounterByLevel} from './methods/query-perf-counter-by-level';
import {QueryPerfProviderSummary} from './methods/query-perf-provider-summary';
import {RemovePerfInterval} from './methods/remove-perf-interval';
import {ResetCounterLevelMapping} from './methods/reset-counter-level-mapping';
import {UpdateCounterLevelMapping} from './methods/update-counter-level-mapping';
import {UpdatePerfInterval} from './methods/update-perf-interval';
import {CreateProfile} from './methods/create-profile';
import {FindAssociatedProfile} from './methods/find-associated-profile';
import {QueryPolicyMetadata} from './methods/query-policy-metadata';
import {CreateRegistryKeyInGuest} from './methods/create-registry-key-in-guest';
import {DeleteRegistryKeyInGuest} from './methods/delete-registry-key-in-guest';
import {DeleteRegistryValueInGuest} from './methods/delete-registry-value-in-guest';
import {ListRegistryKeysInGuest} from './methods/list-registry-keys-in-guest';
import {ListRegistryValuesInGuest} from './methods/list-registry-values-in-guest';
import {SetRegistryValueInGuest} from './methods/set-registry-value-in-guest';
import {CurrentTime} from './methods/current-time';
import {QueryVMotionCompatibility} from './methods/query-v-motion-compatibility';
import {RetrieveProductComponents} from './methods/retrieve-product-components';
import {RetrieveServiceContent} from './methods/retrieve-service-content';
import {ValidateMigration} from './methods/validate-migration';
import {DatastoreEnterMaintenanceMode} from './methods/datastore-enter-maintenance-mode';
import {DatastoreExitMaintenanceMode_Task} from './methods/datastore-exit-maintenance-mode_task';
import {DestroyDatastore} from './methods/destroy-datastore';
import {RefreshDatastore} from './methods/refresh-datastore';
import {RefreshDatastoreStorageInfo} from './methods/refresh-datastore-storage-info';
import {RenameDatastore} from './methods/rename-datastore';
import {UpdateVirtualMachineFiles_Task} from './methods/update-virtual-machine-files_task';
import {UpdateVVolVirtualMachineFiles_Task} from './methods/update-v-vol-virtual-machine-files_task';
import {DeleteFile} from './methods/delete-file';
import {SearchDatastore_Task} from './methods/search-datastore_task';
import {SearchDatastoreSubFolders_Task} from './methods/search-datastore-sub-folders_task';
import {DeleteHostSpecification} from './methods/delete-host-specification';
import {DeleteHostSubSpecification} from './methods/delete-host-sub-specification';
import {HostSpecGetUpdatedHosts} from './methods/host-spec-get-updated-hosts';
import {RetrieveHostSpecification} from './methods/retrieve-host-specification';
import {UpdateHostSpecification} from './methods/update-host-specification';
import {UpdateHostSubSpecification} from './methods/update-host-sub-specification';
import {DeselectVnic} from './methods/deselect-vnic';
import {SelectVnic} from './methods/select-vnic';
import {UpdateIpConfig} from './methods/update-ip-config';
import {DeselectVnicForNicType} from './methods/deselect-vnic-for-nic-type';
import {QueryNetConfig} from './methods/query-net-config';
import {SelectVnicForNicType} from './methods/select-vnic-for-nic-type';
import {Destroy_Task} from './methods/destroy_task';
import {Reload} from './methods/reload';
import {Rename_Task} from './methods/rename_task';
import {DestroyCollector} from './methods/destroy-collector';
import {ResetCollector} from './methods/reset-collector';
import {RewindCollector} from './methods/rewind-collector';
import {SetCollectorPageSize} from './methods/set-collector-page-size';
import {DestroyNetwork} from './methods/destroy-network';
import {DestroyPropertyFilter} from './methods/destroy-property-filter';
import {DestroyView} from './methods/destroy-view';
import {DisableHyperThreading} from './methods/disable-hyper-threading';
import {EnableHyperThreading} from './methods/enable-hyper-threading';
import {DisableRuleset} from './methods/disable-ruleset';
import {EnableRuleset} from './methods/enable-ruleset';
import {RefreshFirewall} from './methods/refresh-firewall';
import {UpdateDefaultPolicy} from './methods/update-default-policy';
import {UpdateRuleset} from './methods/update-ruleset';
import {DisableSmartCardAuthentication} from './methods/disable-smart-card-authentication';
import {EnableSmartCardAuthentication} from './methods/enable-smart-card-authentication';
import {ImportCertificateForCAM_Task} from './methods/import-certificate-for-c-a-m_task';
import {InstallSmartCardTrustAnchor} from './methods/install-smart-card-trust-anchor';
import {JoinDomain_Task} from './methods/join-domain_task';
import {JoinDomainWithCAM_Task} from './methods/join-domain-with-c-a-m_task';
import {LeaveCurrentDomain_Task} from './methods/leave-current-domain_task';
import {ListSmartCardTrustAnchors} from './methods/list-smart-card-trust-anchors';
import {RemoveSmartCardTrustAnchor} from './methods/remove-smart-card-trust-anchor';
import {RemoveSmartCardTrustAnchorByFingerprint} from './methods/remove-smart-card-trust-anchor-by-fingerprint';
import {ReplaceSmartCardTrustAnchors} from './methods/replace-smart-card-trust-anchors';
import {DVPortgroupRollback_Task} from './methods/d-v-portgroup-rollback_task';
import {ReconfigureDVPortgroup_Task} from './methods/reconfigure-d-v-portgroup_task';
import {DVSManagerExportEntity_Task} from './methods/d-v-s-manager-export-entity_task';
import {DVSManagerImportEntity_Task} from './methods/d-v-s-manager-import-entity_task';
import {DVSManagerLookupDvPortGroup} from './methods/d-v-s-manager-lookup-dv-port-group';
import {QueryAvailableDvsSpec} from './methods/query-available-dvs-spec';
import {QueryCompatibleHostForExistingDvs} from './methods/query-compatible-host-for-existing-dvs';
import {QueryCompatibleHostForNewDvs} from './methods/query-compatible-host-for-new-dvs';
import {QueryDvsByUuid} from './methods/query-dvs-by-uuid';
import {QueryDvsCheckCompatibility} from './methods/query-dvs-check-compatibility';
import {QueryDvsCompatibleHostSpec} from './methods/query-dvs-compatible-host-spec';
import {QueryDvsConfigTarget} from './methods/query-dvs-config-target';
import {QueryDvsFeatureCapability} from './methods/query-dvs-feature-capability';
import {RectifyDvsOnHost_Task} from './methods/rectify-dvs-on-host_task';
import {EstimateDatabaseSize} from './methods/estimate-database-size';
import {EsxAgentHostManagerUpdateConfig} from './methods/esx-agent-host-manager-update-config';
import {ExecuteHostProfile} from './methods/execute-host-profile';
import {HostProfileResetValidationState} from './methods/host-profile-reset-validation-state';
import {UpdateHostProfile} from './methods/update-host-profile';
import {UpdateReferenceHost} from './methods/update-reference-host';
import {ExecuteSimpleCommand} from './methods/execute-simple-command';
import {ExportSnapshot} from './methods/export-snapshot';
import {RemoveSnapshot_Task} from './methods/remove-snapshot_task';
import {RenameSnapshot} from './methods/rename-snapshot';
import {RevertToSnapshot_Task} from './methods/revert-to-snapshot_task';
import {fetchSoftwarePackages} from './methods/fetch-software-packages';
import {HostImageConfigGetAcceptance} from './methods/host-image-config-get-acceptance';
import {HostImageConfigGetProfile} from './methods/host-image-config-get-profile';
import {installDate} from './methods/install-date';
import {UpdateHostImageAcceptanceLevel} from './methods/update-host-image-acceptance-level';
import {FindAllByDnsName} from './methods/find-all-by-dns-name';
import {FindAllByIp} from './methods/find-all-by-ip';
import {FindAllByUuid} from './methods/find-all-by-uuid';
import {FindByDatastorePath} from './methods/find-by-datastore-path';
import {FindByDnsName} from './methods/find-by-dns-name';
import {FindByInventoryPath} from './methods/find-by-inventory-path';
import {FindByIp} from './methods/find-by-ip';
import {FindByUuid} from './methods/find-by-uuid';
import {FindChild} from './methods/find-child';
import {FindExtension} from './methods/find-extension';
import {GetPublicKey} from './methods/get-public-key';
import {QueryExtensionIpAllocationUsage} from './methods/query-extension-ip-allocation-usage';
import {QueryManagedBy} from './methods/query-managed-by';
import {RegisterExtension} from './methods/register-extension';
import {SetExtensionCertificate} from './methods/set-extension-certificate';
import {SetPublicKey} from './methods/set-public-key';
import {UnregisterExtension} from './methods/unregister-extension';
import {UpdateExtension} from './methods/update-extension';
import {GenerateCertificateSigningRequest} from './methods/generate-certificate-signing-request';
import {GenerateCertificateSigningRequestByDn} from './methods/generate-certificate-signing-request-by-dn';
import {InstallServerCertificate} from './methods/install-server-certificate';
import {ListCACertificateRevocationLists} from './methods/list-c-a-certificate-revocation-lists';
import {ListCACertificates} from './methods/list-c-a-certificates';
import {ReplaceCACertificatesAndCRLs} from './methods/replace-c-a-certificates-and-c-r-ls';
import {GenerateClientCsr} from './methods/generate-client-csr';
import {GenerateKey} from './methods/generate-key';
import {GenerateSelfSignedClientCert} from './methods/generate-self-signed-client-cert';
import {ListKmipServers} from './methods/list-kmip-servers';
import {MarkDefault} from './methods/mark-default';
import {QueryCryptoKeyStatus} from './methods/query-crypto-key-status';
import {RegisterKmipServer} from './methods/register-kmip-server';
import {RemoveKmipServer} from './methods/remove-kmip-server';
import {RetrieveClientCert} from './methods/retrieve-client-cert';
import {RetrieveClientCsr} from './methods/retrieve-client-csr';
import {RetrieveKmipServerCert} from './methods/retrieve-kmip-server-cert';
import {RetrieveKmipServersStatus_Task} from './methods/retrieve-kmip-servers-status_task';
import {RetrieveSelfSignedClientCert} from './methods/retrieve-self-signed-client-cert';
import {UpdateKmipServer} from './methods/update-kmip-server';
import {UpdateKmsSignedCsrClientCert} from './methods/update-kms-signed-csr-client-cert';
import {UpdateSelfSignedClientCert} from './methods/update-self-signed-client-cert';
import {UploadClientCert} from './methods/upload-client-cert';
import {UploadKmipServerCert} from './methods/upload-kmip-server-cert';
import {getClusterMode} from './methods/get-cluster-mode';
import {GetVchaClusterHealth} from './methods/get-vcha-cluster-health';
import {initiateFailover_Task} from './methods/initiate-failover_task';
import {setClusterMode_Task} from './methods/set-cluster-mode_task';
import {HostClearVStorageObjectControlFlags} from './methods/host-clear-v-storage-object-control-flags';
import {HostCloneVStorageObject_Task} from './methods/host-clone-v-storage-object_task';
import {HostCreateDisk_Task} from './methods/host-create-disk_task';
import {HostDeleteVStorageObject_Task} from './methods/host-delete-v-storage-object_task';
import {HostExtendDisk_Task} from './methods/host-extend-disk_task';
import {HostInflateDisk_Task} from './methods/host-inflate-disk_task';
import {HostListVStorageObject} from './methods/host-list-v-storage-object';
import {HostReconcileDatastoreInventory_Task} from './methods/host-reconcile-datastore-inventory_task';
import {HostRegisterDisk} from './methods/host-register-disk';
import {HostRelocateVStorageObject_Task} from './methods/host-relocate-v-storage-object_task';
import {HostRenameVStorageObject} from './methods/host-rename-v-storage-object';
import {HostRetrieveVStorageInfrastructureObjectPolicy} from './methods/host-retrieve-v-storage-infrastructure-object-policy';
import {HostRetrieveVStorageObject} from './methods/host-retrieve-v-storage-object';
import {HostRetrieveVStorageObjectMetadata} from './methods/host-retrieve-v-storage-object-metadata';
import {HostRetrieveVStorageObjectMetadataValue} from './methods/host-retrieve-v-storage-object-metadata-value';
import {HostRetrieveVStorageObjectState} from './methods/host-retrieve-v-storage-object-state';
import {HostScheduleReconcileDatastoreInventory} from './methods/host-schedule-reconcile-datastore-inventory';
import {HostSetVStorageObjectControlFlags} from './methods/host-set-v-storage-object-control-flags';
import {HostUpdateVStorageObjectMetadata_Task} from './methods/host-update-v-storage-object-metadata_task';
import {HostVStorageObjectCreateDiskFromSnapshot_Task} from './methods/host-v-storage-object-create-disk-from-snapshot_task';
import {HostVStorageObjectCreateSnapshot_Task} from './methods/host-v-storage-object-create-snapshot_task';
import {HostVStorageObjectDeleteSnapshot_Task} from './methods/host-v-storage-object-delete-snapshot_task';
import {HostVStorageObjectRetrieveSnapshotInfo} from './methods/host-v-storage-object-retrieve-snapshot-info';
import {HostVStorageObjectRevert_Task} from './methods/host-v-storage-object-revert_task';
import {HttpNfcLeaseAbort} from './methods/http-nfc-lease-abort';
import {HttpNfcLeaseComplete} from './methods/http-nfc-lease-complete';
import {HttpNfcLeaseGetManifest} from './methods/http-nfc-lease-get-manifest';
import {HttpNfcLeaseProgress} from './methods/http-nfc-lease-progress';
import {HttpNfcLeasePullFromUrls_Task} from './methods/http-nfc-lease-pull-from-urls_task';
import {HttpNfcLeaseSetManifestChecksumType} from './methods/http-nfc-lease-set-manifest-checksum-type';
import {InstallIoFilter_Task} from './methods/install-io-filter_task';
import {QueryDisksUsingFilter} from './methods/query-disks-using-filter';
import {QueryIoFilterInfo} from './methods/query-io-filter-info';
import {QueryIoFilterIssues} from './methods/query-io-filter-issues';
import {ResolveInstallationErrorsOnCluster_Task} from './methods/resolve-installation-errors-on-cluster_task';
import {ResolveInstallationErrorsOnHost_Task} from './methods/resolve-installation-errors-on-host_task';
import {UninstallIoFilter_Task} from './methods/uninstall-io-filter_task';
import {UpgradeIoFilter_Task} from './methods/upgrade-io-filter_task';
import {IsSharedGraphicsActive} from './methods/is-shared-graphics-active';
import {RefreshGraphicsManager} from './methods/refresh-graphics-manager';
import {UpdateGraphicsConfig} from './methods/update-graphics-config';
import {ListProcessesInGuest} from './methods/list-processes-in-guest';
import {ReadEnvironmentVariableInGuest} from './methods/read-environment-variable-in-guest';
import {StartProgramInGuest} from './methods/start-program-in-guest';
import {TerminateProcessInGuest} from './methods/terminate-process-in-guest';
import {LookupVmOverheadMemory} from './methods/lookup-vm-overhead-memory';
import {ModifyListView} from './methods/modify-list-view';
import {ResetListView} from './methods/reset-list-view';
import {ResetListViewFromView} from './methods/reset-list-view-from-view';
import {PerformVsanUpgrade_Task} from './methods/perform-vsan-upgrade_task';
import {PerformVsanUpgradePreflightCheck} from './methods/perform-vsan-upgrade-preflight-check';
import {QueryVsanUpgradeStatus} from './methods/query-vsan-upgrade-status';
import {QueryAssignedLicenses} from './methods/query-assigned-licenses';
import {RemoveAssignedLicense} from './methods/remove-assigned-license';
import {UpdateAssignedLicense} from './methods/update-assigned-license';
import {QueryAvailableTimeZones} from './methods/query-available-time-zones';
import {QueryDateTime} from './methods/query-date-time';
import {RefreshDateTimeSystem} from './methods/refresh-date-time-system';
import {UpdateDateTime} from './methods/update-date-time';
import {UpdateDateTimeConfig} from './methods/update-date-time-config';
import {QueryBootDevices} from './methods/query-boot-devices';
import {UpdateBootDevice} from './methods/update-boot-device';
import {QueryConfigOption} from './methods/query-config-option';
import {QueryConfigOptionDescriptor} from './methods/query-config-option-descriptor';
import {QueryConfigOptionEx} from './methods/query-config-option-ex';
import {QueryConfigTarget} from './methods/query-config-target';
import {QueryTargetCapabilities} from './methods/query-target-capabilities';
import {QueryConfiguredModuleOptionString} from './methods/query-configured-module-option-string';
import {QueryModules} from './methods/query-modules';
import {UpdateModuleOptionString} from './methods/update-module-option-string';
import {QueryHostsWithAttachedLun} from './methods/query-hosts-with-attached-lun';
import {QueryOptions} from './methods/query-options';
import {UpdateOptions} from './methods/update-options';
import {QueryServiceList} from './methods/query-service-list';
import {ReadNextEvents} from './methods/read-next-events';
import {ReadPreviousEvents} from './methods/read-previous-events';
import {ReadNextTasks} from './methods/read-next-tasks';
import {ReadPreviousTasks} from './methods/read-previous-tasks';
import {ReconfigureAlarm} from './methods/reconfigure-alarm';
import {RemoveAlarm} from './methods/remove-alarm';
import {ReconfigureComputeResource_Task} from './methods/reconfigure-compute-resource_task';
import {ReconfigureScheduledTask} from './methods/reconfigure-scheduled-task';
import {RemoveScheduledTask} from './methods/remove-scheduled-task';
import {RunScheduledTask} from './methods/run-scheduled-task';
import {ReconfigureServiceConsoleReservation} from './methods/reconfigure-service-console-reservation';
import {ReconfigureVirtualMachineReservation} from './methods/reconfigure-virtual-machine-reservation';
import {ReconfigureSnmpAgent} from './methods/reconfigure-snmp-agent';
import {SendTestNotification} from './methods/send-test-notification';
import {Refresh} from './methods/refresh';
import {UpdatePassthruConfig} from './methods/update-passthru-config';
import {RefreshServices} from './methods/refresh-services';
import {RestartService} from './methods/restart-service';
import {StartService} from './methods/start-service';
import {StopService} from './methods/stop-service';
import {UninstallService} from './methods/uninstall-service';
import {UpdateServicePolicy} from './methods/update-service-policy';
import {RetrieveUserGroups} from './methods/retrieve-user-groups';
import {setCustomValue} from './methods/set-custom-value';
import {UpdateClusterProfile} from './methods/update-cluster-profile';
import {UpdateDVSLacpGroupConfig_Task} from './methods/update-d-v-s-lacp-group-config_task';

export type VmwareSdkFunctionsInput<Action> =
  Action extends 'AbandonHciWorkflow' ? AbandonHciWorkflow :
  Action extends 'AddHost_Task' ? AddHost_Task :
  Action extends 'ApplyRecommendation' ? ApplyRecommendation :
  Action extends 'CancelRecommendation' ? CancelRecommendation :
  Action extends 'ClusterEnterMaintenanceMode' ? ClusterEnterMaintenanceMode :
  Action extends 'ConfigureHCI_Task' ? ConfigureHCI_Task :
  Action extends 'EvcManager' ? EvcManager :
  Action extends 'ExtendHCI_Task' ? ExtendHCI_Task :
  Action extends 'FindRulesForVm' ? FindRulesForVm :
  Action extends 'GetResourceUsage' ? GetResourceUsage :
  Action extends 'MoveHostInto_Task' ? MoveHostInto_Task :
  Action extends 'MoveInto_Task' ? MoveInto_Task :
  Action extends 'PlaceVm' ? PlaceVm :
  Action extends 'RecommendHostsForVm' ? RecommendHostsForVm :
  Action extends 'ReconfigureCluster_Task' ? ReconfigureCluster_Task :
  Action extends 'RefreshRecommendation' ? RefreshRecommendation :
  Action extends 'RetrieveDasAdvancedRuntimeInfo' ? RetrieveDasAdvancedRuntimeInfo :
  Action extends 'StampAllRulesWithUuid_Task' ? StampAllRulesWithUuid_Task :
  Action extends 'ValidateHCIConfiguration' ? ValidateHCIConfiguration :
  Action extends 'AbdicateDomOwnership' ? AbdicateDomOwnership :
  Action extends 'CanProvisionObjects' ? CanProvisionObjects :
  Action extends 'DeleteVsanObjects' ? DeleteVsanObjects :
  Action extends 'GetVsanObjExtAttrs' ? GetVsanObjExtAttrs :
  Action extends 'QueryCmmds' ? QueryCmmds :
  Action extends 'QueryObjectsOnPhysicalVsanDisk' ? QueryObjectsOnPhysicalVsanDisk :
  Action extends 'QueryPhysicalVsanDisks' ? QueryPhysicalVsanDisks :
  Action extends 'QuerySyncingVsanObjects' ? QuerySyncingVsanObjects :
  Action extends 'QueryVsanObjects' ? QueryVsanObjects :
  Action extends 'QueryVsanObjectUuidsByFilter' ? QueryVsanObjectUuidsByFilter :
  Action extends 'QueryVsanStatistics' ? QueryVsanStatistics :
  Action extends 'ReconfigurationSatisfiable' ? ReconfigurationSatisfiable :
  Action extends 'ReconfigureDomObject' ? ReconfigureDomObject :
  Action extends 'RunVsanPhysicalDiskDiagnostics' ? RunVsanPhysicalDiskDiagnostics :
  Action extends 'UpgradeVsanObjects' ? UpgradeVsanObjects :
  Action extends 'AcknowledgeAlarm' ? AcknowledgeAlarm :
  Action extends 'AreAlarmActionsEnabled' ? AreAlarmActionsEnabled :
  Action extends 'ClearTriggeredAlarms' ? ClearTriggeredAlarms :
  Action extends 'CreateAlarm' ? CreateAlarm :
  Action extends 'EnableAlarmActions' ? EnableAlarmActions :
  Action extends 'GetAlarm' ? GetAlarm :
  Action extends 'GetAlarmState' ? GetAlarmState :
  Action extends 'AcquireCimServicesTicket' ? AcquireCimServicesTicket :
  Action extends 'ConfigureCryptoKey' ? ConfigureCryptoKey :
  Action extends 'DisconnectHost_Task' ? DisconnectHost_Task :
  Action extends 'EnableCrypto' ? EnableCrypto :
  Action extends 'EnterLockdownMode' ? EnterLockdownMode :
  Action extends 'EnterMaintenanceMode_Task' ? EnterMaintenanceMode_Task :
  Action extends 'ExitLockdownMode' ? ExitLockdownMode :
  Action extends 'ExitMaintenanceMode_Task' ? ExitMaintenanceMode_Task :
  Action extends 'PowerDownHostToStandBy_Task' ? PowerDownHostToStandBy_Task :
  Action extends 'PowerUpHostFromStandBy_Task' ? PowerUpHostFromStandBy_Task :
  Action extends 'PrepareCrypto' ? PrepareCrypto :
  Action extends 'QueryHostConnectionInfo' ? QueryHostConnectionInfo :
  Action extends 'QueryMemoryOverhead' ? QueryMemoryOverhead :
  Action extends 'QueryMemoryOverheadEx' ? QueryMemoryOverheadEx :
  Action extends 'QueryProductLockerLocation' ? QueryProductLockerLocation :
  Action extends 'QueryTpmAttestationReport' ? QueryTpmAttestationReport :
  Action extends 'RebootHost_Task' ? RebootHost_Task :
  Action extends 'ReconfigureHostForDAS_Task' ? ReconfigureHostForDAS_Task :
  Action extends 'ReconnectHost_Task' ? ReconnectHost_Task :
  Action extends 'RetrieveHardwareUptime' ? RetrieveHardwareUptime :
  Action extends 'ShutdownHost_Task' ? ShutdownHost_Task :
  Action extends 'UpdateFlags' ? UpdateFlags :
  Action extends 'UpdateIpmi' ? UpdateIpmi :
  Action extends 'UpdateProductLockerLocation_Task' ? UpdateProductLockerLocation_Task :
  Action extends 'UpdateSystemResources' ? UpdateSystemResources :
  Action extends 'UpdateSystemSwapConfiguration' ? UpdateSystemSwapConfiguration :
  Action extends 'AcquireCloneTicket' ? AcquireCloneTicket :
  Action extends 'AcquireGenericServiceTicket' ? AcquireGenericServiceTicket :
  Action extends 'AcquireLocalTicket' ? AcquireLocalTicket :
  Action extends 'CloneSession' ? CloneSession :
  Action extends 'ImpersonateUser' ? ImpersonateUser :
  Action extends 'Login' ? Login :
  Action extends 'LoginBySSPI' ? LoginBySSPI :
  Action extends 'LoginByToken' ? LoginByToken :
  Action extends 'LoginExtensionByCertificate' ? LoginExtensionByCertificate :
  Action extends 'LoginExtensionBySubjectName' ? LoginExtensionBySubjectName :
  Action extends 'Logout' ? Logout :
  Action extends 'SessionIsActive' ? SessionIsActive :
  Action extends 'SetLocale' ? SetLocale :
  Action extends 'TerminateSession' ? TerminateSession :
  Action extends 'UpdateServiceMessage' ? UpdateServiceMessage :
  Action extends 'AcquireCredentialsInGuest' ? AcquireCredentialsInGuest :
  Action extends 'ReleaseCredentialsInGuest' ? ReleaseCredentialsInGuest :
  Action extends 'ValidateCredentialsInGuest' ? ValidateCredentialsInGuest :
  Action extends 'AcquireMksTicket' ? AcquireMksTicket :
  Action extends 'AcquireTicket' ? AcquireTicket :
  Action extends 'AnswerVM' ? AnswerVM :
  Action extends 'ApplyEvcModeVM_Task' ? ApplyEvcModeVM_Task :
  Action extends 'AttachDisk_Task' ? AttachDisk_Task :
  Action extends 'CheckCustomizationSpec' ? CheckCustomizationSpec :
  Action extends 'CloneVM_Task' ? CloneVM_Task :
  Action extends 'ConsolidateVMDisks_Task' ? ConsolidateVMDisks_Task :
  Action extends 'CreateScreenshot_Task' ? CreateScreenshot_Task :
  Action extends 'CreateSecondaryVM_Task' ? CreateSecondaryVM_Task :
  Action extends 'CreateSecondaryVMEx_Task' ? CreateSecondaryVMEx_Task :
  Action extends 'CreateSnapshot_Task' ? CreateSnapshot_Task :
  Action extends 'CreateSnapshotEx_Task' ? CreateSnapshotEx_Task :
  Action extends 'CryptoUnlock_Task' ? CryptoUnlock_Task :
  Action extends 'CustomizeVM_Task' ? CustomizeVM_Task :
  Action extends 'DefragmentAllDisks' ? DefragmentAllDisks :
  Action extends 'DetachDisk_Task' ? DetachDisk_Task :
  Action extends 'DisableSecondaryVM_Task' ? DisableSecondaryVM_Task :
  Action extends 'EnableSecondaryVM_Task' ? EnableSecondaryVM_Task :
  Action extends 'EstimateStorageForConsolidateSnapshots_Task' ? EstimateStorageForConsolidateSnapshots_Task :
  Action extends 'ExportVm' ? ExportVm :
  Action extends 'ExtractOvfEnvironment' ? ExtractOvfEnvironment :
  Action extends 'InstantClone_Task' ? InstantClone_Task :
  Action extends 'MakePrimaryVM_Task' ? MakePrimaryVM_Task :
  Action extends 'MarkAsTemplate' ? MarkAsTemplate :
  Action extends 'MarkAsVirtualMachine' ? MarkAsVirtualMachine :
  Action extends 'MigrateVM_Task' ? MigrateVM_Task :
  Action extends 'MountToolsInstaller' ? MountToolsInstaller :
  Action extends 'PowerOffVM_Task' ? PowerOffVM_Task :
  Action extends 'PowerOnVM_Task' ? PowerOnVM_Task :
  Action extends 'PromoteDisks_Task' ? PromoteDisks_Task :
  Action extends 'PutUsbScanCodes' ? PutUsbScanCodes :
  Action extends 'QueryChangedDiskAreas' ? QueryChangedDiskAreas :
  Action extends 'QueryFaultToleranceCompatibility' ? QueryFaultToleranceCompatibility :
  Action extends 'QueryFaultToleranceCompatibilityEx' ? QueryFaultToleranceCompatibilityEx :
  Action extends 'QueryUnownedFiles' ? QueryUnownedFiles :
  Action extends 'RebootGuest' ? RebootGuest :
  Action extends 'ReconfigVM_Task' ? ReconfigVM_Task :
  Action extends 'RefreshStorageInfo' ? RefreshStorageInfo :
  Action extends 'reloadVirtualMachineFromPath_Task' ? reloadVirtualMachineFromPath_Task :
  Action extends 'RelocateVM_Task' ? RelocateVM_Task :
  Action extends 'RemoveAllSnapshots_Task' ? RemoveAllSnapshots_Task :
  Action extends 'ResetGuestInformation' ? ResetGuestInformation :
  Action extends 'ResetVM_Task' ? ResetVM_Task :
  Action extends 'RevertToCurrentSnapshot_Task' ? RevertToCurrentSnapshot_Task :
  Action extends 'SendNMI' ? SendNMI :
  Action extends 'SetDisplayTopology' ? SetDisplayTopology :
  Action extends 'SetScreenResolution' ? SetScreenResolution :
  Action extends 'ShutdownGuest' ? ShutdownGuest :
  Action extends 'StandbyGuest' ? StandbyGuest :
  Action extends 'StartRecording_Task' ? StartRecording_Task :
  Action extends 'StartReplaying_Task' ? StartReplaying_Task :
  Action extends 'StopRecording_Task' ? StopRecording_Task :
  Action extends 'StopReplaying_Task' ? StopReplaying_Task :
  Action extends 'SuspendVM_Task' ? SuspendVM_Task :
  Action extends 'TerminateFaultTolerantVM_Task' ? TerminateFaultTolerantVM_Task :
  Action extends 'TerminateVM' ? TerminateVM :
  Action extends 'TurnOffFaultToleranceForVM_Task' ? TurnOffFaultToleranceForVM_Task :
  Action extends 'UnmountToolsInstaller' ? UnmountToolsInstaller :
  Action extends 'UnregisterVM' ? UnregisterVM :
  Action extends 'UpgradeTools_Task' ? UpgradeTools_Task :
  Action extends 'UpgradeVM_Task' ? UpgradeVM_Task :
  Action extends 'AddAuthorizationRole' ? AddAuthorizationRole :
  Action extends 'FetchUserPrivilegeOnEntities' ? FetchUserPrivilegeOnEntities :
  Action extends 'HasPrivilegeOnEntities' ? HasPrivilegeOnEntities :
  Action extends 'HasPrivilegeOnEntity' ? HasPrivilegeOnEntity :
  Action extends 'HasUserPrivilegeOnEntities' ? HasUserPrivilegeOnEntities :
  Action extends 'MergePermissions' ? MergePermissions :
  Action extends 'RemoveAuthorizationRole' ? RemoveAuthorizationRole :
  Action extends 'RemoveEntityPermission' ? RemoveEntityPermission :
  Action extends 'ResetEntityPermissions' ? ResetEntityPermissions :
  Action extends 'RetrieveAllPermissions' ? RetrieveAllPermissions :
  Action extends 'RetrieveEntityPermissions' ? RetrieveEntityPermissions :
  Action extends 'RetrieveRolePermissions' ? RetrieveRolePermissions :
  Action extends 'SetEntityPermissions' ? SetEntityPermissions :
  Action extends 'UpdateAuthorizationRole' ? UpdateAuthorizationRole :
  Action extends 'AddCustomFieldDef' ? AddCustomFieldDef :
  Action extends 'RemoveCustomFieldDef' ? RemoveCustomFieldDef :
  Action extends 'RenameCustomFieldDef' ? RenameCustomFieldDef :
  Action extends 'SetField' ? SetField :
  Action extends 'AddDisks_Task' ? AddDisks_Task :
  Action extends 'EvacuateVsanNode_Task' ? EvacuateVsanNode_Task :
  Action extends 'InitializeDisks_Task' ? InitializeDisks_Task :
  Action extends 'QueryDisksForVsan' ? QueryDisksForVsan :
  Action extends 'QueryHostStatus' ? QueryHostStatus :
  Action extends 'RecommissionVsanNode_Task' ? RecommissionVsanNode_Task :
  Action extends 'RemoveDisk_Task' ? RemoveDisk_Task :
  Action extends 'RemoveDiskMapping_Task' ? RemoveDiskMapping_Task :
  Action extends 'UnmountDiskMapping_Task' ? UnmountDiskMapping_Task :
  Action extends 'UpdateVsan_Task' ? UpdateVsan_Task :
  Action extends 'AddDVPortgroup_Task' ? AddDVPortgroup_Task :
  Action extends 'AddNetworkResourcePool' ? AddNetworkResourcePool :
  Action extends 'CreateDVPortgroup_Task' ? CreateDVPortgroup_Task :
  Action extends 'DvsReconfigureVmVnicNetworkResourcePool_Task' ? DvsReconfigureVmVnicNetworkResourcePool_Task :
  Action extends 'DVSRollback_Task' ? DVSRollback_Task :
  Action extends 'EnableNetworkResourceManagement' ? EnableNetworkResourceManagement :
  Action extends 'FetchDVPortKeys' ? FetchDVPortKeys :
  Action extends 'FetchDVPorts' ? FetchDVPorts :
  Action extends 'LookupDvPortGroup' ? LookupDvPortGroup :
  Action extends 'MergeDvs_Task' ? MergeDvs_Task :
  Action extends 'MoveDVPort_Task' ? MoveDVPort_Task :
  Action extends 'PerformDvsProductSpecOperation_Task' ? PerformDvsProductSpecOperation_Task :
  Action extends 'QueryUsedVlanIdInDvs' ? QueryUsedVlanIdInDvs :
  Action extends 'ReconfigureDVPort_Task' ? ReconfigureDVPort_Task :
  Action extends 'ReconfigureDvs_Task' ? ReconfigureDvs_Task :
  Action extends 'RectifyDvsHost_Task' ? RectifyDvsHost_Task :
  Action extends 'RefreshDVPortState' ? RefreshDVPortState :
  Action extends 'RemoveNetworkResourcePool' ? RemoveNetworkResourcePool :
  Action extends 'UpdateDvsCapability' ? UpdateDvsCapability :
  Action extends 'UpdateDVSHealthCheckConfig_Task' ? UpdateDVSHealthCheckConfig_Task :
  Action extends 'UpdateNetworkResourcePool' ? UpdateNetworkResourcePool :
  Action extends 'AddFilter' ? AddFilter :
  Action extends 'AddFilterEntities' ? AddFilterEntities :
  Action extends 'AddMonitoredEntities' ? AddMonitoredEntities :
  Action extends 'HasMonitoredEntity' ? HasMonitoredEntity :
  Action extends 'HasProvider' ? HasProvider :
  Action extends 'PostHealthUpdates' ? PostHealthUpdates :
  Action extends 'QueryFilterEntities' ? QueryFilterEntities :
  Action extends 'QueryFilterInfoIds' ? QueryFilterInfoIds :
  Action extends 'QueryFilterList' ? QueryFilterList :
  Action extends 'QueryFilterName' ? QueryFilterName :
  Action extends 'QueryHealthUpdateInfos' ? QueryHealthUpdateInfos :
  Action extends 'QueryHealthUpdates' ? QueryHealthUpdates :
  Action extends 'QueryMonitoredEntities' ? QueryMonitoredEntities :
  Action extends 'QueryProviderList' ? QueryProviderList :
  Action extends 'QueryProviderName' ? QueryProviderName :
  Action extends 'QueryUnmonitoredHosts' ? QueryUnmonitoredHosts :
  Action extends 'RegisterHealthUpdateProvider' ? RegisterHealthUpdateProvider :
  Action extends 'RemoveFilter' ? RemoveFilter :
  Action extends 'RemoveFilterEntities' ? RemoveFilterEntities :
  Action extends 'RemoveMonitoredEntities' ? RemoveMonitoredEntities :
  Action extends 'UnregisterHealthUpdateProvider' ? UnregisterHealthUpdateProvider :
  Action extends 'AddGuestAlias' ? AddGuestAlias :
  Action extends 'ListGuestAliases' ? ListGuestAliases :
  Action extends 'ListGuestMappedAliases' ? ListGuestMappedAliases :
  Action extends 'RemoveGuestAlias' ? RemoveGuestAlias :
  Action extends 'RemoveGuestAliasByCert' ? RemoveGuestAliasByCert :
  Action extends 'AddInternetScsiSendTargets' ? AddInternetScsiSendTargets :
  Action extends 'AddInternetScsiStaticTargets' ? AddInternetScsiStaticTargets :
  Action extends 'AttachScsiLun' ? AttachScsiLun :
  Action extends 'AttachScsiLunEx_Task' ? AttachScsiLunEx_Task :
  Action extends 'AttachVmfsExtent' ? AttachVmfsExtent :
  Action extends 'ChangeNFSUserPassword' ? ChangeNFSUserPassword :
  Action extends 'ClearNFSUser' ? ClearNFSUser :
  Action extends 'ComputeDiskPartitionInfo' ? ComputeDiskPartitionInfo :
  Action extends 'ComputeDiskPartitionInfoForResize' ? ComputeDiskPartitionInfoForResize :
  Action extends 'DeleteScsiLunState' ? DeleteScsiLunState :
  Action extends 'DeleteVffsVolumeState' ? DeleteVffsVolumeState :
  Action extends 'DeleteVmfsVolumeState' ? DeleteVmfsVolumeState :
  Action extends 'DestroyVffs' ? DestroyVffs :
  Action extends 'DetachScsiLun' ? DetachScsiLun :
  Action extends 'DetachScsiLunEx_Task' ? DetachScsiLunEx_Task :
  Action extends 'DisableMultipathPath' ? DisableMultipathPath :
  Action extends 'DiscoverFcoeHbas' ? DiscoverFcoeHbas :
  Action extends 'EnableMultipathPath' ? EnableMultipathPath :
  Action extends 'ExpandVmfsExtent' ? ExpandVmfsExtent :
  Action extends 'ExtendVffs' ? ExtendVffs :
  Action extends 'FormatVffs' ? FormatVffs :
  Action extends 'FormatVmfs' ? FormatVmfs :
  Action extends 'MarkAsLocal_Task' ? MarkAsLocal_Task :
  Action extends 'MarkAsNonLocal_Task' ? MarkAsNonLocal_Task :
  Action extends 'MarkAsNonSsd_Task' ? MarkAsNonSsd_Task :
  Action extends 'MarkAsSsd_Task' ? MarkAsSsd_Task :
  Action extends 'MarkForRemoval' ? MarkForRemoval :
  Action extends 'MarkPerenniallyReserved' ? MarkPerenniallyReserved :
  Action extends 'MarkPerenniallyReservedEx_Task' ? MarkPerenniallyReservedEx_Task :
  Action extends 'MountVffsVolume' ? MountVffsVolume :
  Action extends 'MountVmfsVolume' ? MountVmfsVolume :
  Action extends 'MountVmfsVolumeEx_Task' ? MountVmfsVolumeEx_Task :
  Action extends 'QueryAvailableSsds' ? QueryAvailableSsds :
  Action extends 'QueryNFSUser' ? QueryNFSUser :
  Action extends 'QueryPathSelectionPolicyOptions' ? QueryPathSelectionPolicyOptions :
  Action extends 'QueryStorageArrayTypePolicyOptions' ? QueryStorageArrayTypePolicyOptions :
  Action extends 'QueryUnresolvedVmfsVolume' ? QueryUnresolvedVmfsVolume :
  Action extends 'QueryVmfsConfigOption' ? QueryVmfsConfigOption :
  Action extends 'RefreshStorageSystem' ? RefreshStorageSystem :
  Action extends 'RemoveInternetScsiSendTargets' ? RemoveInternetScsiSendTargets :
  Action extends 'RemoveInternetScsiStaticTargets' ? RemoveInternetScsiStaticTargets :
  Action extends 'RescanAllHba' ? RescanAllHba :
  Action extends 'RescanHba' ? RescanHba :
  Action extends 'RescanVffs' ? RescanVffs :
  Action extends 'RescanVmfs' ? RescanVmfs :
  Action extends 'ResolveMultipleUnresolvedVmfsVolumes' ? ResolveMultipleUnresolvedVmfsVolumes :
  Action extends 'ResolveMultipleUnresolvedVmfsVolumesEx_Task' ? ResolveMultipleUnresolvedVmfsVolumesEx_Task :
  Action extends 'RetrieveDiskPartitionInfo' ? RetrieveDiskPartitionInfo :
  Action extends 'SetMultipathLunPolicy' ? SetMultipathLunPolicy :
  Action extends 'SetNFSUser' ? SetNFSUser :
  Action extends 'TurnDiskLocatorLedOff_Task' ? TurnDiskLocatorLedOff_Task :
  Action extends 'TurnDiskLocatorLedOn_Task' ? TurnDiskLocatorLedOn_Task :
  Action extends 'UnmapVmfsVolumeEx_Task' ? UnmapVmfsVolumeEx_Task :
  Action extends 'UnmountForceMountedVmfsVolume' ? UnmountForceMountedVmfsVolume :
  Action extends 'UnmountVffsVolume' ? UnmountVffsVolume :
  Action extends 'UnmountVmfsVolume' ? UnmountVmfsVolume :
  Action extends 'UnmountVmfsVolumeEx_Task' ? UnmountVmfsVolumeEx_Task :
  Action extends 'UpdateDiskPartitions' ? UpdateDiskPartitions :
  Action extends 'UpdateInternetScsiAdvancedOptions' ? UpdateInternetScsiAdvancedOptions :
  Action extends 'UpdateInternetScsiAlias' ? UpdateInternetScsiAlias :
  Action extends 'UpdateInternetScsiAuthenticationProperties' ? UpdateInternetScsiAuthenticationProperties :
  Action extends 'UpdateInternetScsiDigestProperties' ? UpdateInternetScsiDigestProperties :
  Action extends 'UpdateInternetScsiDiscoveryProperties' ? UpdateInternetScsiDiscoveryProperties :
  Action extends 'UpdateInternetScsiIPProperties' ? UpdateInternetScsiIPProperties :
  Action extends 'UpdateInternetScsiName' ? UpdateInternetScsiName :
  Action extends 'UpdateScsiLunDisplayName' ? UpdateScsiLunDisplayName :
  Action extends 'UpdateSoftwareInternetScsiEnabled' ? UpdateSoftwareInternetScsiEnabled :
  Action extends 'UpdateVmfsUnmapBandwidth' ? UpdateVmfsUnmapBandwidth :
  Action extends 'UpdateVmfsUnmapPriority' ? UpdateVmfsUnmapPriority :
  Action extends 'UpgradeVmfs' ? UpgradeVmfs :
  Action extends 'UpgradeVmLayout' ? UpgradeVmLayout :
  Action extends 'AddKey' ? AddKey :
  Action extends 'AddKeys' ? AddKeys :
  Action extends 'ListKeys' ? ListKeys :
  Action extends 'RemoveKey' ? RemoveKey :
  Action extends 'RemoveKeys' ? RemoveKeys :
  Action extends 'AddLicense' ? AddLicense :
  Action extends 'CheckLicenseFeature' ? CheckLicenseFeature :
  Action extends 'ConfigureLicenseSource' ? ConfigureLicenseSource :
  Action extends 'DecodeLicense' ? DecodeLicense :
  Action extends 'DisableFeature' ? DisableFeature :
  Action extends 'EnableFeature' ? EnableFeature :
  Action extends 'QueryLicenseSourceAvailability' ? QueryLicenseSourceAvailability :
  Action extends 'QueryLicenseUsage' ? QueryLicenseUsage :
  Action extends 'QuerySupportedFeatures' ? QuerySupportedFeatures :
  Action extends 'RemoveLicense' ? RemoveLicense :
  Action extends 'RemoveLicenseLabel' ? RemoveLicenseLabel :
  Action extends 'SetLicenseEdition' ? SetLicenseEdition :
  Action extends 'UpdateLicense' ? UpdateLicense :
  Action extends 'UpdateLicenseLabel' ? UpdateLicenseLabel :
  Action extends 'AddPortGroup' ? AddPortGroup :
  Action extends 'AddServiceConsoleVirtualNic' ? AddServiceConsoleVirtualNic :
  Action extends 'AddVirtualNic' ? AddVirtualNic :
  Action extends 'AddVirtualSwitch' ? AddVirtualSwitch :
  Action extends 'QueryNetworkHint' ? QueryNetworkHint :
  Action extends 'RefreshNetworkSystem' ? RefreshNetworkSystem :
  Action extends 'RemovePortGroup' ? RemovePortGroup :
  Action extends 'RemoveServiceConsoleVirtualNic' ? RemoveServiceConsoleVirtualNic :
  Action extends 'RemoveVirtualNic' ? RemoveVirtualNic :
  Action extends 'RemoveVirtualSwitch' ? RemoveVirtualSwitch :
  Action extends 'RestartServiceConsoleVirtualNic' ? RestartServiceConsoleVirtualNic :
  Action extends 'UpdateConsoleIpRouteConfig' ? UpdateConsoleIpRouteConfig :
  Action extends 'UpdateDnsConfig' ? UpdateDnsConfig :
  Action extends 'UpdateIpRouteConfig' ? UpdateIpRouteConfig :
  Action extends 'UpdateIpRouteTableConfig' ? UpdateIpRouteTableConfig :
  Action extends 'UpdateNetworkConfig' ? UpdateNetworkConfig :
  Action extends 'UpdatePhysicalNicLinkSpeed' ? UpdatePhysicalNicLinkSpeed :
  Action extends 'UpdatePortGroup' ? UpdatePortGroup :
  Action extends 'UpdateServiceConsoleVirtualNic' ? UpdateServiceConsoleVirtualNic :
  Action extends 'UpdateVirtualNic' ? UpdateVirtualNic :
  Action extends 'UpdateVirtualSwitch' ? UpdateVirtualSwitch :
  Action extends 'AddStandaloneHost_Task' ? AddStandaloneHost_Task :
  Action extends 'BatchAddHostsToCluster_Task' ? BatchAddHostsToCluster_Task :
  Action extends 'BatchAddStandaloneHosts_Task' ? BatchAddStandaloneHosts_Task :
  Action extends 'CreateCluster' ? CreateCluster :
  Action extends 'CreateClusterEx' ? CreateClusterEx :
  Action extends 'CreateDatacenter' ? CreateDatacenter :
  Action extends 'CreateDVS_Task' ? CreateDVS_Task :
  Action extends 'CreateFolder' ? CreateFolder :
  Action extends 'CreateStoragePod' ? CreateStoragePod :
  Action extends 'CreateVM_Task' ? CreateVM_Task :
  Action extends 'MoveIntoFolder_Task' ? MoveIntoFolder_Task :
  Action extends 'RegisterVM_Task' ? RegisterVM_Task :
  Action extends 'UnregisterAndDestroy_Task' ? UnregisterAndDestroy_Task :
  Action extends 'AllocateIpv4Address' ? AllocateIpv4Address :
  Action extends 'AllocateIpv6Address' ? AllocateIpv6Address :
  Action extends 'CreateIpPool' ? CreateIpPool :
  Action extends 'DestroyIpPool' ? DestroyIpPool :
  Action extends 'QueryIPAllocations' ? QueryIPAllocations :
  Action extends 'QueryIpPools' ? QueryIpPools :
  Action extends 'ReleaseIpAllocation' ? ReleaseIpAllocation :
  Action extends 'UpdateIpPool' ? UpdateIpPool :
  Action extends 'ApplyEntitiesConfig_Task' ? ApplyEntitiesConfig_Task :
  Action extends 'ApplyHostConfig_Task' ? ApplyHostConfig_Task :
  Action extends 'CheckAnswerFileStatus_Task' ? CheckAnswerFileStatus_Task :
  Action extends 'CompositeHostProfile_Task' ? CompositeHostProfile_Task :
  Action extends 'CreateDefaultProfile' ? CreateDefaultProfile :
  Action extends 'ExportAnswerFile_Task' ? ExportAnswerFile_Task :
  Action extends 'GenerateConfigTaskList' ? GenerateConfigTaskList :
  Action extends 'GenerateHostConfigTaskSpec_Task' ? GenerateHostConfigTaskSpec_Task :
  Action extends 'GenerateHostProfileTaskList_Task' ? GenerateHostProfileTaskList_Task :
  Action extends 'QueryAnswerFileStatus' ? QueryAnswerFileStatus :
  Action extends 'QueryHostProfileMetadata' ? QueryHostProfileMetadata :
  Action extends 'QueryProfileStructure' ? QueryProfileStructure :
  Action extends 'RetrieveAnswerFile' ? RetrieveAnswerFile :
  Action extends 'RetrieveAnswerFileForProfile' ? RetrieveAnswerFileForProfile :
  Action extends 'RetrieveHostCustomizations' ? RetrieveHostCustomizations :
  Action extends 'RetrieveHostCustomizationsForProfile' ? RetrieveHostCustomizationsForProfile :
  Action extends 'UpdateAnswerFile_Task' ? UpdateAnswerFile_Task :
  Action extends 'UpdateHostCustomizations_Task' ? UpdateHostCustomizations_Task :
  Action extends 'ValidateHostProfileComposition_Task' ? ValidateHostProfileComposition_Task :
  Action extends 'ApplyStorageDrsRecommendation_Task' ? ApplyStorageDrsRecommendation_Task :
  Action extends 'ApplyStorageDrsRecommendationToPod_Task' ? ApplyStorageDrsRecommendationToPod_Task :
  Action extends 'CancelStorageDrsRecommendation' ? CancelStorageDrsRecommendation :
  Action extends 'ConfigureDatastoreIORM_Task' ? ConfigureDatastoreIORM_Task :
  Action extends 'ConfigureStorageDrsForPod_Task' ? ConfigureStorageDrsForPod_Task :
  Action extends 'QueryDatastorePerformanceSummary' ? QueryDatastorePerformanceSummary :
  Action extends 'QueryIORMConfigOption' ? QueryIORMConfigOption :
  Action extends 'RecommendDatastores' ? RecommendDatastores :
  Action extends 'RefreshStorageDrsRecommendation' ? RefreshStorageDrsRecommendation :
  Action extends 'RefreshStorageDrsRecommendationsForPod_Task' ? RefreshStorageDrsRecommendationsForPod_Task :
  Action extends 'ValidateStoragePodConfig' ? ValidateStoragePodConfig :
  Action extends 'AssignUserToGroup' ? AssignUserToGroup :
  Action extends 'ChangePassword' ? ChangePassword :
  Action extends 'CreateGroup' ? CreateGroup :
  Action extends 'CreateUser' ? CreateUser :
  Action extends 'RemoveGroup' ? RemoveGroup :
  Action extends 'RemoveUser' ? RemoveUser :
  Action extends 'UnassignUserFromGroup' ? UnassignUserFromGroup :
  Action extends 'UpdateUser' ? UpdateUser :
  Action extends 'AssociateProfile' ? AssociateProfile :
  Action extends 'CheckProfileCompliance_Task' ? CheckProfileCompliance_Task :
  Action extends 'DestroyProfile' ? DestroyProfile :
  Action extends 'DissociateProfile' ? DissociateProfile :
  Action extends 'ExportProfile' ? ExportProfile :
  Action extends 'RetrieveDescription' ? RetrieveDescription :
  Action extends 'AttachTagToVStorageObject' ? AttachTagToVStorageObject :
  Action extends 'ClearVStorageObjectControlFlags' ? ClearVStorageObjectControlFlags :
  Action extends 'CloneVStorageObject_Task' ? CloneVStorageObject_Task :
  Action extends 'CreateDisk_Task' ? CreateDisk_Task :
  Action extends 'CreateDiskFromSnapshot_Task' ? CreateDiskFromSnapshot_Task :
  Action extends 'DeleteSnapshot_Task' ? DeleteSnapshot_Task :
  Action extends 'DeleteVStorageObject_Task' ? DeleteVStorageObject_Task :
  Action extends 'DetachTagFromVStorageObject' ? DetachTagFromVStorageObject :
  Action extends 'ExtendDisk_Task' ? ExtendDisk_Task :
  Action extends 'InflateDisk_Task' ? InflateDisk_Task :
  Action extends 'ListTagsAttachedToVStorageObject' ? ListTagsAttachedToVStorageObject :
  Action extends 'ListVStorageObject' ? ListVStorageObject :
  Action extends 'ListVStorageObjectsAttachedToTag' ? ListVStorageObjectsAttachedToTag :
  Action extends 'ReconcileDatastoreInventory_Task' ? ReconcileDatastoreInventory_Task :
  Action extends 'RegisterDisk' ? RegisterDisk :
  Action extends 'RelocateVStorageObject_Task' ? RelocateVStorageObject_Task :
  Action extends 'RenameVStorageObject' ? RenameVStorageObject :
  Action extends 'RetrieveSnapshotInfo' ? RetrieveSnapshotInfo :
  Action extends 'RetrieveVStorageInfrastructureObjectPolicy' ? RetrieveVStorageInfrastructureObjectPolicy :
  Action extends 'RetrieveVStorageObject' ? RetrieveVStorageObject :
  Action extends 'RetrieveVStorageObjectAssociations' ? RetrieveVStorageObjectAssociations :
  Action extends 'RetrieveVStorageObjectState' ? RetrieveVStorageObjectState :
  Action extends 'RevertVStorageObject_Task' ? RevertVStorageObject_Task :
  Action extends 'ScheduleReconcileDatastoreInventory' ? ScheduleReconcileDatastoreInventory :
  Action extends 'SetVStorageObjectControlFlags' ? SetVStorageObjectControlFlags :
  Action extends 'UpdateVStorageInfrastructureObjectPolicy_Task' ? UpdateVStorageInfrastructureObjectPolicy_Task :
  Action extends 'UpdateVStorageObjectPolicy_Task' ? UpdateVStorageObjectPolicy_Task :
  Action extends 'VStorageObjectCreateSnapshot_Task' ? VStorageObjectCreateSnapshot_Task :
  Action extends 'AutoStartPowerOff' ? AutoStartPowerOff :
  Action extends 'AutoStartPowerOn' ? AutoStartPowerOn :
  Action extends 'ReconfigureAutostart' ? ReconfigureAutostart :
  Action extends 'BackupFirmwareConfiguration' ? BackupFirmwareConfiguration :
  Action extends 'QueryFirmwareConfigUploadURL' ? QueryFirmwareConfigUploadURL :
  Action extends 'ResetFirmwareToFactoryDefaults' ? ResetFirmwareToFactoryDefaults :
  Action extends 'RestoreFirmwareConfiguration' ? RestoreFirmwareConfiguration :
  Action extends 'BatchQueryConnectInfo' ? BatchQueryConnectInfo :
  Action extends 'PowerOnMultiVM_Task' ? PowerOnMultiVM_Task :
  Action extends 'QueryConnectionInfo' ? QueryConnectionInfo :
  Action extends 'QueryConnectionInfoViaSpec' ? QueryConnectionInfoViaSpec :
  Action extends 'queryDatacenterConfigOptionDescriptor' ? queryDatacenterConfigOptionDescriptor :
  Action extends 'ReconfigureDatacenter_Task' ? ReconfigureDatacenter_Task :
  Action extends 'BindVnic' ? BindVnic :
  Action extends 'QueryBoundVnics' ? QueryBoundVnics :
  Action extends 'QueryCandidateNics' ? QueryCandidateNics :
  Action extends 'QueryMigrationDependencies' ? QueryMigrationDependencies :
  Action extends 'QueryPnicStatus' ? QueryPnicStatus :
  Action extends 'QueryVnicStatus' ? QueryVnicStatus :
  Action extends 'UnbindVnic' ? UnbindVnic :
  Action extends 'BrowseDiagnosticLog' ? BrowseDiagnosticLog :
  Action extends 'GenerateLogBundles_Task' ? GenerateLogBundles_Task :
  Action extends 'QueryDescriptions' ? QueryDescriptions :
  Action extends 'CancelRetrievePropertiesEx' ? CancelRetrievePropertiesEx :
  Action extends 'CancelWaitForUpdates' ? CancelWaitForUpdates :
  Action extends 'CheckForUpdates' ? CheckForUpdates :
  Action extends 'ContinueRetrievePropertiesEx' ? ContinueRetrievePropertiesEx :
  Action extends 'CreateFilter' ? CreateFilter :
  Action extends 'CreatePropertyCollector' ? CreatePropertyCollector :
  Action extends 'DestroyPropertyCollector' ? DestroyPropertyCollector :
  Action extends 'RetrieveProperties' ? RetrieveProperties :
  Action extends 'RetrievePropertiesEx' ? RetrievePropertiesEx :
  Action extends 'WaitForUpdates' ? WaitForUpdates :
  Action extends 'WaitForUpdatesEx' ? WaitForUpdatesEx :
  Action extends 'CancelTask' ? CancelTask :
  Action extends 'SetTaskDescription' ? SetTaskDescription :
  Action extends 'SetTaskState' ? SetTaskState :
  Action extends 'UpdateProgress' ? UpdateProgress :
  Action extends 'CertMgrRefreshCACertificatesAndCRLs_Task' ? CertMgrRefreshCACertificatesAndCRLs_Task :
  Action extends 'CertMgrRefreshCertificates_Task' ? CertMgrRefreshCertificates_Task :
  Action extends 'CertMgrRevokeCertificates_Task' ? CertMgrRevokeCertificates_Task :
  Action extends 'ChangeAccessMode' ? ChangeAccessMode :
  Action extends 'ChangeLockdownMode' ? ChangeLockdownMode :
  Action extends 'QueryLockdownExceptions' ? QueryLockdownExceptions :
  Action extends 'QuerySystemUsers' ? QuerySystemUsers :
  Action extends 'RetrieveHostAccessControlEntries' ? RetrieveHostAccessControlEntries :
  Action extends 'UpdateLockdownExceptions' ? UpdateLockdownExceptions :
  Action extends 'UpdateSystemUsers' ? UpdateSystemUsers :
  Action extends 'ChangeFileAttributesInGuest' ? ChangeFileAttributesInGuest :
  Action extends 'CreateTemporaryDirectoryInGuest' ? CreateTemporaryDirectoryInGuest :
  Action extends 'CreateTemporaryFileInGuest' ? CreateTemporaryFileInGuest :
  Action extends 'DeleteDirectoryInGuest' ? DeleteDirectoryInGuest :
  Action extends 'DeleteFileInGuest' ? DeleteFileInGuest :
  Action extends 'InitiateFileTransferFromGuest' ? InitiateFileTransferFromGuest :
  Action extends 'InitiateFileTransferToGuest' ? InitiateFileTransferToGuest :
  Action extends 'ListFilesInGuest' ? ListFilesInGuest :
  Action extends 'MakeDirectoryInGuest' ? MakeDirectoryInGuest :
  Action extends 'MoveDirectoryInGuest' ? MoveDirectoryInGuest :
  Action extends 'MoveFileInGuest' ? MoveFileInGuest :
  Action extends 'ChangeKey_Task' ? ChangeKey_Task :
  Action extends 'CryptoManagerHostEnable' ? CryptoManagerHostEnable :
  Action extends 'CryptoManagerHostPrepare' ? CryptoManagerHostPrepare :
  Action extends 'ChangeOwner' ? ChangeOwner :
  Action extends 'CopyDatastoreFile_Task' ? CopyDatastoreFile_Task :
  Action extends 'DeleteDatastoreFile_Task' ? DeleteDatastoreFile_Task :
  Action extends 'MakeDirectory' ? MakeDirectory :
  Action extends 'MoveDatastoreFile_Task' ? MoveDatastoreFile_Task :
  Action extends 'CheckAddHostEvc_Task' ? CheckAddHostEvc_Task :
  Action extends 'CheckConfigureEvcMode_Task' ? CheckConfigureEvcMode_Task :
  Action extends 'ConfigureEvcMode_Task' ? ConfigureEvcMode_Task :
  Action extends 'DisableEvcMode_Task' ? DisableEvcMode_Task :
  Action extends 'CheckClone_Task' ? CheckClone_Task :
  Action extends 'CheckInstantClone_Task' ? CheckInstantClone_Task :
  Action extends 'CheckMigrate_Task' ? CheckMigrate_Task :
  Action extends 'CheckRelocate_Task' ? CheckRelocate_Task :
  Action extends 'QueryVMotionCompatibilityEx_Task' ? QueryVMotionCompatibilityEx_Task :
  Action extends 'CheckCompatibility_Task' ? CheckCompatibility_Task :
  Action extends 'CheckPowerOn_Task' ? CheckPowerOn_Task :
  Action extends 'CheckVmConfig_Task' ? CheckVmConfig_Task :
  Action extends 'CheckCompliance_Task' ? CheckCompliance_Task :
  Action extends 'ClearComplianceStatus' ? ClearComplianceStatus :
  Action extends 'QueryComplianceStatus' ? QueryComplianceStatus :
  Action extends 'QueryExpressionMetadata' ? QueryExpressionMetadata :
  Action extends 'CheckCustomizationResources' ? CheckCustomizationResources :
  Action extends 'CreateCustomizationSpec' ? CreateCustomizationSpec :
  Action extends 'CustomizationSpecItemToXml' ? CustomizationSpecItemToXml :
  Action extends 'DeleteCustomizationSpec' ? DeleteCustomizationSpec :
  Action extends 'DoesCustomizationSpecExist' ? DoesCustomizationSpecExist :
  Action extends 'DuplicateCustomizationSpec' ? DuplicateCustomizationSpec :
  Action extends 'GetCustomizationSpec' ? GetCustomizationSpec :
  Action extends 'OverwriteCustomizationSpec' ? OverwriteCustomizationSpec :
  Action extends 'RenameCustomizationSpec' ? RenameCustomizationSpec :
  Action extends 'XmlToCustomizationSpecItem' ? XmlToCustomizationSpecItem :
  Action extends 'CheckHostPatch_Task' ? CheckHostPatch_Task :
  Action extends 'InstallHostPatch_Task' ? InstallHostPatch_Task :
  Action extends 'InstallHostPatchV2_Task' ? InstallHostPatchV2_Task :
  Action extends 'QueryHostPatch_Task' ? QueryHostPatch_Task :
  Action extends 'ScanHostPatch_Task' ? ScanHostPatch_Task :
  Action extends 'ScanHostPatchV2_Task' ? ScanHostPatchV2_Task :
  Action extends 'StageHostPatch_Task' ? StageHostPatch_Task :
  Action extends 'UninstallHostPatch_Task' ? UninstallHostPatch_Task :
  Action extends 'ClearSystemEventLog' ? ClearSystemEventLog :
  Action extends 'FetchSystemEventLog' ? FetchSystemEventLog :
  Action extends 'RefreshHealthStatusSystem' ? RefreshHealthStatusSystem :
  Action extends 'ResetSystemHealthInfo' ? ResetSystemHealthInfo :
  Action extends 'CloneVApp_Task' ? CloneVApp_Task :
  Action extends 'ExportVApp' ? ExportVApp :
  Action extends 'PowerOffVApp_Task' ? PowerOffVApp_Task :
  Action extends 'PowerOnVApp_Task' ? PowerOnVApp_Task :
  Action extends 'SuspendVApp_Task' ? SuspendVApp_Task :
  Action extends 'unregisterVApp_Task' ? unregisterVApp_Task :
  Action extends 'UpdateLinkedChildren' ? UpdateLinkedChildren :
  Action extends 'UpdateVAppConfig' ? UpdateVAppConfig :
  Action extends 'CloseInventoryViewFolder' ? CloseInventoryViewFolder :
  Action extends 'OpenInventoryViewFolder' ? OpenInventoryViewFolder :
  Action extends 'ConfigureDatastorePrincipal' ? ConfigureDatastorePrincipal :
  Action extends 'CreateLocalDatastore' ? CreateLocalDatastore :
  Action extends 'CreateNasDatastore' ? CreateNasDatastore :
  Action extends 'CreateVmfsDatastore' ? CreateVmfsDatastore :
  Action extends 'CreateVvolDatastore' ? CreateVvolDatastore :
  Action extends 'ExpandVmfsDatastore' ? ExpandVmfsDatastore :
  Action extends 'ExtendVmfsDatastore' ? ExtendVmfsDatastore :
  Action extends 'QueryAvailableDisksForVmfs' ? QueryAvailableDisksForVmfs :
  Action extends 'QueryUnresolvedVmfsVolumes' ? QueryUnresolvedVmfsVolumes :
  Action extends 'QueryVmfsDatastoreCreateOptions' ? QueryVmfsDatastoreCreateOptions :
  Action extends 'QueryVmfsDatastoreExpandOptions' ? QueryVmfsDatastoreExpandOptions :
  Action extends 'QueryVmfsDatastoreExtendOptions' ? QueryVmfsDatastoreExtendOptions :
  Action extends 'RemoveDatastore' ? RemoveDatastore :
  Action extends 'RemoveDatastoreEx_Task' ? RemoveDatastoreEx_Task :
  Action extends 'ResignatureUnresolvedVmfsVolume_Task' ? ResignatureUnresolvedVmfsVolume_Task :
  Action extends 'UpdateLocalSwapDatastore' ? UpdateLocalSwapDatastore :
  Action extends 'ConfigureHostCache_Task' ? ConfigureHostCache_Task :
  Action extends 'ConfigurePowerPolicy' ? ConfigurePowerPolicy :
  Action extends 'configureVcha_Task' ? configureVcha_Task :
  Action extends 'createPassiveNode_Task' ? createPassiveNode_Task :
  Action extends 'createWitnessNode_Task' ? createWitnessNode_Task :
  Action extends 'deployVcha_Task' ? deployVcha_Task :
  Action extends 'destroyVcha_Task' ? destroyVcha_Task :
  Action extends 'getVchaConfig' ? getVchaConfig :
  Action extends 'prepareVcha_Task' ? prepareVcha_Task :
  Action extends 'ConfigureVFlashResourceEx_Task' ? ConfigureVFlashResourceEx_Task :
  Action extends 'HostConfigureVFlashResource' ? HostConfigureVFlashResource :
  Action extends 'HostConfigVFlashCache' ? HostConfigVFlashCache :
  Action extends 'HostGetVFlashModuleDefaultConfig' ? HostGetVFlashModuleDefaultConfig :
  Action extends 'HostRemoveVFlashResource' ? HostRemoveVFlashResource :
  Action extends 'ConvertNamespacePathToUuidPath' ? ConvertNamespacePathToUuidPath :
  Action extends 'CreateDirectory' ? CreateDirectory :
  Action extends 'DeleteDirectory' ? DeleteDirectory :
  Action extends 'CopyVirtualDisk_Task' ? CopyVirtualDisk_Task :
  Action extends 'CreateVirtualDisk_Task' ? CreateVirtualDisk_Task :
  Action extends 'DefragmentVirtualDisk_Task' ? DefragmentVirtualDisk_Task :
  Action extends 'DeleteVirtualDisk_Task' ? DeleteVirtualDisk_Task :
  Action extends 'EagerZeroVirtualDisk_Task' ? EagerZeroVirtualDisk_Task :
  Action extends 'ExtendVirtualDisk_Task' ? ExtendVirtualDisk_Task :
  Action extends 'ImportUnmanagedSnapshot' ? ImportUnmanagedSnapshot :
  Action extends 'InflateVirtualDisk_Task' ? InflateVirtualDisk_Task :
  Action extends 'MoveVirtualDisk_Task' ? MoveVirtualDisk_Task :
  Action extends 'QueryVirtualDiskFragmentation' ? QueryVirtualDiskFragmentation :
  Action extends 'QueryVirtualDiskGeometry' ? QueryVirtualDiskGeometry :
  Action extends 'QueryVirtualDiskUuid' ? QueryVirtualDiskUuid :
  Action extends 'ReleaseManagedSnapshot' ? ReleaseManagedSnapshot :
  Action extends 'SetVirtualDiskUuid' ? SetVirtualDiskUuid :
  Action extends 'ShrinkVirtualDisk_Task' ? ShrinkVirtualDisk_Task :
  Action extends 'ZeroFillVirtualDisk_Task' ? ZeroFillVirtualDisk_Task :
  Action extends 'CreateChildVM_Task' ? CreateChildVM_Task :
  Action extends 'CreateResourcePool' ? CreateResourcePool :
  Action extends 'CreateVApp' ? CreateVApp :
  Action extends 'DestroyChildren' ? DestroyChildren :
  Action extends 'ImportVApp' ? ImportVApp :
  Action extends 'MoveIntoResourcePool' ? MoveIntoResourcePool :
  Action extends 'QueryResourceConfigOption' ? QueryResourceConfigOption :
  Action extends 'RefreshRuntime' ? RefreshRuntime :
  Action extends 'RegisterChildVM_Task' ? RegisterChildVM_Task :
  Action extends 'UpdateChildResourceConfiguration' ? UpdateChildResourceConfiguration :
  Action extends 'UpdateConfig' ? UpdateConfig :
  Action extends 'CreateCollectorForEvents' ? CreateCollectorForEvents :
  Action extends 'LogUserEvent' ? LogUserEvent :
  Action extends 'PostEvent' ? PostEvent :
  Action extends 'QueryEvents' ? QueryEvents :
  Action extends 'RetrieveArgumentDescription' ? RetrieveArgumentDescription :
  Action extends 'CreateCollectorForTasks' ? CreateCollectorForTasks :
  Action extends 'CreateTask' ? CreateTask :
  Action extends 'CreateContainerView' ? CreateContainerView :
  Action extends 'CreateInventoryView' ? CreateInventoryView :
  Action extends 'CreateListView' ? CreateListView :
  Action extends 'CreateListViewFromView' ? CreateListViewFromView :
  Action extends 'CreateDescriptor' ? CreateDescriptor :
  Action extends 'CreateImportSpec' ? CreateImportSpec :
  Action extends 'ParseDescriptor' ? ParseDescriptor :
  Action extends 'ValidateHost' ? ValidateHost :
  Action extends 'CreateDiagnosticPartition' ? CreateDiagnosticPartition :
  Action extends 'QueryAvailablePartition' ? QueryAvailablePartition :
  Action extends 'QueryPartitionCreateDesc' ? QueryPartitionCreateDesc :
  Action extends 'QueryPartitionCreateOptions' ? QueryPartitionCreateOptions :
  Action extends 'SelectActivePartition' ? SelectActivePartition :
  Action extends 'CreateNvdimmNamespace_Task' ? CreateNvdimmNamespace_Task :
  Action extends 'CreateNvdimmPMemNamespace_Task' ? CreateNvdimmPMemNamespace_Task :
  Action extends 'DeleteNvdimmBlockNamespaces_Task' ? DeleteNvdimmBlockNamespaces_Task :
  Action extends 'DeleteNvdimmNamespace_Task' ? DeleteNvdimmNamespace_Task :
  Action extends 'CreateObjectScheduledTask' ? CreateObjectScheduledTask :
  Action extends 'CreateScheduledTask' ? CreateScheduledTask :
  Action extends 'RetrieveEntityScheduledTask' ? RetrieveEntityScheduledTask :
  Action extends 'RetrieveObjectScheduledTask' ? RetrieveObjectScheduledTask :
  Action extends 'CreatePerfInterval' ? CreatePerfInterval :
  Action extends 'QueryAvailablePerfMetric' ? QueryAvailablePerfMetric :
  Action extends 'QueryPerf' ? QueryPerf :
  Action extends 'QueryPerfComposite' ? QueryPerfComposite :
  Action extends 'QueryPerfCounter' ? QueryPerfCounter :
  Action extends 'QueryPerfCounterByLevel' ? QueryPerfCounterByLevel :
  Action extends 'QueryPerfProviderSummary' ? QueryPerfProviderSummary :
  Action extends 'RemovePerfInterval' ? RemovePerfInterval :
  Action extends 'ResetCounterLevelMapping' ? ResetCounterLevelMapping :
  Action extends 'UpdateCounterLevelMapping' ? UpdateCounterLevelMapping :
  Action extends 'UpdatePerfInterval' ? UpdatePerfInterval :
  Action extends 'CreateProfile' ? CreateProfile :
  Action extends 'FindAssociatedProfile' ? FindAssociatedProfile :
  Action extends 'QueryPolicyMetadata' ? QueryPolicyMetadata :
  Action extends 'CreateRegistryKeyInGuest' ? CreateRegistryKeyInGuest :
  Action extends 'DeleteRegistryKeyInGuest' ? DeleteRegistryKeyInGuest :
  Action extends 'DeleteRegistryValueInGuest' ? DeleteRegistryValueInGuest :
  Action extends 'ListRegistryKeysInGuest' ? ListRegistryKeysInGuest :
  Action extends 'ListRegistryValuesInGuest' ? ListRegistryValuesInGuest :
  Action extends 'SetRegistryValueInGuest' ? SetRegistryValueInGuest :
  Action extends 'CurrentTime' ? CurrentTime :
  Action extends 'QueryVMotionCompatibility' ? QueryVMotionCompatibility :
  Action extends 'RetrieveProductComponents' ? RetrieveProductComponents :
  Action extends 'RetrieveServiceContent' ? RetrieveServiceContent :
  Action extends 'ValidateMigration' ? ValidateMigration :
  Action extends 'DatastoreEnterMaintenanceMode' ? DatastoreEnterMaintenanceMode :
  Action extends 'DatastoreExitMaintenanceMode_Task' ? DatastoreExitMaintenanceMode_Task :
  Action extends 'DestroyDatastore' ? DestroyDatastore :
  Action extends 'RefreshDatastore' ? RefreshDatastore :
  Action extends 'RefreshDatastoreStorageInfo' ? RefreshDatastoreStorageInfo :
  Action extends 'RenameDatastore' ? RenameDatastore :
  Action extends 'UpdateVirtualMachineFiles_Task' ? UpdateVirtualMachineFiles_Task :
  Action extends 'UpdateVVolVirtualMachineFiles_Task' ? UpdateVVolVirtualMachineFiles_Task :
  Action extends 'DeleteFile' ? DeleteFile :
  Action extends 'SearchDatastore_Task' ? SearchDatastore_Task :
  Action extends 'SearchDatastoreSubFolders_Task' ? SearchDatastoreSubFolders_Task :
  Action extends 'DeleteHostSpecification' ? DeleteHostSpecification :
  Action extends 'DeleteHostSubSpecification' ? DeleteHostSubSpecification :
  Action extends 'HostSpecGetUpdatedHosts' ? HostSpecGetUpdatedHosts :
  Action extends 'RetrieveHostSpecification' ? RetrieveHostSpecification :
  Action extends 'UpdateHostSpecification' ? UpdateHostSpecification :
  Action extends 'UpdateHostSubSpecification' ? UpdateHostSubSpecification :
  Action extends 'DeselectVnic' ? DeselectVnic :
  Action extends 'SelectVnic' ? SelectVnic :
  Action extends 'UpdateIpConfig' ? UpdateIpConfig :
  Action extends 'DeselectVnicForNicType' ? DeselectVnicForNicType :
  Action extends 'QueryNetConfig' ? QueryNetConfig :
  Action extends 'SelectVnicForNicType' ? SelectVnicForNicType :
  Action extends 'Destroy_Task' ? Destroy_Task :
  Action extends 'Reload' ? Reload :
  Action extends 'Rename_Task' ? Rename_Task :
  Action extends 'DestroyCollector' ? DestroyCollector :
  Action extends 'ResetCollector' ? ResetCollector :
  Action extends 'RewindCollector' ? RewindCollector :
  Action extends 'SetCollectorPageSize' ? SetCollectorPageSize :
  Action extends 'DestroyNetwork' ? DestroyNetwork :
  Action extends 'DestroyPropertyFilter' ? DestroyPropertyFilter :
  Action extends 'DestroyView' ? DestroyView :
  Action extends 'DisableHyperThreading' ? DisableHyperThreading :
  Action extends 'EnableHyperThreading' ? EnableHyperThreading :
  Action extends 'DisableRuleset' ? DisableRuleset :
  Action extends 'EnableRuleset' ? EnableRuleset :
  Action extends 'RefreshFirewall' ? RefreshFirewall :
  Action extends 'UpdateDefaultPolicy' ? UpdateDefaultPolicy :
  Action extends 'UpdateRuleset' ? UpdateRuleset :
  Action extends 'DisableSmartCardAuthentication' ? DisableSmartCardAuthentication :
  Action extends 'EnableSmartCardAuthentication' ? EnableSmartCardAuthentication :
  Action extends 'ImportCertificateForCAM_Task' ? ImportCertificateForCAM_Task :
  Action extends 'InstallSmartCardTrustAnchor' ? InstallSmartCardTrustAnchor :
  Action extends 'JoinDomain_Task' ? JoinDomain_Task :
  Action extends 'JoinDomainWithCAM_Task' ? JoinDomainWithCAM_Task :
  Action extends 'LeaveCurrentDomain_Task' ? LeaveCurrentDomain_Task :
  Action extends 'ListSmartCardTrustAnchors' ? ListSmartCardTrustAnchors :
  Action extends 'RemoveSmartCardTrustAnchor' ? RemoveSmartCardTrustAnchor :
  Action extends 'RemoveSmartCardTrustAnchorByFingerprint' ? RemoveSmartCardTrustAnchorByFingerprint :
  Action extends 'ReplaceSmartCardTrustAnchors' ? ReplaceSmartCardTrustAnchors :
  Action extends 'DVPortgroupRollback_Task' ? DVPortgroupRollback_Task :
  Action extends 'ReconfigureDVPortgroup_Task' ? ReconfigureDVPortgroup_Task :
  Action extends 'DVSManagerExportEntity_Task' ? DVSManagerExportEntity_Task :
  Action extends 'DVSManagerImportEntity_Task' ? DVSManagerImportEntity_Task :
  Action extends 'DVSManagerLookupDvPortGroup' ? DVSManagerLookupDvPortGroup :
  Action extends 'QueryAvailableDvsSpec' ? QueryAvailableDvsSpec :
  Action extends 'QueryCompatibleHostForExistingDvs' ? QueryCompatibleHostForExistingDvs :
  Action extends 'QueryCompatibleHostForNewDvs' ? QueryCompatibleHostForNewDvs :
  Action extends 'QueryDvsByUuid' ? QueryDvsByUuid :
  Action extends 'QueryDvsCheckCompatibility' ? QueryDvsCheckCompatibility :
  Action extends 'QueryDvsCompatibleHostSpec' ? QueryDvsCompatibleHostSpec :
  Action extends 'QueryDvsConfigTarget' ? QueryDvsConfigTarget :
  Action extends 'QueryDvsFeatureCapability' ? QueryDvsFeatureCapability :
  Action extends 'RectifyDvsOnHost_Task' ? RectifyDvsOnHost_Task :
  Action extends 'EstimateDatabaseSize' ? EstimateDatabaseSize :
  Action extends 'EsxAgentHostManagerUpdateConfig' ? EsxAgentHostManagerUpdateConfig :
  Action extends 'ExecuteHostProfile' ? ExecuteHostProfile :
  Action extends 'HostProfileResetValidationState' ? HostProfileResetValidationState :
  Action extends 'UpdateHostProfile' ? UpdateHostProfile :
  Action extends 'UpdateReferenceHost' ? UpdateReferenceHost :
  Action extends 'ExecuteSimpleCommand' ? ExecuteSimpleCommand :
  Action extends 'ExportSnapshot' ? ExportSnapshot :
  Action extends 'RemoveSnapshot_Task' ? RemoveSnapshot_Task :
  Action extends 'RenameSnapshot' ? RenameSnapshot :
  Action extends 'RevertToSnapshot_Task' ? RevertToSnapshot_Task :
  Action extends 'fetchSoftwarePackages' ? fetchSoftwarePackages :
  Action extends 'HostImageConfigGetAcceptance' ? HostImageConfigGetAcceptance :
  Action extends 'HostImageConfigGetProfile' ? HostImageConfigGetProfile :
  Action extends 'installDate' ? installDate :
  Action extends 'UpdateHostImageAcceptanceLevel' ? UpdateHostImageAcceptanceLevel :
  Action extends 'FindAllByDnsName' ? FindAllByDnsName :
  Action extends 'FindAllByIp' ? FindAllByIp :
  Action extends 'FindAllByUuid' ? FindAllByUuid :
  Action extends 'FindByDatastorePath' ? FindByDatastorePath :
  Action extends 'FindByDnsName' ? FindByDnsName :
  Action extends 'FindByInventoryPath' ? FindByInventoryPath :
  Action extends 'FindByIp' ? FindByIp :
  Action extends 'FindByUuid' ? FindByUuid :
  Action extends 'FindChild' ? FindChild :
  Action extends 'FindExtension' ? FindExtension :
  Action extends 'GetPublicKey' ? GetPublicKey :
  Action extends 'QueryExtensionIpAllocationUsage' ? QueryExtensionIpAllocationUsage :
  Action extends 'QueryManagedBy' ? QueryManagedBy :
  Action extends 'RegisterExtension' ? RegisterExtension :
  Action extends 'SetExtensionCertificate' ? SetExtensionCertificate :
  Action extends 'SetPublicKey' ? SetPublicKey :
  Action extends 'UnregisterExtension' ? UnregisterExtension :
  Action extends 'UpdateExtension' ? UpdateExtension :
  Action extends 'GenerateCertificateSigningRequest' ? GenerateCertificateSigningRequest :
  Action extends 'GenerateCertificateSigningRequestByDn' ? GenerateCertificateSigningRequestByDn :
  Action extends 'InstallServerCertificate' ? InstallServerCertificate :
  Action extends 'ListCACertificateRevocationLists' ? ListCACertificateRevocationLists :
  Action extends 'ListCACertificates' ? ListCACertificates :
  Action extends 'ReplaceCACertificatesAndCRLs' ? ReplaceCACertificatesAndCRLs :
  Action extends 'GenerateClientCsr' ? GenerateClientCsr :
  Action extends 'GenerateKey' ? GenerateKey :
  Action extends 'GenerateSelfSignedClientCert' ? GenerateSelfSignedClientCert :
  Action extends 'ListKmipServers' ? ListKmipServers :
  Action extends 'MarkDefault' ? MarkDefault :
  Action extends 'QueryCryptoKeyStatus' ? QueryCryptoKeyStatus :
  Action extends 'RegisterKmipServer' ? RegisterKmipServer :
  Action extends 'RemoveKmipServer' ? RemoveKmipServer :
  Action extends 'RetrieveClientCert' ? RetrieveClientCert :
  Action extends 'RetrieveClientCsr' ? RetrieveClientCsr :
  Action extends 'RetrieveKmipServerCert' ? RetrieveKmipServerCert :
  Action extends 'RetrieveKmipServersStatus_Task' ? RetrieveKmipServersStatus_Task :
  Action extends 'RetrieveSelfSignedClientCert' ? RetrieveSelfSignedClientCert :
  Action extends 'UpdateKmipServer' ? UpdateKmipServer :
  Action extends 'UpdateKmsSignedCsrClientCert' ? UpdateKmsSignedCsrClientCert :
  Action extends 'UpdateSelfSignedClientCert' ? UpdateSelfSignedClientCert :
  Action extends 'UploadClientCert' ? UploadClientCert :
  Action extends 'UploadKmipServerCert' ? UploadKmipServerCert :
  Action extends 'getClusterMode' ? getClusterMode :
  Action extends 'GetVchaClusterHealth' ? GetVchaClusterHealth :
  Action extends 'initiateFailover_Task' ? initiateFailover_Task :
  Action extends 'setClusterMode_Task' ? setClusterMode_Task :
  Action extends 'HostClearVStorageObjectControlFlags' ? HostClearVStorageObjectControlFlags :
  Action extends 'HostCloneVStorageObject_Task' ? HostCloneVStorageObject_Task :
  Action extends 'HostCreateDisk_Task' ? HostCreateDisk_Task :
  Action extends 'HostDeleteVStorageObject_Task' ? HostDeleteVStorageObject_Task :
  Action extends 'HostExtendDisk_Task' ? HostExtendDisk_Task :
  Action extends 'HostInflateDisk_Task' ? HostInflateDisk_Task :
  Action extends 'HostListVStorageObject' ? HostListVStorageObject :
  Action extends 'HostReconcileDatastoreInventory_Task' ? HostReconcileDatastoreInventory_Task :
  Action extends 'HostRegisterDisk' ? HostRegisterDisk :
  Action extends 'HostRelocateVStorageObject_Task' ? HostRelocateVStorageObject_Task :
  Action extends 'HostRenameVStorageObject' ? HostRenameVStorageObject :
  Action extends 'HostRetrieveVStorageInfrastructureObjectPolicy' ? HostRetrieveVStorageInfrastructureObjectPolicy :
  Action extends 'HostRetrieveVStorageObject' ? HostRetrieveVStorageObject :
  Action extends 'HostRetrieveVStorageObjectMetadata' ? HostRetrieveVStorageObjectMetadata :
  Action extends 'HostRetrieveVStorageObjectMetadataValue' ? HostRetrieveVStorageObjectMetadataValue :
  Action extends 'HostRetrieveVStorageObjectState' ? HostRetrieveVStorageObjectState :
  Action extends 'HostScheduleReconcileDatastoreInventory' ? HostScheduleReconcileDatastoreInventory :
  Action extends 'HostSetVStorageObjectControlFlags' ? HostSetVStorageObjectControlFlags :
  Action extends 'HostUpdateVStorageObjectMetadata_Task' ? HostUpdateVStorageObjectMetadata_Task :
  Action extends 'HostVStorageObjectCreateDiskFromSnapshot_Task' ? HostVStorageObjectCreateDiskFromSnapshot_Task :
  Action extends 'HostVStorageObjectCreateSnapshot_Task' ? HostVStorageObjectCreateSnapshot_Task :
  Action extends 'HostVStorageObjectDeleteSnapshot_Task' ? HostVStorageObjectDeleteSnapshot_Task :
  Action extends 'HostVStorageObjectRetrieveSnapshotInfo' ? HostVStorageObjectRetrieveSnapshotInfo :
  Action extends 'HostVStorageObjectRevert_Task' ? HostVStorageObjectRevert_Task :
  Action extends 'HttpNfcLeaseAbort' ? HttpNfcLeaseAbort :
  Action extends 'HttpNfcLeaseComplete' ? HttpNfcLeaseComplete :
  Action extends 'HttpNfcLeaseGetManifest' ? HttpNfcLeaseGetManifest :
  Action extends 'HttpNfcLeaseProgress' ? HttpNfcLeaseProgress :
  Action extends 'HttpNfcLeasePullFromUrls_Task' ? HttpNfcLeasePullFromUrls_Task :
  Action extends 'HttpNfcLeaseSetManifestChecksumType' ? HttpNfcLeaseSetManifestChecksumType :
  Action extends 'InstallIoFilter_Task' ? InstallIoFilter_Task :
  Action extends 'QueryDisksUsingFilter' ? QueryDisksUsingFilter :
  Action extends 'QueryIoFilterInfo' ? QueryIoFilterInfo :
  Action extends 'QueryIoFilterIssues' ? QueryIoFilterIssues :
  Action extends 'ResolveInstallationErrorsOnCluster_Task' ? ResolveInstallationErrorsOnCluster_Task :
  Action extends 'ResolveInstallationErrorsOnHost_Task' ? ResolveInstallationErrorsOnHost_Task :
  Action extends 'UninstallIoFilter_Task' ? UninstallIoFilter_Task :
  Action extends 'UpgradeIoFilter_Task' ? UpgradeIoFilter_Task :
  Action extends 'IsSharedGraphicsActive' ? IsSharedGraphicsActive :
  Action extends 'RefreshGraphicsManager' ? RefreshGraphicsManager :
  Action extends 'UpdateGraphicsConfig' ? UpdateGraphicsConfig :
  Action extends 'ListProcessesInGuest' ? ListProcessesInGuest :
  Action extends 'ReadEnvironmentVariableInGuest' ? ReadEnvironmentVariableInGuest :
  Action extends 'StartProgramInGuest' ? StartProgramInGuest :
  Action extends 'TerminateProcessInGuest' ? TerminateProcessInGuest :
  Action extends 'LookupVmOverheadMemory' ? LookupVmOverheadMemory :
  Action extends 'ModifyListView' ? ModifyListView :
  Action extends 'ResetListView' ? ResetListView :
  Action extends 'ResetListViewFromView' ? ResetListViewFromView :
  Action extends 'PerformVsanUpgrade_Task' ? PerformVsanUpgrade_Task :
  Action extends 'PerformVsanUpgradePreflightCheck' ? PerformVsanUpgradePreflightCheck :
  Action extends 'QueryVsanUpgradeStatus' ? QueryVsanUpgradeStatus :
  Action extends 'QueryAssignedLicenses' ? QueryAssignedLicenses :
  Action extends 'RemoveAssignedLicense' ? RemoveAssignedLicense :
  Action extends 'UpdateAssignedLicense' ? UpdateAssignedLicense :
  Action extends 'QueryAvailableTimeZones' ? QueryAvailableTimeZones :
  Action extends 'QueryDateTime' ? QueryDateTime :
  Action extends 'RefreshDateTimeSystem' ? RefreshDateTimeSystem :
  Action extends 'UpdateDateTime' ? UpdateDateTime :
  Action extends 'UpdateDateTimeConfig' ? UpdateDateTimeConfig :
  Action extends 'QueryBootDevices' ? QueryBootDevices :
  Action extends 'UpdateBootDevice' ? UpdateBootDevice :
  Action extends 'QueryConfigOption' ? QueryConfigOption :
  Action extends 'QueryConfigOptionDescriptor' ? QueryConfigOptionDescriptor :
  Action extends 'QueryConfigOptionEx' ? QueryConfigOptionEx :
  Action extends 'QueryConfigTarget' ? QueryConfigTarget :
  Action extends 'QueryTargetCapabilities' ? QueryTargetCapabilities :
  Action extends 'QueryConfiguredModuleOptionString' ? QueryConfiguredModuleOptionString :
  Action extends 'QueryModules' ? QueryModules :
  Action extends 'UpdateModuleOptionString' ? UpdateModuleOptionString :
  Action extends 'QueryHostsWithAttachedLun' ? QueryHostsWithAttachedLun :
  Action extends 'QueryOptions' ? QueryOptions :
  Action extends 'UpdateOptions' ? UpdateOptions :
  Action extends 'QueryServiceList' ? QueryServiceList :
  Action extends 'ReadNextEvents' ? ReadNextEvents :
  Action extends 'ReadPreviousEvents' ? ReadPreviousEvents :
  Action extends 'ReadNextTasks' ? ReadNextTasks :
  Action extends 'ReadPreviousTasks' ? ReadPreviousTasks :
  Action extends 'ReconfigureAlarm' ? ReconfigureAlarm :
  Action extends 'RemoveAlarm' ? RemoveAlarm :
  Action extends 'ReconfigureComputeResource_Task' ? ReconfigureComputeResource_Task :
  Action extends 'ReconfigureScheduledTask' ? ReconfigureScheduledTask :
  Action extends 'RemoveScheduledTask' ? RemoveScheduledTask :
  Action extends 'RunScheduledTask' ? RunScheduledTask :
  Action extends 'ReconfigureServiceConsoleReservation' ? ReconfigureServiceConsoleReservation :
  Action extends 'ReconfigureVirtualMachineReservation' ? ReconfigureVirtualMachineReservation :
  Action extends 'ReconfigureSnmpAgent' ? ReconfigureSnmpAgent :
  Action extends 'SendTestNotification' ? SendTestNotification :
  Action extends 'Refresh' ? Refresh :
  Action extends 'UpdatePassthruConfig' ? UpdatePassthruConfig :
  Action extends 'RefreshServices' ? RefreshServices :
  Action extends 'RestartService' ? RestartService :
  Action extends 'StartService' ? StartService :
  Action extends 'StopService' ? StopService :
  Action extends 'UninstallService' ? UninstallService :
  Action extends 'UpdateServicePolicy' ? UpdateServicePolicy :
  Action extends 'RetrieveUserGroups' ? RetrieveUserGroups :
  Action extends 'setCustomValue' ? setCustomValue :
  Action extends 'UpdateClusterProfile' ? UpdateClusterProfile :
  Action extends 'UpdateDVSLacpGroupConfig_Task' ? UpdateDVSLacpGroupConfig_Task :
  never;