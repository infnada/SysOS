import {ManagedObjectReference} from '../data/managed-object-reference';
import {OptionValue} from '../data/option-value';


export interface ClusterEnterMaintenanceMode {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem[]'; };
  option?: OptionValue[];
}