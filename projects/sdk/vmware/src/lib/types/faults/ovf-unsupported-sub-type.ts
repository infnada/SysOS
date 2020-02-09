import {OvfUnsupportedPackage} from './ovf-unsupported-package';


export interface OvfUnsupportedSubType extends OvfUnsupportedPackage {
  deviceSubType: string;
  deviceType: number;
  elementName: string;
  instanceId: string;
}