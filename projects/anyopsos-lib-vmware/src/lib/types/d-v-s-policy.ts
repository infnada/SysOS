import {DynamicData} from './dynamic-data';

export interface DVSPolicy extends DynamicData {
  autoPreInstallAllowed?: boolean;
  autoUpgradeAllowed?: boolean;
  partialUpgradeAllowed?: boolean;
}
