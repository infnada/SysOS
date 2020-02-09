import {DynamicData} from './dynamic-data';


export interface ProductComponentInfo extends DynamicData {
  id: string;
  name: string;
  release: number;
  version: string;
}