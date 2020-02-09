import {EventArgument} from './event-argument';


export interface RoleEventArgument extends EventArgument {
  name: string;
  roleId: number;
}