import {OvfSystemFault} from './ovf-system-fault';

export interface OvfToXmlUnsupportedElement extends OvfSystemFault {
  name?: string;
}
