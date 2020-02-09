import {DynamicData} from './dynamic-data';

import {LicenseManagerState} from '../enums/license-manager-state';

export interface LicenseDiagnostics extends DynamicData {
  lastStatusUpdate: string;
  licenseFeatureUnknowns: string;
  licenseRequestFailures: string;
  licenseRequests: string;
  opFailureMessage: string;
  opState: LicenseManagerState;
  sourceLastChanged: string;
  sourceLatency: number;
  sourceLost: string;
}