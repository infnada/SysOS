import {InvalidRequest} from './invalid-request';

import {ManagedObjectReference} from './managed-object-reference';
export interface MethodNotFound extends InvalidRequest {
  method: string;
  receiver: ManagedObjectReference;
}
