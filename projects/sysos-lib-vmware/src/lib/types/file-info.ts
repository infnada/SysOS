import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';
import {Long} from './long';

export interface FileInfo extends DynamicData {
  fileSize?: Long;
  friendlyName?: string;
  modification?: DateTime;
  owner?: string;
  path: string;
}
