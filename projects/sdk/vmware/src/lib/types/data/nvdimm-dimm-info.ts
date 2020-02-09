import {DynamicData} from './dynamic-data';

import {NvdimmHealthInfo} from './nvdimm-health-info';
import {NvdimmRegionInfo} from './nvdimm-region-info';

export interface NvdimmDimmInfo extends DynamicData {
  availablePersistentCapacity: number;
  availableVolatileCapacity: number;
  blockCapacity: number;
  dimmHandle: number;
  healthInfo: NvdimmHealthInfo;
  persistentCapacity: number;
  regionInfo?: NvdimmRegionInfo[];
  representationString: string;
  totalCapacity: number;
  volatileCapacity: number;
}