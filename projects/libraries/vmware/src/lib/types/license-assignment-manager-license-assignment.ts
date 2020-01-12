import {DynamicData} from './dynamic-data';

import {LicenseManagerLicenseInfo} from './license-manager-license-info';
import {KeyAnyValue} from './key-any-value';
export interface LicenseAssignmentManagerLicenseAssignment extends DynamicData {
  assignedLicense: LicenseManagerLicenseInfo;
  entityDisplayName?: KeyAnyValue[];
  scope?: string;
}
