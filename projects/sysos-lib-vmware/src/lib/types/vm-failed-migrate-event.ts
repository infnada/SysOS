import {VmEvent} from './vm-event';

import {DatacenterEventArgument} from './datacenter-event-argument';
import {DatastoreEventArgument} from './datastore-event-argument';
import {HostEventArgument} from './host-event-argument';
import {LocalizedMethodFault} from './localized-method-fault';
export interface VmFailedMigrateEvent extends VmEvent {
  destDatacenter?: DatacenterEventArgument;
  destDatastore?: DatastoreEventArgument;
  destHost: HostEventArgument;
  reason: LocalizedMethodFault;
}
