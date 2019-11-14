import {CustomFieldEvent} from './custom-field-event';
import {Int} from './int';

export interface CustomFieldDefEvent extends CustomFieldEvent {
  fieldKey: Int;
  name: string;
}
