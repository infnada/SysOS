import {OvfHardwareExport} from './ovf-hardware-export';


export interface OvfUnableToExportDisk extends OvfHardwareExport {
  diskName: string;
}