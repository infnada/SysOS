import {DynamicData} from './dynamic-data';


export interface VAppOvfSectionInfo extends DynamicData {
  atEnvelopeLevel?: boolean;
  contents?: string;
  key?: number;
  namespace?: string;
  type?: string;
}