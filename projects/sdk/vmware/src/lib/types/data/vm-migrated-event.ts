import {VmEvent} from './vm-event';

import {DatacenterEventArgument} from './datacenter-event-argument';
import {DatastoreEventArgument} from './datastore-event-argument';
import {HostEventArgument} from './host-event-argument';

export interface VmMigratedEvent extends VmEvent {
  sourceDatacenter?: DatacenterEventArgument;
  sourceDatastore?: DatastoreEventArgument;
  sourceHost: HostEventArgument;
}