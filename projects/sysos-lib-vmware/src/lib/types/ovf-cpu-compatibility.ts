import {OvfImport} from './ovf-import';
import {Int} from './int';

export interface OvfCpuCompatibility extends OvfImport {
  desiredRegisterValue: string;
  level: Int;
  registerName: string;
  registerValue: string;
}
