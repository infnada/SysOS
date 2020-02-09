import {InheritablePolicy} from './inheritable-policy';


export interface VMwareUplinkPortOrderPolicy extends InheritablePolicy {
  activeUplinkPort?: string[];
  standbyUplinkPort?: string[];
}