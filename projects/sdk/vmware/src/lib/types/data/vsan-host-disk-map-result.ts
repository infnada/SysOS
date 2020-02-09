import {DynamicData} from './dynamic-data';

import {VsanHostDiskResult} from './vsan-host-disk-result';
import {LocalizedMethodFault} from './localized-method-fault';
import {VsanHostDiskMapping} from './vsan-host-disk-mapping';

export interface VsanHostDiskMapResult extends DynamicData {
  diskResult?: VsanHostDiskResult[];
  error?: LocalizedMethodFault;
  mapping: VsanHostDiskMapping;
}