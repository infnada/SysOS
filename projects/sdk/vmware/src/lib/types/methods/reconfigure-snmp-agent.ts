import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostSnmpConfigSpec} from '../data/host-snmp-config-spec';


export interface ReconfigureSnmpAgent {
  _this: ManagedObjectReference;
  spec: HostSnmpConfigSpec;
}