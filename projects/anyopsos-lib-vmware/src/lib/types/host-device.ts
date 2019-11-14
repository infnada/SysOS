import {DynamicData} from './dynamic-data';

export interface HostDevice extends DynamicData {
  deviceName: string;
  deviceType: string;
}
