import {DynamicData} from './dynamic-data';

import {ComputeResourceEventArgument} from './compute-resource-event-argument';
import {DatacenterEventArgument} from './datacenter-event-argument';
import {DatastoreEventArgument} from './datastore-event-argument';
import {DvsEventArgument} from './dvs-event-argument';
import {HostEventArgument} from './host-event-argument';
import {NetworkEventArgument} from './network-event-argument';
import {VmEventArgument} from './vm-event-argument';
import {Int} from './int';
import {DateTime} from './date-time';
export interface Event extends DynamicData {
  chainId: Int;
  changeTag?: string;
  computeResource?: ComputeResourceEventArgument;
  createdTime: DateTime;
  datacenter?: DatacenterEventArgument;
  ds?: DatastoreEventArgument;
  dvs?: DvsEventArgument;
  fullFormattedMessage?: string;
  host?: HostEventArgument;
  key: Int;
  net?: NetworkEventArgument;
  userName: string;
  vm?: VmEventArgument;
}
