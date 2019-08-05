import {DatacenterEvent} from './datacenter-event';

export interface DatacenterRenamedEvent extends DatacenterEvent {
  newName: string;
  oldName: string;
}
