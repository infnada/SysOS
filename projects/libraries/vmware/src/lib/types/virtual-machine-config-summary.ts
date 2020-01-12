import {DynamicData} from './dynamic-data';

import {FaultToleranceConfigInfo} from './fault-tolerance-config-info';
import {ManagedByInfo} from './managed-by-info';
import {VAppProductInfo} from './v-app-product-info';
import {Int} from './int';
export interface VirtualMachineConfigSummary extends DynamicData {
  annotation?: string;
  cpuReservation?: FaultToleranceConfigInfo;
  guestFullName?: string;
  guestId?: string;
  installBootRequired?: boolean;
  instanceUuid?: string;
  managedBy?: ManagedByInfo;
  memoryReservation?: Int;
  name: string;
  numCpu?: Int;
  numEthernetCards?: Int;
  numVirtualDisks?: Int;
  numVmiopBackings?: Int;
  product?: VAppProductInfo;
  template: boolean;
  tpmPresent?: boolean;
  uuid?: string;
  vmPathName: string;
}
