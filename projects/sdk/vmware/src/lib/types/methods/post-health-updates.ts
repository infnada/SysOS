import {ManagedObjectReference} from '../data/managed-object-reference';
import {HealthUpdate} from '../data/health-update';


export interface PostHealthUpdates {
  _this: ManagedObjectReference;
  providerId: string;
  updates?: HealthUpdate[];
}