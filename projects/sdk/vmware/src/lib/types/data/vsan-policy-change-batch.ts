import {DynamicData} from './dynamic-data';


export interface VsanPolicyChangeBatch extends DynamicData {
  policy?: string;
  uuid?: string[];
}