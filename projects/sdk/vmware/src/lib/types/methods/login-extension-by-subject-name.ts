import {ManagedObjectReference} from '../data/managed-object-reference';


export interface LoginExtensionBySubjectName {
  _this: ManagedObjectReference;
  extensionKey: string;
  locale?: string;
}