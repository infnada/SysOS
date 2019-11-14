import {DynamicData} from './dynamic-data';

import {HostHostBusAdapter} from './host-host-bus-adapter';
import {HostMultipathInfo} from './host-multipath-info';
import {HostPlugStoreTopology} from './host-plug-store-topology';
import {ScsiLun} from './scsi-lun';
import {HostScsiTopology} from './host-scsi-topology';
export interface HostStorageDeviceInfo extends DynamicData {
  hostBusAdapter?: HostHostBusAdapter[];
  multipathInfo?: HostMultipathInfo;
  plugStoreTopology?: HostPlugStoreTopology;
  scsiLun?: ScsiLun[];
  scsiTopology?: HostScsiTopology;
  softwareInternetScsiEnabled: boolean;
}
