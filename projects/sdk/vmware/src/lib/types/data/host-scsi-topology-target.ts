import {DynamicData} from './dynamic-data';

import {HostScsiTopologyLun} from './host-scsi-topology-lun';
import {HostTargetTransport} from './host-target-transport';

export interface HostScsiTopologyTarget extends DynamicData {
  key: string;
  lun?: HostScsiTopologyLun[];
  target: number;
  transport?: HostTargetTransport;
}