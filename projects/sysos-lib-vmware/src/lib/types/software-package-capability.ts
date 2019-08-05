import {DynamicData} from './dynamic-data';

export interface SoftwarePackageCapability extends DynamicData {
  liveInstallAllowed?: boolean;
  liveRemoveAllowed?: boolean;
  overlay?: boolean;
  statelessReady?: boolean;
}
