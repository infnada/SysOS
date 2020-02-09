import {DynamicData} from './dynamic-data';

import {VAppIPAssignmentInfo} from './v-app-i-p-assignment-info';
import {VAppOvfSectionInfo} from './v-app-ovf-section-info';
import {VAppProductInfo} from './v-app-product-info';
import {VAppPropertyInfo} from './v-app-property-info';

export interface VmConfigInfo extends DynamicData {
  eula?: string[];
  installBootRequired: boolean;
  installBootStopDelay: number;
  ipAssignment: VAppIPAssignmentInfo;
  ovfEnvironmentTransport?: string[];
  ovfSection?: VAppOvfSectionInfo[];
  product?: VAppProductInfo[];
  property?: VAppPropertyInfo[];
}