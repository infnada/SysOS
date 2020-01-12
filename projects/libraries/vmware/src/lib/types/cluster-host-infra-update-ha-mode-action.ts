import {ClusterAction} from './cluster-action';

export interface ClusterHostInfraUpdateHaModeAction extends ClusterAction {
  operationType: string;
}
