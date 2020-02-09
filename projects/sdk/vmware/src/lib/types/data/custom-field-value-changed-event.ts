import {CustomFieldEvent} from './custom-field-event';

import {ManagedEntityEventArgument} from './managed-entity-event-argument';

export interface CustomFieldValueChangedEvent extends CustomFieldEvent {
  entity: ManagedEntityEventArgument;
  fieldKey: number;
  name: string;
  prevState?: string;
  value: string;
}