import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RemoveSmartCardTrustAnchor {
  _this: ManagedObjectReference;
  issuer: string;
  serial: string;
}