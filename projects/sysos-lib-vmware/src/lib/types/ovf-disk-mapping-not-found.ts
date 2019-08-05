import {OvfSystemFault} from './ovf-system-fault';

export interface OvfDiskMappingNotFound extends OvfSystemFault {
  diskName: string;
  vmName: string;
}
