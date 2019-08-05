import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface DVSHealthCheckConfig extends DynamicData {
  enable?: boolean;
  interval?: Int;
}
