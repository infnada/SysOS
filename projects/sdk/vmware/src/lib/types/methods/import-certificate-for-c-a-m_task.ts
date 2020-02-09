import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ImportCertificateForCAM_Task {
  _this: ManagedObjectReference;
  certPath: string;
  camServer: string;
}