import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CertMgrRefreshCACertificatesAndCRLs_Task {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem[]'; };
}