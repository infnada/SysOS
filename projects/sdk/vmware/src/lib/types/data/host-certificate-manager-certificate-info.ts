import {DynamicData} from './dynamic-data';


export interface HostCertificateManagerCertificateInfo extends DynamicData {
  issuer?: string;
  notAfter?: string;
  notBefore?: string;
  status: string;
  subject?: string;
}