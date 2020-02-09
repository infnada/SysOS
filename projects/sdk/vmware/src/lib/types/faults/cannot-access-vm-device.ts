import {CannotAccessVmComponent} from './cannot-access-vm-component';


export interface CannotAccessVmDevice extends CannotAccessVmComponent {
  backing: string;
  connected: boolean;
  device: string;
}