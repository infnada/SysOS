import {ManagedObjectReference} from '../data/managed-object-reference';


export interface GenerateCertificateSigningRequestByDn {
  _this: ManagedObjectReference;
  distinguishedName: string;
}