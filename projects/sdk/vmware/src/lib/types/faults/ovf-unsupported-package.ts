import {OvfFault} from './ovf-fault';


export interface OvfUnsupportedPackage extends OvfFault {
  lineNumber?: number;
}