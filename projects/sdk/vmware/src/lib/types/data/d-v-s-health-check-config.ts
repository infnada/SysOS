import {DynamicData} from './dynamic-data';


export interface DVSHealthCheckConfig extends DynamicData {
  enable?: boolean;
  interval?: number;
}