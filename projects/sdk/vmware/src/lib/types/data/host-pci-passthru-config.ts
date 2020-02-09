import {DynamicData} from './dynamic-data';


export interface HostPciPassthruConfig extends DynamicData {
  id: string;
  passthruEnabled: boolean;
}