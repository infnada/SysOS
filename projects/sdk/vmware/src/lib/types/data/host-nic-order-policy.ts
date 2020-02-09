import {DynamicData} from './dynamic-data';


export interface HostNicOrderPolicy extends DynamicData {
  activeNic?: string[];
  standbyNic?: string[];
}