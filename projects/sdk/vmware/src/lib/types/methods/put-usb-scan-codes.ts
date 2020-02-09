import {ManagedObjectReference} from '../data/managed-object-reference';
import {UsbScanCodeSpec} from '../data/usb-scan-code-spec';


export interface PutUsbScanCodes {
  _this: ManagedObjectReference;
  spec: UsbScanCodeSpec;
}