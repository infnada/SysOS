import {DynamicData} from './dynamic-data';


export interface HostPlugStoreTopologyAdapter extends DynamicData {
  adapter: string;
  key: string;
  path?: string[];
}