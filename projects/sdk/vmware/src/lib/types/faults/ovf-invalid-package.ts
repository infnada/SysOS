import {OvfFault} from './ovf-fault';


export interface OvfInvalidPackage extends OvfFault {
  lineNumber: number;
}