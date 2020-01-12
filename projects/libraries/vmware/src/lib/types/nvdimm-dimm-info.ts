import {DynamicData} from './dynamic-data';

import {NvdimmHealthInfo} from './nvdimm-health-info';
import {NvdimmRegionInfo} from './nvdimm-region-info';
import {Int} from './int';
import {Long} from './long';
export interface NvdimmDimmInfo extends DynamicData {
  availablePersistentCapacity: Long;
  availableVolatileCapacity: Long;
  blockCapacity: Long;
  dimmHandle: Int;
  healthInfo: NvdimmHealthInfo;
  persistentCapacity: Long;
  regionInfo?: NvdimmRegionInfo[];
  representationString: string;
  totalCapacity: Long;
  volatileCapacity: Long;
}
