import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostIpRouteConfig} from '../data/host-ip-route-config';


export interface UpdateIpRouteConfig {
  _this: ManagedObjectReference;
  config: HostIpRouteConfig;
}