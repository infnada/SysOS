import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface KmipServerInfo extends DynamicData {
  address: string;
  name: string;
  nbio?: Int;
  port: Int;
  protocol?: string;
  proxyAddress?: string;
  proxyPort?: Int;
  reconnect?: Int;
  timeout?: Int;
  userName?: string;
}
