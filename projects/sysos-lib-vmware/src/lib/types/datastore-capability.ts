import {DynamicData} from './dynamic-data';

export interface DatastoreCapability extends DynamicData {
  directoryHierarchySupported: boolean;
  nativeSnapshotSupported: boolean;
  perFileThinProvisioningSupported: boolean;
  rawDiskMappingsSupported: boolean;
  seSparseSupported?: boolean;
  storageIORMSupported: boolean;
  topLevelDirectoryCreateSupported?: boolean;
  upitSupported?: boolean;
  vmdkExpandSupported?: boolean;
  vmfsSparseSupported?: boolean;
  vsanSparseSupported?: boolean;
}
