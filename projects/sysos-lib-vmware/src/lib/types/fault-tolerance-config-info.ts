export interface FaultToleranceConfigInfo {
  configPaths: string[];
  instanceUuids: string[];
  orphaned?: boolean;
  role: number;
}
