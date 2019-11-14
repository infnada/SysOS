import {DynamicData} from './dynamic-data';

export interface EventDescriptionEventDetail extends DynamicData {
  category: string;
  description?: string;
  formatOnComputeResource: string;
  formatOnDatacenter: string;
  formatOnHost: string;
  formatOnVm: string;
  fullFormat: string;
  key: string;
  longDescription?: string;
}
