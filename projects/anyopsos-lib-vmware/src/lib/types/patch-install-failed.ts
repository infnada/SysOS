import {PlatformConfigFault} from './platform-config-fault';

export interface PatchInstallFailed extends PlatformConfigFault {
  rolledBack: boolean;
}
