import {OvfUnsupportedPackage} from './ovf-unsupported-package';
import {Int} from './int';

export interface OvfUnsupportedSubType extends OvfUnsupportedPackage {
  deviceSubType: string;
  deviceType: Int;
  elementName: string;
  instanceId: string;
}
