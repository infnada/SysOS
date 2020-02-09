import {DynamicData} from './dynamic-data';

import {FaultToleranceConfigInfo} from './fault-tolerance-config-info';
import {ManagedByInfo} from './managed-by-info';
import {VAppProductInfo} from './v-app-product-info';

export interface VirtualMachineConfigSummary extends DynamicData {
  annotation?: string;
  cpuReservation?: number;
  ftInfo?: FaultToleranceConfigInfo;
  guestFullName?: string;
  guestId?: string;
  installBootRequired?: boolean;
  instanceUuid?: string;
  managedBy?: ManagedByInfo;
  memoryReservation?: number;
  memorySizeMB?: number;
  name: string;
  numCpu?: number;
  numEthernetCards?: number;
  numVirtualDisks?: number;
  numVmiopBackings?: number;
  product?: VAppProductInfo;
  template: boolean;
  tpmPresent?: boolean;
  uuid?: string;
  vmPathName: string;
}