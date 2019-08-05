import {DynamicData} from './dynamic-data';

export interface HostSystemReconnectSpec extends DynamicData {
  syncState?: boolean;
}
