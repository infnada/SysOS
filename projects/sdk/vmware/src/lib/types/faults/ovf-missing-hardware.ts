import {OvfImport} from './ovf-import';


export interface OvfMissingHardware extends OvfImport {
  name: string;
  resourceType: number;
}