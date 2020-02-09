import {DynamicData} from './dynamic-data';


export interface CryptoManagerKmipCertificateInfo extends DynamicData {
  checkTime: string;
  fingerprint: string;
  issuer: string;
  notAfter: string;
  notBefore: string;
  secondsBeforeExpire?: number;
  secondsSinceValid?: number;
  serialNumber: string;
  subject: string;
}