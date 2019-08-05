import {InvalidRequest} from './invalid-request';

export interface InvalidType extends InvalidRequest {
  argument?: string;
}
