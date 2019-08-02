import {HostMultipathInfoPath} from "./host-multipath-info-path";
import {HostMultipathInfoLogicalUnitPolicy} from "./host-multipath-info-logical-unit-policy";
import {HostMultipathInfoLogicalUnitStorageArrayTypePolicy} from "./host-multipath-info-logical-unit-storage-array-type-policy";

export interface HostMultipathInfoLogicalUnit {
  id: string;
  key: string;
  lun: string;
  path: HostMultipathInfoPath[];
  policy: HostMultipathInfoLogicalUnitPolicy;
  storageArrayTypePolicy?: HostMultipathInfoLogicalUnitStorageArrayTypePolicy;
}
