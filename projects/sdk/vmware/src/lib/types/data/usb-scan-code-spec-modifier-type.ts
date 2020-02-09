import {DynamicData} from './dynamic-data';


export interface UsbScanCodeSpecModifierType extends DynamicData {
  leftAlt?: boolean;
  leftControl?: boolean;
  leftGui?: boolean;
  leftShift?: boolean;
  rightAlt?: boolean;
  rightControl?: boolean;
  rightGui?: boolean;
  rightShift?: boolean;
}