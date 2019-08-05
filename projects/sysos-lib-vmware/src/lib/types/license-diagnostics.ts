import {DynamicData} from './dynamic-data';

import {LicenseManagerState} from './license-manager-state';
import {DateTime} from './date-time';
import {Float} from './float';
export interface LicenseDiagnostics extends DynamicData {
  lastStatusUpdate: DateTime;
  licenseFeatureUnknowns: string;
  licenseRequestFailures: string;
  licenseRequests: string;
  opFailureMessage: string;
  opState: LicenseManagerState;
  sourceLastChanged: DateTime;
  sourceLatency: Float;
  sourceLost: string;
}
