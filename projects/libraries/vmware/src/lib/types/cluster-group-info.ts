import {DynamicData} from './dynamic-data';

export interface ClusterGroupInfo extends DynamicData {
  name: string;
  uniqueID?: string;
  userCreated?: boolean;
}
