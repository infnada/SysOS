import {ManagedObjectReference} from '../data/managed-object-reference';


export interface GenerateCertificateSigningRequest {
  _this: ManagedObjectReference;
  useIpAddressAsCommonName: boolean;
}