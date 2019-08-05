import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface VirtualMachineGuestQuiesceSpec extends DynamicData {
  timeout?: Int;
}
