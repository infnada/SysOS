import {HostMultipathInfoLogicalUnitPolicy} from './host-multipath-info-logical-unit-policy';


export interface HostMultipathInfoFixedLogicalUnitPolicy extends HostMultipathInfoLogicalUnitPolicy {
  prefer: string;
}