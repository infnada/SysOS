import {DynamicData} from './dynamic-data';

import {ClusterDrsFaultsFaultsByVm} from './cluster-drs-faults-faults-by-vm';
export interface ClusterDrsFaults extends DynamicData {
  faultsByVm: ClusterDrsFaultsFaultsByVm[];
  reason: string;
}
