import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostPatchManagerPatchManagerOperationSpec extends DynamicData {
  cmdOption?: string;
  password?: string;
  port?: Int;
  proxy?: string;
  userName?: string;
}
