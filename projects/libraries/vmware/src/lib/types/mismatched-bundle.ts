import {VimFault} from './vim-fault';
import {Int} from './int';

export interface MismatchedBundle extends VimFault {
  bundleBuildNumber: Int;
  bundleUuid: string;
  hostBuildNumber: Int;
  hostUuid: string;
}
