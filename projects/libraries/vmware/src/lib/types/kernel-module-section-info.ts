import {DynamicData} from './dynamic-data';
import {Int} from './int';
import {Long} from './long';

export interface KernelModuleSectionInfo extends DynamicData {
  address: Long;
  length?: Int;
}
