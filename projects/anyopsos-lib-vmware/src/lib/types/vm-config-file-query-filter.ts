import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VmConfigFileQueryFilter extends DynamicData {
  encrypted?: boolean;
  matchConfigVersion?: Int[];
}
