import {DynamicData} from './dynamic-data';
import {ManagedObjectReference} from './managed-object-reference';
import {HostFeatureVersionInfo} from './host-feature-version-info';
import {AboutInfo} from './about-info';
import {Int} from './int';

export interface HostConfigSummary extends DynamicData {
  agentVmDatastore?: ManagedObjectReference & { $type: 'Datastore' };
  agentVmNetwork?: ManagedObjectReference & { $type: 'Network' };
  faultToleranceEnabled: boolean;
  featureVersion?: HostFeatureVersionInfo[];
  name: string;
  port: Int;
  product?: AboutInfo;
  sslThumbprint?: string;
  vmotionEnabled: boolean;
}
