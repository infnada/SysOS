import {CannotAccessVmComponent} from './cannot-access-vm-component';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface CannotAccessVmConfig extends CannotAccessVmComponent {
  reason: LocalizedMethodFault;
}