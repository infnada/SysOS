import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';
import {EnumDescription} from './enum-description';
import {EventDescriptionEventDetail} from './event-description-event-detail';

export interface EventDescription extends DynamicData {
  category: ElementDescription[];
  enumeratedTypes?: EnumDescription[];
  eventInfo: EventDescriptionEventDetail[];
}