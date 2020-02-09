import {HostEvent} from './host-event';

import {HostSpecification} from './host-specification';

export interface HostSpecificationUpdateEvent extends HostEvent {
  hostSpec: HostSpecification;
}