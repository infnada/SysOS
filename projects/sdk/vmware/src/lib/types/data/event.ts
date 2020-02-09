import {DynamicData} from './dynamic-data';

import {ComputeResourceEventArgument} from './compute-resource-event-argument';
import {DatacenterEventArgument} from './datacenter-event-argument';
import {DatastoreEventArgument} from './datastore-event-argument';
import {DvsEventArgument} from './dvs-event-argument';
import {HostEventArgument} from './host-event-argument';
import {NetworkEventArgument} from './network-event-argument';
import {VmEventArgument} from './vm-event-argument';

export interface Event extends DynamicData {
  chainId: number;
  changeTag?: string;
  computeResource?: ComputeResourceEventArgument;
  createdTime: string;
  datacenter?: DatacenterEventArgument;
  ds?: DatastoreEventArgument;
  dvs?: DvsEventArgument;
  fullFormattedMessage?: string;
  host?: HostEventArgument;
  key: number;
  net?: NetworkEventArgument;
  userName: string;
  vm?: VmEventArgument;
}