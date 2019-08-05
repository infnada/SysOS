import {DynamicData} from './dynamic-data';

import {LongOption} from './long-option';
import {Int} from './int';
import {Long} from './long';
export interface VmfsConfigOption extends DynamicData {
  blockSizeOption: Int;
  unmapBandwidthDynamicMax?: LongOption;
  unmapBandwidthDynamicMin?: LongOption;
  unmapBandwidthFixedValue?: LongOption;
  unmapBandwidthIncrement?: Long;
  unmapGranularityOption?: Int[];
}
