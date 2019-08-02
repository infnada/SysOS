import {HostNasVolumeSpec} from "./host-nas-volume-spec";

export interface HostNasVolumeConfig {
  changeOperation?: string;
  spec?: HostNasVolumeSpec;
}
