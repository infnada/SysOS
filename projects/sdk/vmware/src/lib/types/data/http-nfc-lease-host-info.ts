import {DynamicData} from './dynamic-data';


export interface HttpNfcLeaseHostInfo extends DynamicData {
  sslThumbprint: string;
  url: string;
}