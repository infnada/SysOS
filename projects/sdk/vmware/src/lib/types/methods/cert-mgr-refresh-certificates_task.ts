import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CertMgrRefreshCertificates_Task {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem[]'; };
}