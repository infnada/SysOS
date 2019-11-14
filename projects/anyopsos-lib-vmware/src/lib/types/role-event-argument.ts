import {EventArgument} from './event-argument';
import {Int} from './int';

export interface RoleEventArgument extends EventArgument {
  name: string;
  roleId: Int;
}
