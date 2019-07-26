export interface VirtualMachineFlagInfo {
  cbrcCacheEnabled?: boolean;
  disableAcceleration?: boolean;
  diskUuidEnabled?: boolean;
  enableLogging?: boolean;
  faultToleranceType?: string;
  htSharing?: string;
  monitorType?: string;
  recordReplayEnabled?: boolean;
  runWithDebugInfo?: boolean;
  snapshotDisabled?: boolean;
  snapshotLocked?: boolean;
  snapshotPowerOffBehavior?: string;
  useToe?: boolean;
  vbsEnabled?: boolean;
  virtualExecUsage?: string;
  virtualMmuUsage?: string;
  vvtdEnabled?: boolean;
}
