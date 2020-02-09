import {DynamicData} from './dynamic-data';


export interface KernelModuleSectionInfo extends DynamicData {
  address: number;
  length?: number;
}