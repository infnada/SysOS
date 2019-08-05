import {ResourcePoolSummary} from './resource-pool-summary';

import {VAppProductInfo} from './v-app-product-info';
import {VirtualAppVAppState} from './virtual-app-v-app-state';
export interface VirtualAppSummary extends ResourcePoolSummary {
  installBootRequired?: boolean;
  instanceUuid?: string;
  product?: VAppProductInfo;
  suspended?: boolean;
  vAppState?: VirtualAppVAppState;
}
