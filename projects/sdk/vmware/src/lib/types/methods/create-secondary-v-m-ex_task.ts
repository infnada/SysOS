import {ManagedObjectReference} from '../data/managed-object-reference';
import {FaultToleranceConfigSpec} from '../data/fault-tolerance-config-spec';


export interface CreateSecondaryVMEx_Task {
  _this: ManagedObjectReference;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  spec?: FaultToleranceConfigSpec;
}