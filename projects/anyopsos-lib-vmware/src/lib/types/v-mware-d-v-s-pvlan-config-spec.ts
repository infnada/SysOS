import {DynamicData} from './dynamic-data';

import {VMwareDVSPvlanMapEntry} from './v-mware-d-v-s-pvlan-map-entry';
export interface VMwareDVSPvlanConfigSpec extends DynamicData {
  operation: string;
  pvlanEntry: VMwareDVSPvlanMapEntry;
}
