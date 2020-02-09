import {VAppPropertyFault} from './v-app-property-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface NoAvailableIp extends VAppPropertyFault {
  network: ManagedObjectReference & { $type: 'Network'; };
}