import {ManagedObjectReference} from '../data/managed-object-reference';


export interface InstallServerCertificate {
  _this: ManagedObjectReference;
  cert: string;
}