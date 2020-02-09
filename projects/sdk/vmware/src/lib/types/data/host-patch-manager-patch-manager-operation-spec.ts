import {DynamicData} from './dynamic-data';


export interface HostPatchManagerPatchManagerOperationSpec extends DynamicData {
  cmdOption?: string;
  password?: string;
  port?: number;
  proxy?: string;
  userName?: string;
}