import {DvsNetworkRuleQualifier} from './dvs-network-rule-qualifier';

import {StringExpression} from './string-expression';

export interface DvsSystemTrafficNetworkRuleQualifier extends DvsNetworkRuleQualifier {
  typeOfSystemTraffic?: StringExpression;
}