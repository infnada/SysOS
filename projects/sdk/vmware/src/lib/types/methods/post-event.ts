import {ManagedObjectReference} from '../data/managed-object-reference';
import {Event} from '../data/event';
import {TaskInfo} from '../data/task-info';


export interface PostEvent {
  _this: ManagedObjectReference;
  eventToPost: Event;
  taskInfo?: TaskInfo;
}