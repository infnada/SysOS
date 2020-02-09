import {DynamicData} from './dynamic-data';

import {Description} from './description';

export interface DiagnosticManagerLogDescriptor extends DynamicData {
  creator: string;
  fileName: string;
  format: string;
  info: Description;
  key: string;
  mimeType: string;
}