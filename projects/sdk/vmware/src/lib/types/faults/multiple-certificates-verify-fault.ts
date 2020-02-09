import {HostConnectFault} from './host-connect-fault';

import {MultipleCertificatesVerifyFaultThumbprintData} from '../data/multiple-certificates-verify-fault-thumbprint-data';

export interface MultipleCertificatesVerifyFault extends HostConnectFault {
  thumbprintData: MultipleCertificatesVerifyFaultThumbprintData[];
}