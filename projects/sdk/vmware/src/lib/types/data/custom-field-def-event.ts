import {CustomFieldEvent} from './custom-field-event';


export interface CustomFieldDefEvent extends CustomFieldEvent {
  fieldKey: number;
  name: string;
}