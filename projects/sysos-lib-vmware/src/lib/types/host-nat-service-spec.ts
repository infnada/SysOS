import {HostNatServiceNameServiceSpec} from "./host-nat-service-name-service-spec";
import {HostNatServicePortForwardSpec} from "./host-nat-service-port-forward-spec";

export interface HostNatServiceSpec {
  activeFtp: boolean;
  allowAnyOui: boolean;
  configPort: boolean;
  ipGatewayAddress: string;
  nameService?: HostNatServiceNameServiceSpec;
  portForward?: HostNatServicePortForwardSpec[];
  udpTimeout: number;
  virtualSwitch: string;
}
