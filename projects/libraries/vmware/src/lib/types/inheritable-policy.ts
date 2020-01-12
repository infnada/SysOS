import {DynamicData} from './dynamic-data';

export interface InheritablePolicy extends DynamicData {
  inherited: boolean;
}
