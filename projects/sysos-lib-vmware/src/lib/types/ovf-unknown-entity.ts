import {OvfSystemFault} from './ovf-system-fault';
import {Int} from './int';

export interface OvfUnknownEntity extends OvfSystemFault {
  lineNumber: Int;
}
