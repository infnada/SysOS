import {DynamicData} from './dynamic-data';


export interface HostSslThumbprintInfo extends DynamicData {
  ownerTag: string;
  principal: string;
  sslThumbprints?: string[];
}