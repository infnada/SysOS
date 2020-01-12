import {ArrayUpdateSpec} from './array-update-spec';

import {VAppPropertyInfo} from './v-app-property-info';
export interface VAppPropertySpec extends ArrayUpdateSpec {
  info?: VAppPropertyInfo;
}
