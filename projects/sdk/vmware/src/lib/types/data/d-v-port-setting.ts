import {DynamicData} from './dynamic-data';

import {BoolPolicy} from './bool-policy';
import {DvsFilterPolicy} from './dvs-filter-policy';
import {DVSTrafficShapingPolicy} from './d-v-s-traffic-shaping-policy';
import {StringPolicy} from './string-policy';
import {DVSVendorSpecificConfig} from './d-v-s-vendor-specific-config';

export interface DVPortSetting extends DynamicData {
  blocked?: BoolPolicy;
  filterPolicy?: DvsFilterPolicy;
  inShapingPolicy?: DVSTrafficShapingPolicy;
  networkResourcePoolKey?: StringPolicy;
  outShapingPolicy?: DVSTrafficShapingPolicy;
  vendorSpecificConfig?: DVSVendorSpecificConfig;
  vmDirectPathGen2Allowed?: BoolPolicy;
}