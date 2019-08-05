import {DynamicData} from './dynamic-data';

export interface VirtualDeviceConnectInfo extends DynamicData {
  allowGuestControl: boolean;
  connected: boolean;
  migrateConnect?: string;
  startConnected: boolean;
  status?: string;
}
