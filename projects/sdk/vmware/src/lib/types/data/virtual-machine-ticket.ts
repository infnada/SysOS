import {DynamicData} from './dynamic-data';


export interface VirtualMachineTicket extends DynamicData {
  cfgFile: string;
  host?: string;
  port?: number;
  sslThumbprint?: string;
  ticket: string;
}