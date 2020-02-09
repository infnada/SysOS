import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostIpRouteTableConfig} from '../data/host-ip-route-table-config';


export interface UpdateIpRouteTableConfig {
  _this: ManagedObjectReference;
  config: HostIpRouteTableConfig;
}