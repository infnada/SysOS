import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface GuestInfoNamespaceGenerationInfo extends DynamicData {
  generationNo: Int;
  key: string;
}
