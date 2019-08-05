import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VAppOvfSectionInfo extends DynamicData {
  atEnvelopeLevel?: string;
  key?: Int;
  namespace?: string;
  type?: string;
}
