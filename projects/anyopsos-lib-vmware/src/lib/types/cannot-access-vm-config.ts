import {CannotAccessVmComponent} from './cannot-access-vm-component';

import {LocalizedMethodFault} from './localized-method-fault';
export interface CannotAccessVmConfig extends CannotAccessVmComponent {
  reason: LocalizedMethodFault;
}
