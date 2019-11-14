import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface OvfFileItem extends DynamicData {
  chunkSize?: Long;
  cimType: Int;
  compressionMethod?: string;
  create: boolean;
  deviceId: string;
  path: string;
  size?: Long;
}
