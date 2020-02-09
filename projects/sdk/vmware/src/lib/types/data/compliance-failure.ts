import {DynamicData} from './dynamic-data';

import {ComplianceFailureComplianceFailureValues} from './compliance-failure-compliance-failure-values';
import {LocalizableMessage} from './localizable-message';

export interface ComplianceFailure extends DynamicData {
  expressionName?: string;
  failureType: string;
  failureValues?: ComplianceFailureComplianceFailureValues[];
  message: LocalizableMessage;
}