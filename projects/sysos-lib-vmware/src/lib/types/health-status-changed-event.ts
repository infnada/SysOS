import {Event} from './event';

export interface HealthStatusChangedEvent extends Event {
  componentId: string;
  componentName: string;
  newStatus: string;
  oldStatus: string;
  serviceId?: string;
}
