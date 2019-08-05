import {DynamicData} from './dynamic-data';
import {Long} from './long';

export interface OvfFile extends DynamicData {
  capacity?: Long;
  chunkSize?: Long;
  compressionMethod?: string;
  deviceId: string;
  path: string;
  populatedSize?: Long;
  size: Long;
}
