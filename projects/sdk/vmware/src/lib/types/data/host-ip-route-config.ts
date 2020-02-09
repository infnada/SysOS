import {DynamicData} from './dynamic-data';


export interface HostIpRouteConfig extends DynamicData {
  defaultGateway?: string;
  gatewayDevice?: string;
  ipV6DefaultGateway?: string;
  ipV6GatewayDevice?: string;
}