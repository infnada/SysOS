import {DynamicData} from './dynamic-data';

import {SoftwarePackageCapability} from './software-package-capability';
import {Relation} from './relation';
import {DateTime} from './date-time';
export interface SoftwarePackage extends DynamicData {
  acceptanceLevel: string;
  capability: SoftwarePackageCapability;
  conflicts?: Relation[];
  creationDate?: DateTime;
  depends?: Relation[];
  description: string;
  hardwarePlatformsRequired?: string[];
  maintenanceModeRequired?: boolean;
  name: string;
  payload?: string[];
  provides?: string[];
  referenceURL?: string[];
  replaces?: Relation[];
  summary: string;
  tag?: string[];
  type: string;
  vendor: string;
  version: string;
}
