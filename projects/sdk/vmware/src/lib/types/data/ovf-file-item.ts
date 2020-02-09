import {DynamicData} from './dynamic-data';


export interface OvfFileItem extends DynamicData {
  chunkSize?: number;
  cimType: number;
  compressionMethod?: string;
  create: boolean;
  deviceId: string;
  path: string;
  size?: number;
}