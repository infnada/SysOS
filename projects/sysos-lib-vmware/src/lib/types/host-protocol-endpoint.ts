import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface HostProtocolEndpoint extends DynamicData {
  deviceId?: ManagedObjectReference[] & { $type: 'HostSystem' };
  nfsDir?: string;
  nfsServerMajor?: string;
  nfsServerScope?: string;
  nfsServerUser?: string;
  peType: string;
  storageArray?: string;
  uuid: string;
}
