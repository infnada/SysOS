import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostNatServicePortForwardSpec extends DynamicData {
  guestIpAddress: string;
  guestPort: Int;
  hostPort: Int;
  name: string;
  type: string;
}
