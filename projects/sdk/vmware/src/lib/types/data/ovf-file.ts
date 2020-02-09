import {DynamicData} from './dynamic-data';


export interface OvfFile extends DynamicData {
  capacity?: number;
  chunkSize?: number;
  compressionMethod?: string;
  deviceId: string;
  path: string;
  populatedSize?: number;
  size: number;
}