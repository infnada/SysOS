import {DynamicData} from './dynamic-data';


export interface HostDatastoreSystemCapabilities extends DynamicData {
  localDatastoreSupported: boolean;
  nfsMountCreationRequired: boolean;
  nfsMountCreationSupported: boolean;
  vmfsExtentExpansionSupported: boolean;
}