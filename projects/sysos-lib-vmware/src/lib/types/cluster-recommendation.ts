import {DynamicData} from './dynamic-data';

import {ClusterAction} from './cluster-action';
import {ManagedObjectReference} from './managed-object-reference';
import {LocalizableMessage} from './localizable-message';
import {Int} from './int';
import {DateTime} from './date-time';
export interface ClusterRecommendation extends DynamicData {
  action?: ClusterAction[];
  key: string;
  prerequisite?: string[];
  rating: Int;
  reason: string;
  reasonText: string;
  target?: ManagedObjectReference;
  time: DateTime;
  type: string;
  warningDetails?: LocalizableMessage;
  warningText?: string;
}
