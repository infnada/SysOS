import {DynamicData} from './dynamic-data';

export interface IoFilterInfo extends DynamicData {
  id: string;
  name: string;
  releaseDate?: string;
  summary?: string;
  type?: string;
  vendor: string;
  version: string;
}
