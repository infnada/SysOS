import {DynamicData} from './dynamic-data';


export interface HostScsiTopologyLun extends DynamicData {
  key: string;
  lun: number;
  scsiLun: string;
}