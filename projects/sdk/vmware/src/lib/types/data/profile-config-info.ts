import {DynamicData} from './dynamic-data';


export interface ProfileConfigInfo extends DynamicData {
  annotation?: string;
  enabled: boolean;
  name: string;
}