import {DvsNetworkRuleQualifier} from './dvs-network-rule-qualifier';

import {MacAddress} from './mac-address';
import {IntExpression} from './int-expression';
export interface DvsMacNetworkRuleQualifier extends DvsNetworkRuleQualifier {
  destinationAddress?: MacAddress;
  protocol?: IntExpression;
  sourceAddress?: MacAddress;
  vlanId?: IntExpression;
}
