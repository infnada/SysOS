import {ManagedObjectReference} from '../data/managed-object-reference';


export interface LoginExtensionByCertificate {
  _this: ManagedObjectReference;
  extensionKey: string;
  locale?: string;
}