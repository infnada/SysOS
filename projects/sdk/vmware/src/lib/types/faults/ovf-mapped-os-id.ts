import {OvfImport} from './ovf-import';


export interface OvfMappedOsId extends OvfImport {
  ovfDescription: string;
  ovfId: number;
  targetDescription: string;
}