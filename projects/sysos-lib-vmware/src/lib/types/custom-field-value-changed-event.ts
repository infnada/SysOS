import {CustomFieldEvent} from './custom-field-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';
import {Int} from './int';
export interface CustomFieldValueChangedEvent extends CustomFieldEvent {
  entity: ManagedEntityEventArgument;
  fieldKey: Int;
  name: string;
  prevState?: string;
  value: string;
}
