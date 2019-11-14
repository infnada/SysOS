import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
export interface OvfCreateDescriptorResult extends DynamicData {
  error?: LocalizedMethodFault[];
  includeImageFiles?: boolean;
  ovfDescriptor: string;
  warning?: LocalizedMethodFault[];
}
