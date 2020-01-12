import {OvfUnsupportedPackage} from './ovf-unsupported-package';
import {Int} from './int';

export interface OvfUnsupportedType extends OvfUnsupportedPackage {
  deviceType: Int;
  instanceId: string;
  name: string;
}
