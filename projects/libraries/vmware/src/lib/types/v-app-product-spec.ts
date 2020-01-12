import {ArrayUpdateSpec} from './array-update-spec';

import {VAppProductInfo} from './v-app-product-info';
export interface VAppProductSpec extends ArrayUpdateSpec {
  info?: VAppProductInfo;
}
