import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface ProductComponentInfo extends DynamicData {
  id: string;
  name: string;
  release: Int;
  version: string;
}
