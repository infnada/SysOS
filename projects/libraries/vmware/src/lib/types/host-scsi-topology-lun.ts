import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostScsiTopologyLun extends DynamicData {
  key: string;
  lun: Int;
  scsiLun: string;
}
