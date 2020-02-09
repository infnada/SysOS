import {DynamicData} from './dynamic-data';


export interface ReplicationVmProgressInfo extends DynamicData {
  bytesToTransfer: number;
  bytesTransferred: number;
  checksumComparedBytes?: number;
  checksumTotalBytes?: number;
  progress: number;
}