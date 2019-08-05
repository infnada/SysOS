import {DynamicData} from './dynamic-data';

import {HostProxySwitchHostLagConfig} from './host-proxy-switch-host-lag-config';
import {HostProxySwitchSpec} from './host-proxy-switch-spec';
import {KeyValue} from './key-value';
import {Int} from './int';
export interface HostProxySwitch extends DynamicData {
  configNumPorts?: Int;
  dvsName: string;
  dvsUuid: string;
  hostLag?: HostProxySwitchHostLagConfig[];
  key: string;
  mtu?: Int;
  networkReservationSupported?: boolean;
  numPorts: Int;
  numPortsAvailable: Int;
  pnic?: string[];
  spec: HostProxySwitchSpec;
  uplinkPort?: KeyValue[];
}
