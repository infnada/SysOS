import {VmRelocateSpecEvent} from './vm-relocate-spec-event';

import {DatacenterEventArgument} from './datacenter-event-argument';
import {DatastoreEventArgument} from './datastore-event-argument';
import {HostEventArgument} from './host-event-argument';

export interface VmRelocatedEvent extends VmRelocateSpecEvent {
  sourceDatacenter?: DatacenterEventArgument;
  sourceDatastore?: DatastoreEventArgument;
  sourceHost: HostEventArgument;
}