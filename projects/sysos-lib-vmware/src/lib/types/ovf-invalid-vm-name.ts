import {OvfUnsupportedPackage} from './ovf-unsupported-package';

export interface OvfInvalidVmName extends OvfUnsupportedPackage {
  name: string;
}
