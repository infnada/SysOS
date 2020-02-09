import {ManagedObjectReference} from '../data/managed-object-reference';


export interface SetExtensionCertificate {
  _this: ManagedObjectReference;
  extensionKey: string;
  certificatePem?: string;
}