import {DynamicData} from './dynamic-data';

export interface ExtManagedEntityInfo extends DynamicData {
  description?: string;
  iconUrl?: string;
  smallIconUrl?: string;
  type: string;
}
