import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
import {CustomizationIPSettings} from './customization-i-p-settings';
import {ServiceLocator} from './service-locator';
import {ManagedObjectReference} from './managed-object-reference';
export interface NodeDeploymentSpec extends DynamicData {
  clusterNetworkPortGroup?: ManagedObjectReference & { $type: 'Network' };
  datastore?: ManagedObjectReference & { $type: 'Datastore' };
  esxHost?: ManagedObjectReference & { $type: 'HostSystem' };
  folder: ManagedObjectReference & { $type: 'Folder' };
  ipSettings: CustomizationIPSettings;
  managementVc?: ServiceLocator;
  nodeName: string;
  publicNetworkPortGroup?: ManagedObjectReference & { $type: 'Network' };
  resourcePool?: ManagedObjectReference & { $type: 'ResourcePool' };
}
