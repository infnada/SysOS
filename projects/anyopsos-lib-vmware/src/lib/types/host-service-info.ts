import {DynamicData} from './dynamic-data';

import {HostService} from './host-service';
export interface HostServiceInfo extends DynamicData {
  service?: HostService[];
}
