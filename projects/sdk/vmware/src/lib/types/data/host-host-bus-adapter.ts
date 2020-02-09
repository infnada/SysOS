import {DynamicData} from './dynamic-data';


export interface HostHostBusAdapter extends DynamicData {
  bus: number;
  device: string;
  driver?: string;
  key?: string;
  model: string;
  pci?: string;
  status: string;
}