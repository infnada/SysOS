import {DynamicData} from './dynamic-data';


export interface ModeInfo extends DynamicData {
  admin?: string;
  browse?: string;
  full: string;
  modify: string;
  read: string;
  use: string;
}