import {HostConnectFault} from './host-connect-fault';

export interface SSLVerifyFault extends HostConnectFault {
  selfSigned: boolean;
  thumbprint: string;
}
