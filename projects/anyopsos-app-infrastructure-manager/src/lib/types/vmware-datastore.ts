export interface VMWareDatastore {
  capability: {
    directoryHierarchySupported: boolean;
    nativeSnapshotSupported: boolean;
    perFileThinProvisioningSupported: boolean;
    rawDiskMappingsSupported: boolean;
    seSparseSupported: boolean;
    storageIORMSupported: boolean;
    topLevelDirectoryCreateSupported: boolean;
  };
  host: {
    DatastoreHostMount: {
      key: {
        type: string;
        name: string;
      };
      mountInfo: {
        path: string;
        accessMode: string;
        mounted: boolean;
        accessible: boolean;
      };
      xsi_type: string;
    };
  };
  info: {
    freeSpace: number;
    maxFileSize: number;
    maxMemoryFileSize: number;
    maxPhysicalRDMFileSize: number;
    maxVirtualDiskCapacity: number;
    maxVirtualRDMFileSize: number;
    name: string;
    timestamp: string;
    url: string;
    nas: {
      type: string;
      remoteHost: string;
      remotePath: string;
    };
    vmfs: {
      blockSizeMb: number;
      capacity: number;
      extent: {
        diskName: string;
        partition: number;
      };
      local: boolean;
      majorVersion: number;
      maxBlocks: number;
      name: string;
      ssd: boolean;
      type: string;
      uuid: string;
      version: string;
      vmfsUpgradable: boolean;
    };
  };
  'summary.accessible': boolean;
  'summary.capacity': number;
  'summary.multipleHostAccess': boolean;
  'summary.type': string;
}
