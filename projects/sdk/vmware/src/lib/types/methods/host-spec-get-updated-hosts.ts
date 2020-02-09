import {ManagedObjectReference} from '../data/managed-object-reference';


export interface HostSpecGetUpdatedHosts {
  _this: ManagedObjectReference;
  startChangeID?: string;
  endChangeID?: string;
}