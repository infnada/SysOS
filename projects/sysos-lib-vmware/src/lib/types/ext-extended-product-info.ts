import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface ExtExtendedProductInfo extends DynamicData {
  companyUrl?: string;
  managementUrl?: string;
  productUrl?: string;
  self?: ManagedObjectReference & { $type: 'ManagedEntity' };
}
