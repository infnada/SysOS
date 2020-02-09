import {GuestAuthSubject} from './guest-auth-subject';


export interface GuestAuthNamedSubject extends GuestAuthSubject {
  name: string;
}