import {HostAccountSpec} from "./host-account-spec";
import {HostEvent} from "./host-event";

export interface AccountCreatedEvent extends HostEvent {
  group: boolean;
  spec: HostAccountSpec;
}
