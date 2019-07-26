export interface VirtualDeviceConnectInfo {
  allowGuestControl: boolean;
  connected: boolean;
  migrateConnect?: string;
  startConnected: boolean;
  status?: string;
}
