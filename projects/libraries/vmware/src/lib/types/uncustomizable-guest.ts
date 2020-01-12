import {CustomizationFault} from './customization-fault';

export interface UncustomizableGuest extends CustomizationFault {
  uncustomizableGuestOS: string;
}
