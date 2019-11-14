import {LicenseSource} from './license-source';
import {Long} from './long';

export interface EvaluationLicenseSource extends LicenseSource {
  remainingHours?: Long;
}
