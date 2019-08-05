import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface MultipleCertificatesVerifyFaultThumbprintData extends DynamicData {
  port: Int;
  thumbprint: string;
}
