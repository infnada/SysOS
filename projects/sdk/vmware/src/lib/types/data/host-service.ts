import {DynamicData} from './dynamic-data';

import {HostServiceSourcePackage} from './host-service-source-package';

export interface HostService extends DynamicData {
  key: string;
  label: string;
  policy: string;
  required: boolean;
  ruleset?: string[];
  running: boolean;
  sourcePackage?: HostServiceSourcePackage;
  uninstallable: boolean;
}