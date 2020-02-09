import {DynamicData} from './dynamic-data';


export interface Relation extends DynamicData {
  constraint?: string;
  name: string;
  version?: string;
}