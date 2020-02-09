import {DynamicData} from './dynamic-data';


export interface VirtualMachineMksTicket extends DynamicData {
  cfgFile: string;
  host?: string;
  port?: number;
  sslThumbprint?: string;
  ticket: string;
}