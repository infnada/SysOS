import {CustomizationFault} from './customization-fault';
import {Int} from './int';

export interface NicSettingMismatch extends CustomizationFault {
  numberOfNicsInSpec: Int;
  numberOfNicsInVM: Int;
}
