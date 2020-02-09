import {DynamicData} from './dynamic-data';


export interface DiagnosticManagerLogHeader extends DynamicData {
  lineEnd: number;
  lineStart: number;
  lineText?: string[];
}