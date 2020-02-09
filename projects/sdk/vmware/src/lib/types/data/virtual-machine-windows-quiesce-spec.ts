import {VirtualMachineGuestQuiesceSpec} from './virtual-machine-guest-quiesce-spec';


export interface VirtualMachineWindowsQuiesceSpec extends VirtualMachineGuestQuiesceSpec {
  vssBackupContext?: string;
  vssBackupType?: number;
  vssBootableSystemState?: boolean;
  vssPartialFileSupport?: boolean;
}