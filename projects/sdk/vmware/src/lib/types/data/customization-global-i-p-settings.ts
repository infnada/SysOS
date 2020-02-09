import {DynamicData} from './dynamic-data';


export interface CustomizationGlobalIPSettings extends DynamicData {
  dnsServerList?: string[];
  dnsSuffixList?: string[];
}