import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostPlugStoreTopologyPath extends DynamicData {
  adapter?: string;
  channelNumber?: Int;
  device?: string;
  key: string;
  lunNumber?: Int;
  name: string;
  target?: string;
  targetNumber?: Int;
}
