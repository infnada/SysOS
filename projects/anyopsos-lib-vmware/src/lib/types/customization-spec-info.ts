import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';

export interface CustomizationSpecInfo extends DynamicData {
  changeVersion?: string;
  description: string;
  lastUpdateTime?: DateTime;
  name: string;
  type: string;
}
