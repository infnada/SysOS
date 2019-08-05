import {HostConnectFault} from './host-connect-fault';
import {Int} from './int';

export interface AgentInstallFailed extends HostConnectFault {
  installerOutput?: string;
  reason?: string;
  statusCode?: Int;
}
