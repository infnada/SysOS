import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostIpmiInfo} from '../data/host-ipmi-info';


export interface UpdateIpmi {
  _this: ManagedObjectReference;
  ipmiInfo: HostIpmiInfo;
}