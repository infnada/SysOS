import {ClusterAction} from './cluster-action';

import {HostPowerOperationType} from '../enums/host-power-operation-type';

export interface ClusterHostPowerAction extends ClusterAction {
  cpuCapacityMHz?: number;
  memCapacityMB?: number;
  operationType: HostPowerOperationType;
  powerConsumptionWatt?: number;
}