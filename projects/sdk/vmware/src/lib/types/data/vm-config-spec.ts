import {DynamicData} from './dynamic-data';

import {VAppIPAssignmentInfo} from './v-app-i-p-assignment-info';
import {VAppOvfSectionSpec} from './v-app-ovf-section-spec';
import {VAppProductSpec} from './v-app-product-spec';
import {VAppPropertySpec} from './v-app-property-spec';

export interface VmConfigSpec extends DynamicData {
  eula?: string[];
  installBootRequired?: boolean;
  installBootStopDelay?: number;
  ipAssignment?: VAppIPAssignmentInfo;
  ovfEnvironmentTransport?: string[];
  ovfSection?: VAppOvfSectionSpec[];
  product?: VAppProductSpec[];
  property?: VAppPropertySpec[];
}