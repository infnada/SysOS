import {DynamicData} from './dynamic-data';


export interface CustomizationSpecInfo extends DynamicData {
  changeVersion?: string;
  description: string;
  lastUpdateTime?: string;
  name: string;
  type: string;
}