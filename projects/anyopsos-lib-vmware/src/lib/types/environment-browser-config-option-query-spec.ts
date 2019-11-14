import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface EnvironmentBrowserConfigOptionQuerySpec extends DynamicData {
  guestId?: string[];
  host?: ManagedObjectReference & { $type: 'HostSystem' };
  key?: string;
}
