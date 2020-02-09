import {ArrayUpdateSpec} from './array-update-spec';

import {VAppOvfSectionInfo} from './v-app-ovf-section-info';

export interface VAppOvfSectionSpec extends ArrayUpdateSpec {
  info?: VAppOvfSectionInfo;
}