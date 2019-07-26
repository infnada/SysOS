import {ObjectSpec} from "./object-spec";
import {PropertySpec} from "./property-spec";

export interface PropertyFilterSpec {
  objectSet: ObjectSpec[];
  propSet: PropertySpec[];
  reportMissingObjectsInResults?: boolean;
}
