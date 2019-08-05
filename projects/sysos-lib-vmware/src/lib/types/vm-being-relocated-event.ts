import {VmRelocateSpecEvent} from './vm-relocate-spec-event';

import {DatacenterEventArgument} from './datacenter-event-argument';
import {DatastoreEventArgument} from './datastore-event-argument';
import {HostEventArgument} from './host-event-argument';
export interface VmBeingRelocatedEvent extends VmRelocateSpecEvent {
  destDatacenter?: DatacenterEventArgument;
  destDatastore?: DatastoreEventArgument;
  destHost: HostEventArgument;
}
