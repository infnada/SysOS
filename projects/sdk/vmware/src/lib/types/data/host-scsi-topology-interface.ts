import {DynamicData} from './dynamic-data';

import {HostScsiTopologyTarget} from './host-scsi-topology-target';

export interface HostScsiTopologyInterface extends DynamicData {
  adapter: string;
  key: string;
  target?: HostScsiTopologyTarget[];
}