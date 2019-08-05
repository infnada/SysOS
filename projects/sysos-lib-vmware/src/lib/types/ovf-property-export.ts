import {OvfExport} from './ovf-export';

export interface OvfPropertyExport extends OvfExport {
  type: string;
  value: string;
}
