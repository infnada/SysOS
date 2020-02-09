import {DynamicData} from './dynamic-data';

import {IoFilterHostIssue} from './io-filter-host-issue';

export interface IoFilterQueryIssueResult extends DynamicData {
  hostIssue?: IoFilterHostIssue[];
  opType: string;
}