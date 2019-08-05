import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface ClusterVmReadiness extends DynamicData {
  postReadyDelay?: Int;
  readyCondition?: string;
}
