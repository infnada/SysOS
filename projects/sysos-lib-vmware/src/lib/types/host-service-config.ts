import {DynamicData} from './dynamic-data';

export interface HostServiceConfig extends DynamicData {
  serviceId: string;
  startupPolicy: string;
}
