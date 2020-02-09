import {OvfImport} from './ovf-import';


export interface OvfCpuCompatibility extends OvfImport {
  desiredRegisterValue: string;
  level: number;
  registerName: string;
  registerValue: string;
}