import {DynamicData} from './dynamic-data';


export interface VMwareDvsLacpCapability extends DynamicData {
  lacpSupported?: boolean;
  multiLacpGroupSupported?: boolean;
}