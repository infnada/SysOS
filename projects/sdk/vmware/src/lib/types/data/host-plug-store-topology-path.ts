import {DynamicData} from './dynamic-data';


export interface HostPlugStoreTopologyPath extends DynamicData {
  adapter?: string;
  channelNumber?: number;
  device?: string;
  key: string;
  lunNumber?: number;
  name: string;
  target?: string;
  targetNumber?: number;
}