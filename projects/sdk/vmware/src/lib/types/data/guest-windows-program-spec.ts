import {GuestProgramSpec} from './guest-program-spec';


export interface GuestWindowsProgramSpec extends GuestProgramSpec {
  startMinimized: boolean;
}