import {InvalidDeviceSpec} from './invalid-device-spec';
import {Int} from './int';

export interface InvalidController extends InvalidDeviceSpec {
  controllerKey: Int;
}
