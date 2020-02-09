import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ReplaceSmartCardTrustAnchors {
  _this: ManagedObjectReference;
  certs?: string[];
}