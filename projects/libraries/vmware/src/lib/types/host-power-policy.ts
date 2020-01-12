import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostPowerPolicy extends DynamicData {
  description: string;
  key: Int;
  name: string;
  shortName: string;
}
