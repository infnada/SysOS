import {DynamicData} from './dynamic-data';


export interface VsanNewPolicyBatch extends DynamicData {
  policy?: string;
  size?: number[];
}