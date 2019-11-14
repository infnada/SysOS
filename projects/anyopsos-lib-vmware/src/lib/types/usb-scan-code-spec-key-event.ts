import {DynamicData} from './dynamic-data';

import {UsbScanCodeSpecModifierType} from './usb-scan-code-spec-modifier-type';
import {Int} from './int';
export interface UsbScanCodeSpecKeyEvent extends DynamicData {
  modifiers?: UsbScanCodeSpecModifierType;
  usbHidCode: Int;
}
