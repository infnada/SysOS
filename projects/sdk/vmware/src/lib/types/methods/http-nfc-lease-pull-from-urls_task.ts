import {ManagedObjectReference} from '../data/managed-object-reference';
import {HttpNfcLeaseSourceFile} from '../data/http-nfc-lease-source-file';


export interface HttpNfcLeasePullFromUrls_Task {
  _this: ManagedObjectReference;
  files?: HttpNfcLeaseSourceFile[];
}