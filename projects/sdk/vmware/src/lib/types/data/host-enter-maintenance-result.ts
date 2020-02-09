import {DynamicData} from './dynamic-data';

import {FaultsByHost} from './faults-by-host';
import {FaultsByVM} from './faults-by-v-m';

export interface HostEnterMaintenanceResult extends DynamicData {
  hostFaults?: FaultsByHost[];
  vmFaults?: FaultsByVM[];
}