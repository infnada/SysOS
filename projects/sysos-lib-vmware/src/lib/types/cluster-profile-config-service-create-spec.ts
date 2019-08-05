import {ClusterProfileConfigSpec} from './cluster-profile-config-spec';

export interface ClusterProfileConfigServiceCreateSpec extends ClusterProfileConfigSpec {
  serviceType?: string[];
}
