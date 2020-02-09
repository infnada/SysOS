import {OvfUnsupportedPackage} from './ovf-unsupported-package';


export interface OvfNoSupportedHardwareFamily extends OvfUnsupportedPackage {
  version: string;
}