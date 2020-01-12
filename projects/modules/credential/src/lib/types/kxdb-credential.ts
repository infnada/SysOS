import {Entry, ProtectedValue} from 'kdbxweb';
import {CredentialTypes} from './credential-types';

export interface KdbxCredential extends Entry {
  fields: {
    Type: CredentialTypes;
    UserName: string;
    Password: ProtectedValue;
    Title: string;
  };
}
