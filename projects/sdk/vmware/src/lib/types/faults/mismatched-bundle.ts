import {VimFault} from './vim-fault';


export interface MismatchedBundle extends VimFault {
  bundleBuildNumber: number;
  bundleUuid: string;
  hostBuildNumber: number;
  hostUuid: string;
}