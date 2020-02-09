import {DynamicData} from './dynamic-data';


export interface VMwareDVSVspanCapability extends DynamicData {
  dvportSupported: boolean;
  encapRemoteSourceSupported: boolean;
  erspanProtocolSupported?: boolean;
  mirrorNetstackSupported?: boolean;
  mixedDestSupported: boolean;
  remoteDestSupported: boolean;
  remoteSourceSupported: boolean;
}