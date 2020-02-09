import {DynamicData} from './dynamic-data';


export interface HttpNfcLeaseDeviceUrl extends DynamicData {
  datastoreKey?: string;
  disk?: boolean;
  fileSize?: number;
  importKey: string;
  key: string;
  sslThumbprint: string;
  targetId?: string;
  url: string;
}