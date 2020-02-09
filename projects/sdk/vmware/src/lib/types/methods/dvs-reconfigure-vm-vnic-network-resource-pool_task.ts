import {ManagedObjectReference} from '../data/managed-object-reference';
import {DvsVmVnicResourcePoolConfigSpec} from '../data/dvs-vm-vnic-resource-pool-config-spec';


export interface DvsReconfigureVmVnicNetworkResourcePool_Task {
  _this: ManagedObjectReference;
  configSpec: DvsVmVnicResourcePoolConfigSpec[];
}