import {GatewayToHostConnectFault} from './gateway-to-host-connect-fault';

import {KeyValue} from '../data/key-value';

export interface GatewayToHostTrustVerifyFault extends GatewayToHostConnectFault {
  propertiesToVerify: KeyValue[];
  verificationToken: string;
}