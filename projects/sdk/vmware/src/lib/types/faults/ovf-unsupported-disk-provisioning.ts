import {OvfImport} from './ovf-import';


export interface OvfUnsupportedDiskProvisioning extends OvfImport {
  diskProvisioning: string;
  supportedDiskProvisioning: string;
}