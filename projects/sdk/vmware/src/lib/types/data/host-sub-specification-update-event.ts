import {HostEvent} from './host-event';

import {HostSubSpecification} from './host-sub-specification';

export interface HostSubSpecificationUpdateEvent extends HostEvent {
  hostSubSpec: HostSubSpecification;
}