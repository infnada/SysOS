import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface HostProtocolEndpoint extends DynamicData {
  deviceId?: string;
  hostKey?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  nfsDir?: string;
  nfsServer?: string;
  nfsServerAuthType?: string;
  nfsServerMajor?: string;
  nfsServerScope?: string;
  nfsServerUser?: string;
  peType: string;
  storageArray?: string;
  type?: string;
  uuid: string;
}