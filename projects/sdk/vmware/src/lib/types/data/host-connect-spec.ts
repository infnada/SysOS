import {DynamicData} from './dynamic-data';

import {HostGatewaySpec} from './host-gateway-spec';
import {HostLockdownMode} from '../enums/host-lockdown-mode';
import {ManagedObjectReference} from './managed-object-reference';

export interface HostConnectSpec extends DynamicData {
  force: boolean;
  hostGateway?: HostGatewaySpec;
  hostName?: string;
  lockdownMode?: HostLockdownMode;
  managementIp?: string;
  password?: string;
  port?: number;
  sslThumbprint?: string;
  userName?: string;
  vimAccountName?: string;
  vimAccountPassword?: string;
  vmFolder?: ManagedObjectReference & { $type: 'Folder'; };
}