import {VirtualMachineGuestQuiesceSpec} from './virtual-machine-guest-quiesce-spec';
import {Int} from './int';

export interface VirtualMachineWindowsQuiesceSpec extends VirtualMachineGuestQuiesceSpec {
  vssBackupContext?: string;
  vssBackupType?: Int;
  vssBootableSystemState?: boolean;
  vssPartialFileSupport?: boolean;
}
