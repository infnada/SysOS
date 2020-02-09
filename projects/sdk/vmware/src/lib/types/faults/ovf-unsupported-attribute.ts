import {OvfUnsupportedPackage} from './ovf-unsupported-package';


export interface OvfUnsupportedAttribute extends OvfUnsupportedPackage {
  attributeName: string;
  elementName: string;
}