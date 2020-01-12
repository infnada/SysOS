import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HttpNfcLeaseDeviceUrl extends DynamicData {
  datastoreKey?: string;
  disk?: boolean;
  fileSize?: Long;
  importKey: string;
  key: string;
  sslThumbprint: string;
  targetId?: string;
  url: string;
}
