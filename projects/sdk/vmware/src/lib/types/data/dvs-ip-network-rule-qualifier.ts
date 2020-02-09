import {DvsNetworkRuleQualifier} from './dvs-network-rule-qualifier';

import {IpAddress} from './ip-address';
import {DvsIpPort} from './dvs-ip-port';
import {IntExpression} from './int-expression';

export interface DvsIpNetworkRuleQualifier extends DvsNetworkRuleQualifier {
  destinationAddress?: IpAddress;
  destinationIpPort?: DvsIpPort;
  protocol?: IntExpression;
  sourceAddress?: IpAddress;
  sourceIpPort?: DvsIpPort;
  tcpFlags?: IntExpression;
}