import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface ReplicationInfoDiskSettings extends DynamicData {
  diskReplicationId: string;
  key: Int;
}
