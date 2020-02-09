import {LicenseSource} from './license-source';


export interface EvaluationLicenseSource extends LicenseSource {
  remainingHours?: number;
}