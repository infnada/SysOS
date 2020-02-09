import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveSmartCardTrustAnchorByFingerprint {
  _this: ManagedObjectReference;
  fingerprint: string;
  digest: string;
}