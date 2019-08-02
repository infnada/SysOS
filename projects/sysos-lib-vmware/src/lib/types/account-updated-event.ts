import {HostEvent} from "./host-event";
import {HostAccountSpec} from "./host-account-spec";

export interface AccountUpdatedEvent extends HostEvent{
  group: boolean;
  prevDescription?: string;
  spec: HostAccountSpec;
}
