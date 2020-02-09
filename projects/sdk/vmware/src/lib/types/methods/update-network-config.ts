import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostNetworkConfig} from '../data/host-network-config';


export interface UpdateNetworkConfig {
  _this: ManagedObjectReference;
  config: HostNetworkConfig;
  changeMode: string;
}