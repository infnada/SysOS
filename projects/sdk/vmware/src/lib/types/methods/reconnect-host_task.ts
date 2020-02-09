import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostConnectSpec} from '../data/host-connect-spec';
import {HostSystemReconnectSpec} from '../data/host-system-reconnect-spec';


export interface ReconnectHost_Task {
  _this: ManagedObjectReference;
  cnxSpec?: HostConnectSpec;
  reconnectSpec?: HostSystemReconnectSpec;
}