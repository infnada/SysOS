import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostIpRouteConfig} from '../data/host-ip-route-config';


export interface UpdateConsoleIpRouteConfig {
  _this: ManagedObjectReference;
  config: HostIpRouteConfig;
}