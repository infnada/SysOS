import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {DateTime} from './date-time';

export interface CryptoManagerKmipCertificateInfo extends DynamicData {
  checkTime: DateTime;
  fingerprint: string;
  issuer: string;
  notAfter: DateTime;
  notBefore: DateTime;
  secondsBeforeExpire?: Int;
  secondsSinceValid?: Int;
  serialNumber: string;
  subject: string;
}
