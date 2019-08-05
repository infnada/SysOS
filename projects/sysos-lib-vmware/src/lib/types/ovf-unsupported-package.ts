import {OvfFault} from './ovf-fault';
import {Int} from './int';

export interface OvfUnsupportedPackage extends OvfFault {
  lineNumber?: Int;
}
