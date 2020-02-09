import {HostDatastoreConnectInfo} from './host-datastore-connect-info';


export interface HostDatastoreNameConflictConnectInfo extends HostDatastoreConnectInfo {
  newDatastoreName: string;
}