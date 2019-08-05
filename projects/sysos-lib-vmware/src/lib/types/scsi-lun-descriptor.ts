import {DynamicData} from './dynamic-data';

export interface ScsiLunDescriptor extends DynamicData {
  id: string;
  quality: string;
}
