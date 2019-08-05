import {DynamicData} from './dynamic-data';

import {HostNatServiceNameServiceSpec} from './host-nat-service-name-service-spec';
import {HostNatServicePortForwardSpec} from './host-nat-service-port-forward-spec';
import {Int} from './int';
export interface HostNatServiceSpec extends DynamicData {
  activeFtp: boolean;
  allowAnyOui: boolean;
  configPort: boolean;
  ipGatewayAddress: string;
  nameService?: HostNatServiceNameServiceSpec;
  portForward?: HostNatServicePortForwardSpec[];
  udpTimeout: Int;
  virtualSwitch: string;
}
