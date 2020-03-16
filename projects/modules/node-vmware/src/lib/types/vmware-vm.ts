export interface VMWareVM {
  'config.annotation': {};
  'config.changeTrackingEnabled': boolean;
  'config.extraConfig': {};
  'config.files.logDirectory': string;
  'config.files.snapshotDirectory': string;
  'config.files.vmPathName': string;
  'config.flags.faultToleranceType': string;
  'config.forkConfigInfo': any;
  'config.ftInfo': any;
  'config.guestId': string;
  'config.hardware.device': {
    VirtualDevice: {};
  };
  'config.hardware.memoryMB': string;
  'config.hardware.numCPU': string;
  'config.uuid': string;
  'config.version': string;
  customValue: {};
  datastore: {
    ManagedObjectReference: {
      type: string;
      name: string;
    }[];
  };
  guest: {
    guestKernelCrashed: boolean;
    guestOperationsReady: boolean;
    guestState: string;
    guestStateChangeSupported: boolean;
    interactiveGuestOperationsReady: boolean;
    screen: {
      height: number;
      width: number;
    };
    toolsRunningStatus: string;
    toolsStatus: string;
    toolsVersion: number;
    toolsVersionStatus: string;
    toolsVersionStatus2: string;
  };
  layout: {};
  layoutEx: {};
  parentVApp: any;
  resourcePool: {
    name: string;
    type: string;
  };
  'runtime.connectionState': string;
  'runtime.consolidationNeeded': string;
  'runtime.faultToleranceState': string;
  'runtime.host': {
    name: string;
    type: string;
  };
  'runtime.powerState': string;
  snapshot: any;
  'storage.perDatastoreUsage': {
    VirtualMachineUsageOnDatastore: {

    }
  };
  'summary.config.template': boolean;
  'summary.config.vmPathName': string;
}
