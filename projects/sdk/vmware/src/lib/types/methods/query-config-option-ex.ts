import {ManagedObjectReference} from '../data/managed-object-reference';
import {EnvironmentBrowserConfigOptionQuerySpec} from '../data/environment-browser-config-option-query-spec';


export interface QueryConfigOptionEx {
  _this: ManagedObjectReference;
  spec?: EnvironmentBrowserConfigOptionQuerySpec;
}