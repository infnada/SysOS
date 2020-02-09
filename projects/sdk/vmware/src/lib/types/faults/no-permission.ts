import {SecurityError} from './security-error';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface NoPermission extends SecurityError {
  object: ManagedObjectReference;
  privilegeId: string;
}