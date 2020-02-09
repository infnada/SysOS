import {DynamicData} from './dynamic-data';

import {HostProxySwitchHostLagConfig} from './host-proxy-switch-host-lag-config';
import {HostProxySwitchSpec} from './host-proxy-switch-spec';
import {KeyValue} from './key-value';

export interface HostProxySwitch extends DynamicData {
  configNumPorts?: number;
  dvsName: string;
  dvsUuid: string;
  hostLag?: HostProxySwitchHostLagConfig[];
  key: string;
  mtu?: number;
  networkReservationSupported?: boolean;
  numPorts: number;
  numPortsAvailable: number;
  pnic?: string[];
  spec: HostProxySwitchSpec;
  uplinkPort?: KeyValue[];
}