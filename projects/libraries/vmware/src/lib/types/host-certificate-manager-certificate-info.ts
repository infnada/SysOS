import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';

export interface HostCertificateManagerCertificateInfo extends DynamicData {
  issuer?: string;
  notAfter?: DateTime;
  status: string;
  subject?: string;
}
