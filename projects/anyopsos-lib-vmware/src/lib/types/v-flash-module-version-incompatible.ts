import {VimFault} from './vim-fault';

export interface VFlashModuleVersionIncompatible extends VimFault {
  hostMinSupportedVerson: string;
  hostModuleVersion: string;
  moduleName: string;
  vmRequestModuleVersion: string;
}
