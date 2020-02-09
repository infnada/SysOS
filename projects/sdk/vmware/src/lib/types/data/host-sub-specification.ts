import {DynamicData} from './dynamic-data';


export interface HostSubSpecification extends DynamicData {
  binaryData?: string;
  createdTime: string;
  data?: number[];
  name: string;
}