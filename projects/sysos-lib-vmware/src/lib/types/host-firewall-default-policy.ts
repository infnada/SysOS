import {DynamicData} from './dynamic-data';

export interface HostFirewallDefaultPolicy extends DynamicData {
  incomingBlocked?: boolean;
  outgoingBlocked?: boolean;
}
