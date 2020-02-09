import {ManagedObjectReference} from '../data/managed-object-reference';


export interface LoginBySSPI {
  _this: ManagedObjectReference;
  base64Token: string;
  locale?: string;
}