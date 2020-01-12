import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ServiceLocator} from './service-locator';
export interface SourceNodeSpec extends DynamicData {
  activeVc: ManagedObjectReference & { $type: 'VirtualMachine' };
  managementVc: ServiceLocator;
}
