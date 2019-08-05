import {DynamicData} from './dynamic-data';

import {HostNasVolumeSpec} from './host-nas-volume-spec';
export interface HostNasVolumeConfig extends DynamicData {
  changeOperation?: string;
  spec?: HostNasVolumeSpec;
}
