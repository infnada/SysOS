import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {OvfConsumerOvfSection} from './ovf-consumer-ovf-section';

export interface OvfConsumerOstNode extends DynamicData {
  child?: OvfConsumerOstNode[];
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
  id: string;
  section?: OvfConsumerOvfSection[];
  type: string;
}