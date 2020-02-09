import {VmRelocateSpecEvent} from './vm-relocate-spec-event';

import {DatacenterEventArgument} from './datacenter-event-argument';
import {DatastoreEventArgument} from './datastore-event-argument';
import {HostEventArgument} from './host-event-argument';
import {LocalizedMethodFault} from './localized-method-fault';

export interface VmRelocateFailedEvent extends VmRelocateSpecEvent {
  destDatacenter?: DatacenterEventArgument;
  destDatastore?: DatastoreEventArgument;
  destHost: HostEventArgument;
  reason: LocalizedMethodFault;
}