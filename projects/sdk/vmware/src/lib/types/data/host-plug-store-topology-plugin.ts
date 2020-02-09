import {DynamicData} from './dynamic-data';


export interface HostPlugStoreTopologyPlugin extends DynamicData {
  claimedPath?: string[];
  device?: string[];
  key: string;
  name: string;
}