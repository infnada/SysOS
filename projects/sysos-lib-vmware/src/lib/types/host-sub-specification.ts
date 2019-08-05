import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';
import {Byte} from './byte';

export interface HostSubSpecification extends DynamicData {
  createdTime: DateTime;
  data?: Byte[];
  name: string;
}
