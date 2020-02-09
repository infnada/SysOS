import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ReplaceCACertificatesAndCRLs {
  _this: ManagedObjectReference;
  caCert: string[];
  caCrl?: string[];
}