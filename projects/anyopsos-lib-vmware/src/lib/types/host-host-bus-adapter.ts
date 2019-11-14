import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostHostBusAdapter extends DynamicData {
  bus: Int;
  device: string;
  driver?: string;
  key?: string;
  model: string;
  pci?: string;
  status: string;
}
