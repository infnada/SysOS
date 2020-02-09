import {DynamicData} from './dynamic-data';


export interface KmipServerInfo extends DynamicData {
  address: string;
  name: string;
  nbio?: number;
  port: number;
  protocol?: string;
  proxyAddress?: string;
  proxyPort?: number;
  reconnect?: number;
  timeout?: number;
  userName?: string;
}