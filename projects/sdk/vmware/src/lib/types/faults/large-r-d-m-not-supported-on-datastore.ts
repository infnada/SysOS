import {VmConfigFault} from './vm-config-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface LargeRDMNotSupportedOnDatastore extends VmConfigFault {
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  datastoreName: string;
  device: string;
}