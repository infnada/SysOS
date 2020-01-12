import {ClusterAction} from './cluster-action';

import {HostPowerOperationType} from './host-power-operation-type';
import {Int} from './int';
export interface ClusterHostPowerAction extends ClusterAction {
  cpuCapacityMHz?: Int;
  memCapacityMB?: Int;
  operationType: HostPowerOperationType;
  powerConsumptionWatt?: Int;
}
