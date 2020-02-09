import {DynamicData} from './dynamic-data';

import {DatastoreSummary} from './datastore-summary';

export interface HostDatastoreConnectInfo extends DynamicData {
  summary: DatastoreSummary;
}