import {DynamicData} from './dynamic-data';


export interface VimVasaProviderStatePerArray extends DynamicData {
  active: boolean;
  arrayId: string;
  priority: number;
}