import {OvfUnsupportedPackage} from './ovf-unsupported-package';


export interface OvfUnsupportedType extends OvfUnsupportedPackage {
  deviceType: number;
  instanceId: string;
  name: string;
}