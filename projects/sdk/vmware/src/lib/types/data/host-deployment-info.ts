import {DynamicData} from './dynamic-data';


export interface HostDeploymentInfo extends DynamicData {
  bootedFromStatelessCache?: boolean;
}