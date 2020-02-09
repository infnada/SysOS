import {DynamicData} from './dynamic-data';


export interface MultipleCertificatesVerifyFaultThumbprintData extends DynamicData {
  port: number;
  thumbprint: string;
}