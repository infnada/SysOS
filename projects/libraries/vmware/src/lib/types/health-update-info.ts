import {DynamicData} from './dynamic-data';

export interface HealthUpdateInfo extends DynamicData {
  componentType: string;
  description: string;
  id: string;
}
