import {ArrayUpdateSpec} from './array-update-spec';

import {ClusterGroupInfo} from './cluster-group-info';
export interface ClusterGroupSpec extends ArrayUpdateSpec {
  info?: ClusterGroupInfo;
}
