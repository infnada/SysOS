import {DynamicData} from './dynamic-data';

import {LicenseManagerEvaluationInfo} from './license-manager-evaluation-info';
import {LicenseManagerLicenseInfo} from './license-manager-license-info';
import {HostLicensableResourceInfo} from './host-licensable-resource-info';

export interface HostLicenseConnectInfo extends DynamicData {
  evaluation: LicenseManagerEvaluationInfo;
  license: LicenseManagerLicenseInfo;
  resource?: HostLicensableResourceInfo;
}