import {DynamicData} from './dynamic-data';

import {Permission} from './permission';
export interface HostSecuritySpec extends DynamicData {
  addPermission?: Permission[];
  adminPassword?: Permission[];
}
