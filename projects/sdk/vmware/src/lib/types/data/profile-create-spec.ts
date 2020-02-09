import {DynamicData} from './dynamic-data';


export interface ProfileCreateSpec extends DynamicData {
  annotation?: string;
  enabled?: boolean;
  name?: string;
}