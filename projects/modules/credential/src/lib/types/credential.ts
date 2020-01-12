import {CredentialTypes} from './credential-types';

export interface Credential {
  uuid: string;
  description: string;
  username: string;
  type: CredentialTypes;
  password?: string;
}
