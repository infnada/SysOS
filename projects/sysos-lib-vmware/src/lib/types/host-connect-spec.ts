import {DynamicData} from './dynamic-data';

import {HostGatewaySpec} from './host-gateway-spec';
import {HostLockdownMode} from './host-lockdown-mode';
import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface HostConnectSpec extends DynamicData {
  force: boolean;
  hostGateway?: HostGatewaySpec;
  hostName?: string;
  lockdownMode?: HostLockdownMode;
  managementIp?: string;
  password?: string;
  port?: Int;
  sslThumbprint?: string;
  userName?: string;
  vimAccountName?: string;
  vimAccountPassword?: string;
  vmFolder?: ManagedObjectReference & { $type: 'Folder' };
}
