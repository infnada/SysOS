import {DynamicData} from './dynamic-data';

import {UsbScanCodeSpecKeyEvent} from './usb-scan-code-spec-key-event';
export interface UsbScanCodeSpec extends DynamicData {
  keyEvents: UsbScanCodeSpecKeyEvent[];
}
