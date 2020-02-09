import {HostDatastoreConnectInfo} from './host-datastore-connect-info';


export interface HostDatastoreExistsConnectInfo extends HostDatastoreConnectInfo {
  newDatastoreName: string;
}