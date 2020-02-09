import {DynamicData} from './dynamic-data';


export interface ExtensionEventTypeInfo extends DynamicData {
  eventID: string;
  eventTypeSchema?: string;
}