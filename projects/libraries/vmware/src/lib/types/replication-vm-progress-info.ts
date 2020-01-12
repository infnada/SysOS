import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface ReplicationVmProgressInfo extends DynamicData {
  bytesToTransfer: Long;
  bytesTransferred: Long;
  checksumComparedBytes?: Long;
  checksumTotalBytes?: Long;
  progress: Int;
}
