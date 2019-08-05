import {OvfFault} from './ovf-fault';
import {Int} from './int';

export interface OvfInvalidPackage extends OvfFault {
  lineNumber: Int;
}
