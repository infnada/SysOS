import {DynamicData} from './dynamic-data';

import {HostScsiTopologyInterface} from './host-scsi-topology-interface';

export interface HostScsiTopology extends DynamicData {
  adapter?: HostScsiTopologyInterface[];
}