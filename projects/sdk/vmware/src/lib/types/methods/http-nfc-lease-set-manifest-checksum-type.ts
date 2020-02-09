import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyValue} from '../data/key-value';


export interface HttpNfcLeaseSetManifestChecksumType {
  _this: ManagedObjectReference;
  deviceUrlsToChecksumTypes?: KeyValue[];
}