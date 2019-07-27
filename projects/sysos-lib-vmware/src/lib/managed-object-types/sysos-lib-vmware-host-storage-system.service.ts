import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostStorageSystemService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AddInternetScsiSendTargets() {

  }

  AddInternetScsiStaticTargets() {

  }

  AttachScsiLun() {

  }

  AttachScsiLunEx_Task() {

  }

  AttachVmfsExtent() {

  }

  ChangeNFSUserPassword() {

  }

  ClearNFSUser() {

  }

  ComputeDiskPartitionInfo() {

  }

  ComputeDiskPartitionInfoForResize() {

  }

  DeleteScsiLunState() {

  }

  DeleteVffsVolumeState() {

  }

  DeleteVmfsVolumeState() {

  }

  DestroyVffs() {

  }

  DetachScsiLun() {

  }

  DetachScsiLunEx_Task() {

  }

  DisableMultipathPath() {

  }

  DiscoverFcoeHbas() {

  }

  EnableMultipathPath() {

  }

  ExpandVmfsExtent() {

  }

  ExtendVffs() {

  }

  FormatVffs() {

  }

  FormatVmfs() {

  }

  MarkAsLocal_Task() {

  }

  MarkAsNonLocal_Task() {

  }

  MarkAsNonSsd_Task() {

  }

  MarkAsSsd_Task() {

  }

  MarkForRemoval() {

  }

  MountVffsVolume() {

  }

  MountVmfsVolume() {

  }

  MountVmfsVolumeEx_Task() {

  }

  QueryAvailableSsds() {

  }

  QueryNFSUser() {

  }

  QueryPathSelectionPolicyOptions() {

  }

  QueryStorageArrayTypePolicyOptions() {

  }

  QueryUnresolvedVmfsVolume() {

  }

  QueryVmfsConfigOption() {

  }

  RefreshStorageSystem() {

  }

  RemoveInternetScsiSendTargets() {

  }

  RemoveInternetScsiStaticTargets() {

  }

  RescanAllHba() {

  }

  RescanHba() {

  }

  RescanVffs() {

  }

  RescanVmfs() {

  }

  ResolveMultipleUnresolvedVmfsVolumes() {

  }

  ResolveMultipleUnresolvedVmfsVolumesEx_Task() {

  }

  RetrieveDiskPartitionInfo() {

  }

  SetMultipathLunPolicy() {

  }

  SetNFSUser() {

  }

  TurnDiskLocatorLedOff_Task() {

  }

  TurnDiskLocatorLedOn_Task() {

  }

  UnmapVmfsVolumeEx_Task() {

  }

  UnmountForceMountedVmfsVolume() {

  }

  UnmountVffsVolume() {

  }

  UnmountVmfsVolume() {

  }

  UnmountVmfsVolumeEx_Task() {

  }

  UpdateDiskPartitions() {

  }

  UpdateInternetScsiAdvancedOptions() {

  }

  UpdateInternetScsiAlias() {

  }

  UpdateInternetScsiAuthenticationProperties() {

  }

  UpdateInternetScsiDigestProperties() {

  }

  UpdateInternetScsiDiscoveryProperties() {

  }

  UpdateInternetScsiIPProperties() {

  }

  UpdateInternetScsiName() {

  }

  UpdateScsiLunDisplayName() {

  }

  UpdateSoftwareInternetScsiEnabled() {

  }

  UpdateVmfsUnmapBandwidth() {

  }

  UpdateVmfsUnmapPriority() {

  }

  UpgradeVmfs() {

  }

  UpgradeVmLayout() {

  }
}
