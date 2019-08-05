import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface HttpNfcLeaseManifestEntry extends DynamicData {
  capacity?: Long;
  checksum?: string;
  checksumType?: string;
  disk: boolean;
  key: string;
  populatedSize?: Long;
  size: Long;
}
