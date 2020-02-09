import {DynamicData} from './dynamic-data';

import {LongOption} from './long-option';

export interface VmfsConfigOption extends DynamicData {
  blockSizeOption: number;
  unmapBandwidthDynamicMax?: LongOption;
  unmapBandwidthDynamicMin?: LongOption;
  unmapBandwidthFixedValue?: LongOption;
  unmapBandwidthIncrement?: number;
  unmapGranularityOption?: number[];
}