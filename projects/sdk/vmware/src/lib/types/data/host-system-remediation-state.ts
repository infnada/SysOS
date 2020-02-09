import {DynamicData} from './dynamic-data';


export interface HostSystemRemediationState extends DynamicData {
  operationTime: string;
  state: string;
}