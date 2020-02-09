import {ManagedObjectReference} from '../data/managed-object-reference';
import {HealthUpdateInfo} from '../data/health-update-info';


export interface RegisterHealthUpdateProvider {
  _this: ManagedObjectReference;
  name: string;
  healthUpdateInfo?: HealthUpdateInfo[];
}