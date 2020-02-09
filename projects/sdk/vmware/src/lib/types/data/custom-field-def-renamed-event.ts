import {CustomFieldDefEvent} from './custom-field-def-event';


export interface CustomFieldDefRenamedEvent extends CustomFieldDefEvent {
  newName: string;
}