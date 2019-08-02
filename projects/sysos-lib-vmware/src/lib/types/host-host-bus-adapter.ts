export interface HostHostBusAdapter {
  bus: number;
  device: string;
  driver?: string;
  key?: string;
  model: string;
  pci?: string;
  status: string;
}
