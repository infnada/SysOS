import {DynamicData} from './dynamic-data';

import {ClusterDasAdmissionControlPolicy} from './cluster-das-admission-control-policy';
import {ClusterDasVmSettings} from './cluster-das-vm-settings';
import {ManagedObjectReference} from './managed-object-reference';
import {OptionValue} from './option-value';

export interface ClusterDasConfigInfo extends DynamicData {
  admissionControlEnabled?: boolean;
  admissionControlPolicy?: ClusterDasAdmissionControlPolicy;
  defaultVmSettings?: ClusterDasVmSettings;
  enabled?: boolean;
  failoverLevel?: number;
  hBDatastoreCandidatePolicy?: string;
  heartbeatDatastore?: ManagedObjectReference & { $type: 'Datastore[]'; };
  hostMonitoring?: string;
  option?: OptionValue[];
  vmComponentProtecting?: string;
  vmMonitoring?: string;
}