import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VirtualMachineMksTicket extends DynamicData {
  cfgFile: string;
  host?: string;
  port?: Int;
  sslThumbprint?: string;
  ticket: string;
}
