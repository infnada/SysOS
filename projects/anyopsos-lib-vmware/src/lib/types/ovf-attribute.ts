import {OvfInvalidPackage} from './ovf-invalid-package';

export interface OvfAttribute extends OvfInvalidPackage {
  attributeName: string;
  elementName: string;
}
