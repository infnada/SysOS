import {DynamicData} from './dynamic-data';


export interface HostPciPassthruInfo extends DynamicData {
  dependentDevice: string;
  id: string;
  passthruActive: boolean;
  passthruCapable: boolean;
  passthruEnabled: boolean;
}