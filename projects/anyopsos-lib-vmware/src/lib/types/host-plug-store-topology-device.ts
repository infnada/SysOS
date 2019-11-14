import {DynamicData} from './dynamic-data';

export interface HostPlugStoreTopologyDevice extends DynamicData {
  key: string;
  lun: string;
  path?: string[];
}
