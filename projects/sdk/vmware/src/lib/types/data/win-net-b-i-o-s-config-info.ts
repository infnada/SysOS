import {NetBIOSConfigInfo} from './net-b-i-o-s-config-info';


export interface WinNetBIOSConfigInfo extends NetBIOSConfigInfo {
  primaryWINS: string;
  secondaryWINS?: string;
}