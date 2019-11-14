import {DynamicData} from './dynamic-data';

export interface PropertySpec extends DynamicData {
  all?: boolean;
  pathSet?: string[];
  type: string;
}
