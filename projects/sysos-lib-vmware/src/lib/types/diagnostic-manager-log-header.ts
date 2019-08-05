import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface DiagnosticManagerLogHeader extends DynamicData {
  lineEnd: Int;
  lineStart: Int;
  lineText?: string[];
}
