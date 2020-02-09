import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ID} from './i-d';
import {VStorageObjectAssociationsVmDiskAssociations} from './v-storage-object-associations-vm-disk-associations';

export interface VStorageObjectAssociations extends DynamicData {
  fault?: LocalizedMethodFault;
  id: ID;
  vmDiskAssociations?: VStorageObjectAssociationsVmDiskAssociations[];
}