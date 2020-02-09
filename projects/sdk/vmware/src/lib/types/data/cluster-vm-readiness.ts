import {DynamicData} from './dynamic-data';


export interface ClusterVmReadiness extends DynamicData {
  postReadyDelay?: number;
  readyCondition?: string;
}