import {DynamicData} from './dynamic-data';


export interface HostSystemComplianceCheckState extends DynamicData {
  checkTime: string;
  state: string;
}