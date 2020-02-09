import {DynamicData} from './dynamic-data';


export interface VchaNodeRuntimeInfo extends DynamicData {
  nodeIp: string;
  nodeRole: string;
  nodeState: string;
}