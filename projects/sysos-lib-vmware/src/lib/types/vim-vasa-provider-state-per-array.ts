import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VimVasaProviderStatePerArray extends DynamicData {
  active: boolean;
  arrayId: string;
  priority: Int;
}
