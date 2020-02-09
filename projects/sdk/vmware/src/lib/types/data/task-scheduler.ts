import {DynamicData} from './dynamic-data';


export interface TaskScheduler extends DynamicData {
  activeTime?: string;
  expireTime?: string;
}