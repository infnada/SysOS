import {DynamicData} from './dynamic-data';

export interface HostHyperThreadScheduleInfo extends DynamicData {
  active: boolean;
  available: boolean;
  config: boolean;
}
