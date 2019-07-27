import {VAppIPAssignmentInfo} from './vapp-ip-assignment-info';
import {VAppOvfSectionSpec} from './vapp-ovf-section-spec';
import {VAppProductSpec} from './vapp-product-spec';
import {VAppPropertySpec} from './vapp-property-spec';

export interface VmConfigSpec {
  eula?: string[];
  installBootRequired?: boolean;
  installBootStopDelay?: number;
  ipAssignment?: VAppIPAssignmentInfo;
  ovfEnvironmentTransport?: string[];
  ovfSection?: VAppOvfSectionSpec[];
  product?: VAppProductSpec[];
  property?: VAppPropertySpec[];
}
