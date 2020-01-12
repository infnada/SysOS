import {OvfSystemFault} from './ovf-system-fault';

export interface OvfHostValueNotParsed extends OvfSystemFault {
  property: string;
  value: string;
}
