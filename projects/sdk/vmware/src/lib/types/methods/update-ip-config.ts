import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostIpConfig} from '../data/host-ip-config';


export interface UpdateIpConfig {
  _this: ManagedObjectReference;
  ipConfig: HostIpConfig;
}