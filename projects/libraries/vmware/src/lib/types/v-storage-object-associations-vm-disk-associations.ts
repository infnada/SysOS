import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VStorageObjectAssociationsVmDiskAssociations extends DynamicData {
  diskKey: Int;
  vmId: string;
}
