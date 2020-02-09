import {DynamicData} from './dynamic-data';


export interface HostNatServicePortForwardSpec extends DynamicData {
  guestIpAddress: string;
  guestPort: number;
  hostPort: number;
  name: string;
  type: string;
}