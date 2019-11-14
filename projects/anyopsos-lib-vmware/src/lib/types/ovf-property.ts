import {OvfInvalidPackage} from './ovf-invalid-package';

export interface OvfProperty extends OvfInvalidPackage {
  type: string;
  value: string;
}
