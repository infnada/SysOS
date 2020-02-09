import {DynamicData} from './dynamic-data';


export interface ScsiLunDurableName extends DynamicData {
  data?: number[];
  namespace: string;
  namespaceId: number;
}