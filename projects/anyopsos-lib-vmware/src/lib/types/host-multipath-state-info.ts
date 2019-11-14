import {DynamicData} from './dynamic-data';

import {HostMultipathStateInfoPath} from './host-multipath-state-info-path';
export interface HostMultipathStateInfo extends DynamicData {
  path?: HostMultipathStateInfoPath[];
}
