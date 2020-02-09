import {InvalidDeviceSpec} from './invalid-device-spec';


export interface InvalidController extends InvalidDeviceSpec {
  controllerKey: number;
}