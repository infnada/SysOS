import {DynamicData} from './dynamic-data';

export interface VimVasaProvider extends DynamicData {
  name?: string;
  url: string;
}
