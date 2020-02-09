import {OvfInvalidPackage} from './ovf-invalid-package';


export interface OvfWrongNamespace extends OvfInvalidPackage {
  namespaceName: string;
}