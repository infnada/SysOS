import {DynamicData} from './dynamic-data';

export interface HostAccountSpec extends DynamicData {
  description?: string;
  id: string;
  password?: string;
}
