import {DynamicData} from './dynamic-data';


export interface FileInfo extends DynamicData {
  fileSize?: number;
  friendlyName?: string;
  modification?: string;
  owner?: string;
  path: string;
}