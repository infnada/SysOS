import {CustomizationFault} from './customization-fault';


export interface NicSettingMismatch extends CustomizationFault {
  numberOfNicsInSpec: number;
  numberOfNicsInVM: number;
}