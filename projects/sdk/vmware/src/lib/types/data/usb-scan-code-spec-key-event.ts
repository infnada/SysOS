import {DynamicData} from './dynamic-data';

import {UsbScanCodeSpecModifierType} from './usb-scan-code-spec-modifier-type';

export interface UsbScanCodeSpecKeyEvent extends DynamicData {
  modifiers?: UsbScanCodeSpecModifierType;
  usbHidCode: number;
}