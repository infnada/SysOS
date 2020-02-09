import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostFirewallDefaultPolicy} from '../data/host-firewall-default-policy';


export interface UpdateDefaultPolicy {
  _this: ManagedObjectReference;
  defaultPolicy: HostFirewallDefaultPolicy;
}