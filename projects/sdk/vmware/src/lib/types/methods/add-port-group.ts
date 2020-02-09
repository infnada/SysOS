import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostPortGroupSpec} from '../data/host-port-group-spec';


export interface AddPortGroup {
  _this: ManagedObjectReference;
  portgrp: HostPortGroupSpec;
}