import {OvfImport} from './ovf-import';
import {Int} from './int';

export interface OvfMissingHardware extends OvfImport {
  name: string;
  resourceType: Int;
}
