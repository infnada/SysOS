import {DynamicData} from './dynamic-data';

import {ClusterAction} from './cluster-action';
import {ManagedObjectReference} from './managed-object-reference';
import {LocalizableMessage} from './localizable-message';

export interface ClusterRecommendation extends DynamicData {
  action?: ClusterAction[];
  key: string;
  prerequisite?: string[];
  rating: number;
  reason: string;
  reasonText: string;
  target?: ManagedObjectReference;
  time: string;
  type: string;
  warningDetails?: LocalizableMessage;
  warningText?: string;
}