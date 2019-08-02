export interface HostStorageDeviceInfo {
  hostBusAdapter?: HostHostBusAdapter[];
  multipathInfo?: HostMultipathInfo;
  plugStoreTopology?: HostPlugStoreTopology;
  scsiLun?: ScsiLun[];
  scsiTopology?: HostScsiTopology;
  softwareInternetScsiEnabled: boolean;
}
