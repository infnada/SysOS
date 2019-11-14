import {DynamicData} from './dynamic-data';

import {HostScsiTopologyLun} from './host-scsi-topology-lun';
import {HostTargetTransport} from './host-target-transport';
import {Int} from './int';
export interface HostScsiTopologyTarget extends DynamicData {
  key?: HostScsiTopologyLun[];
  target: Int;
  transport?: HostTargetTransport;
}
