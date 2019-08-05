import {DynamicData} from './dynamic-data';

export interface KeyAnyValue extends DynamicData {
  key: string;
  value: any;
}
