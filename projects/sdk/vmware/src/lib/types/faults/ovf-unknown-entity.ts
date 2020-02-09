import {OvfSystemFault} from './ovf-system-fault';


export interface OvfUnknownEntity extends OvfSystemFault {
  lineNumber: number;
}