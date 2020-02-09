import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostDnsConfig} from '../data/host-dns-config';


export interface UpdateDnsConfig {
  _this: ManagedObjectReference;
  config: HostDnsConfig;
}