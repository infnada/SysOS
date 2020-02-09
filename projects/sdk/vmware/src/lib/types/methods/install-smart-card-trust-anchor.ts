import {ManagedObjectReference} from '../data/managed-object-reference';


export interface InstallSmartCardTrustAnchor {
  _this: ManagedObjectReference;
  cert: string;
}