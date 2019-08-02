import {HostNatServiceSpec} from "./host-nat-service-spec";

export interface HostNatServiceConfig {
  changeOperation?: string;
  key: string;
  spec: HostNatServiceSpec;
}
