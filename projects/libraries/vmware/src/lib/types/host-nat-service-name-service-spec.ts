import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostNatServiceNameServiceSpec extends DynamicData {
  dnsAutoDetect: boolean;
  dnsNameServer?: string[];
  dnsPolicy: string;
  dnsRetries: Int;
  dnsTimeout: Int;
  nbdsTimeout: Int;
  nbnsRetries: Int;
  nbnsTimeout: Int;
}
