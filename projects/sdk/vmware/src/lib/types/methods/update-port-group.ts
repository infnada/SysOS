import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostPortGroupSpec} from '../data/host-port-group-spec';


export interface UpdatePortGroup {
  _this: ManagedObjectReference;
  pgName: string;
  portgrp: HostPortGroupSpec;
}