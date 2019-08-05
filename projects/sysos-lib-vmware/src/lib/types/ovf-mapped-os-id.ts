import {OvfImport} from './ovf-import';
import {Int} from './int';

export interface OvfMappedOsId extends OvfImport {
  ovfDescription: string;
  ovfId: Int;
  targetDescription: string;
}
