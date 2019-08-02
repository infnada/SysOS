import {ManagedEntityStatus} from "./managed-entity-status";

export interface AlarmFilterSpec {
  status?: ManagedEntityStatus[];
  typeEntity?: string;
  typeTrigger?: string;
}
