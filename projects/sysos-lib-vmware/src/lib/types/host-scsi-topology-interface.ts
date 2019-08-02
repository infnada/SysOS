import {HostScsiTopologyTarget} from "./host-scsi-topology-target";

export interface HostScsiTopologyInterface {
  adapter: string;
  key: string;
  target?: HostScsiTopologyTarget[];
}
