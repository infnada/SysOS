import {DynamicData} from './dynamic-data';

import {IpPoolAssociation} from './ip-pool-association';
import {Int} from './int';
export interface IpPool extends DynamicData {
  dnsDomain?: string;
  dnsSearchPath?: string;
  hostPrefix?: string;
  httpProxy?: string;
  id?: Int;
  name?: string;
  networkAssociation?: IpPoolAssociation[];
}
