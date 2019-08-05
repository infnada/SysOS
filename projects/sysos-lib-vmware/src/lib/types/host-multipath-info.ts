import {DynamicData} from './dynamic-data';

import {HostMultipathInfoLogicalUnit} from './host-multipath-info-logical-unit';
export interface HostMultipathInfo extends DynamicData {
  lun?: HostMultipathInfoLogicalUnit[];
}
